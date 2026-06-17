const fs = require('fs-extra');
const path = require('path');
const { getContentType, downloadMediaMessage } = require('@whiskeysockets/baileys');

// Import all command modules
const generalCmds = require('./general');
const toolsCmds = require('./tools');
const funCmds = require('./fun');
const groupCmds = require('./group');
const ownerCmds = require('./owner');
const downloadCmds = require('./download');
const searchCmds = require('./search');
const stalkerCmds = require('./stalker');
const converterCmds = require('./converter');
const aiCmds = require('./ai');
const gameCmds = require('./game');
const religionCmds = require('./religion');
const infoCmds = require('./info');
const stickerCmds = require('./sticker');
const audioCmds = require('./audio');
const extraCmds = require('./extra');

// ===== MESSAGE PARSER =====
function parseMessage(msg) {
    const type = getContentType(msg.message);
    let body = '';

    if (type === 'conversation') body = msg.message.conversation;
    else if (type === 'extendedTextMessage') body = msg.message.extendedTextMessage.text;
    else if (type === 'imageMessage') body = msg.message.imageMessage.caption || '';
    else if (type === 'videoMessage') body = msg.message.videoMessage.caption || '';
    else if (type === 'documentMessage') body = msg.message.documentMessage.caption || '';

    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender = isGroup ? msg.key.participant : from;
    const pushName = msg.pushName || 'User';

    return { type, body, from, isGroup, sender, pushName };
}

// ===== COMMAND HANDLER =====
async function handleCommand(sock, msg, config) {
    try {
        const { type, body, from, isGroup, sender, pushName } = parseMessage(msg);

        if (!body) return;

        // Auto read
        if (config.autoRead) {
            await sock.readMessages([msg.key]).catch(() => {});
        }

        // Check if it's a command
        const prefix = config.prefix;
        if (!body.startsWith(prefix)) return;

        const fullCmd = body.slice(prefix.length).trim();
        const args = fullCmd.split(/ +/);
        const command = args.shift().toLowerCase();
        const text = args.join(' ');

        // Auto typing
        if (config.autoTyping) {
            await sock.sendPresenceUpdate('composing', from).catch(() => {});
        }

        const isOwner = sender.replace('@s.whatsapp.net', '') === config.ownerNumber;

        // Context object for commands
        const ctx = {
            sock,
            msg,
            from,
            sender,
            pushName,
            isGroup,
            isOwner,
            command,
            args,
            text,
            prefix,
            config,
            type,
            reply: async (text) => {
                try {
                    await sock.sendMessage(from, { text: text }, { quoted: msg });
                } catch (e) {}
            },
            replyImage: async (buffer, caption = '') => {
                try {
                    await sock.sendMessage(from, { image: buffer, caption: caption }, { quoted: msg });
                } catch (e) {}
            },
            replyVideo: async (buffer, caption = '') => {
                try {
                    await sock.sendMessage(from, { video: buffer, caption: caption }, { quoted: msg });
                } catch (e) {}
            },
            replyAudio: async (buffer) => {
                try {
                    await sock.sendMessage(from, { audio: buffer, mimetype: 'audio/mp4', ptt: true }, { quoted: msg });
                } catch (e) {}
            },
            replySticker: async (buffer) => {
                try {
                    await sock.sendMessage(from, { sticker: buffer }, { quoted: msg });
                } catch (e) {}
            },
            replyDocument: async (buffer, filename, mimetype) => {
                try {
                    await sock.sendMessage(from, { document: buffer, fileName: filename, mimetype: mimetype }, { quoted: msg });
                } catch (e) {}
            },
            react: async (emoji) => {
                try {
                    await sock.sendMessage(from, { react: { text: emoji, key: msg.key } });
                } catch (e) {}
            }
        };

        // Route commands to modules
        if (generalCmds[command]) return await generalCmds[command](ctx);
        if (toolsCmds[command]) return await toolsCmds[command](ctx);
        if (funCmds[command]) return await funCmds[command](ctx);
        if (groupCmds[command]) return await groupCmds[command](ctx);
        if (ownerCmds[command]) return await ownerCmds[command](ctx);
        if (downloadCmds[command]) return await downloadCmds[command](ctx);
        if (searchCmds[command]) return await searchCmds[command](ctx);
        if (stalkerCmds[command]) return await stalkerCmds[command](ctx);
        if (converterCmds[command]) return await converterCmds[command](ctx);
        if (aiCmds[command]) return await aiCmds[command](ctx);
        if (gameCmds[command]) return await gameCmds[command](ctx);
        if (religionCmds[command]) return await religionCmds[command](ctx);
        if (infoCmds[command]) return await infoCmds[command](ctx);
        if (stickerCmds[command]) return await stickerCmds[command](ctx);
        if (audioCmds[command]) return await audioCmds[command](ctx);
        if (extraCmds[command]) return await extraCmds[command](ctx);

    } catch (err) {
        // Silent error - bot continues working
        console.log('Command error (handled):', err.message);
    }
}

module.exports = { handleCommand };
