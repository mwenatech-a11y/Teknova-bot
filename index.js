const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs-extra');
const chalk = require('chalk');
const readline = require('readline');
const { handleCommand } = require('./commands/handler');
const config = require('./config');

const logger = pino({ level: 'silent' });

// ===== TEKNOVA OWEN BOT =====
console.log(chalk.cyan(`
╔══════════════════════════════════════╗
║   ⚡ TEKNOVA OWEN BOT ⚡            ║
║   500+ Commands WhatsApp Bot        ║
║   Owner: TEKNOVA Owen               ║
║   Version: 1.0.0                    ║
╚══════════════════════════════════════╝
`));

// Pairing Code Input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function question(text) {
    return new Promise((resolve) => rl.question(text, resolve));
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger,
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger)
        },
        browser: Browsers.ubuntu('Chrome'),
        generateHighQualityLinkPreview: true
    });

    // ===== PAIRING CODE =====
    if (!sock.authState.creds.registered) {
        console.log(chalk.yellow('\n📱 TEKNOVA Owen Bot - Pair Number'));
        console.log(chalk.white('─'.repeat(40)));
        const phoneNumber = await question(chalk.green('📞 Weka namba yako (mfano: 255772991908): '));
        
        const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
        
        if (cleanNumber.length < 10) {
            console.log(chalk.red('❌ Namba si sahihi! Jaribu tena.'));
            process.exit(1);
        }

        try {
            const code = await sock.requestPairingCode(cleanNumber);
            console.log(chalk.white('─'.repeat(40)));
            console.log(chalk.bgGreen.white(`\n 🔑 PAIRING CODE: ${code} \n`));
            console.log(chalk.yellow('📋 Nenda WhatsApp > Linked Devices > Link a Device'));
            console.log(chalk.yellow('📋 Kisha weka code hii hapo juu'));
            console.log(chalk.white('─'.repeat(40)));
        } catch (err) {
            console.log(chalk.red('❌ Error kupata pairing code:', err.message));
            process.exit(1);
        }
    }

    // ===== CONNECTION UPDATE =====
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'open') {
            console.log(chalk.green('\n✅ TEKNOVA Owen Bot Imeconnect!'));
            console.log(chalk.cyan('⚡ Bot iko tayari kutumika - 500+ Commands'));
            console.log(chalk.white('─'.repeat(40)));
            
            // Send startup message to owner
            const ownerJid = config.ownerNumber + '@s.whatsapp.net';
            await sock.sendMessage(ownerJid, {
                image: fs.readFileSync('./media/botpic.jpg'),
                caption: `⚡ *TEKNOVA OWEN BOT*\n\n✅ Bot imeanza kufanya kazi!\n📊 Commands: 500+\n👤 Owner: TEKNOVA Owen\n\n_Type .menu kuona commands zote_`
            });
        }

        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red('❌ Session imeisha. Futa folder ya session na uanze upya.'));
                await fs.remove('./session');
                process.exit(1);
            } else {
                console.log(chalk.yellow('🔄 Inaconnect tena...'));
                startBot();
            }
        }
    });

    // ===== CREDENTIALS UPDATE =====
    sock.ev.on('creds.update', saveCreds);

    // ===== MESSAGE HANDLER =====
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
            if (!msg.message) continue;
            if (msg.key.fromMe) continue;

            try {
                await handleCommand(sock, msg, config);
            } catch (err) {
                console.log(chalk.red('Error:', err.message));
            }
        }
    });

    // ===== GROUP PARTICIPANTS UPDATE =====
    sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
        if (action === 'add') {
            for (const participant of participants) {
                await sock.sendMessage(id, {
                    image: fs.readFileSync('./media/botpic.jpg'),
                    caption: `⚡ *TEKNOVA OWEN BOT*\n\n👋 Karibu @${participant.split('@')[0]}!\n\nTumia .menu kuona commands zote.`,
                    mentions: [participant]
                });
            }
        }
        if (action === 'remove') {
            for (const participant of participants) {
                await sock.sendMessage(id, {
                    text: `👋 Kwaheri @${participant.split('@')[0]}!`,
                    mentions: [participant]
                });
            }
        }
    });
}

startBot().catch(err => {
    console.log(chalk.red('Fatal Error:', err.message));
    process.exit(1);
});
