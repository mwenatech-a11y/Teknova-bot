const fs = require('fs-extra');
const os = require('os');
const config = require('../config');

module.exports = {
    // ===== MENU =====
    menu: async (ctx) => {
        await ctx.react('⚡');
        const menuText = `
╔══════════════════════╗
║  ⚡ *TEKNOVA OWEN BOT* ⚡
╚══════════════════════╝

👤 *Owner:* TEKNOVA Owen
📊 *Commands:* 500+
⏰ *Uptime:* ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m
👋 *Hi:* ${ctx.pushName}

━━━━━━━━━━━━━━━━━━━━━

📋 *MAIN MENU*
Chagua category:

┌─❑ 「 ⚡ GENERAL 」
│ .menu - Menu kuu
│ .help - Msaada
│ .ping - Check speed
│ .alive - Bot status
│ .owner - Owner info
│ .info - Bot info
│ .speed - Speed test
│ .uptime - Bot uptime
│ .runtime - Runtime
│ .about - Kuhusu bot
│ .donate - Donate
│ .report - Report bug
│ .request - Request feature
│ .rules - Sheria
│ .language - Lugha
└─────────────────

┌─❑ 「 🤖 AI 」
│ .ai - ChatGPT
│ .gpt - GPT-4
│ .bard - Google Bard
│ .dalle - Generate image
│ .imagine - AI Image
│ .chat - AI Chat
│ .ask - Ask anything
│ .translate - Translate
│ .grammar - Fix grammar
│ .summarize - Summarize text
│ .explain - Explain topic
│ .code - Generate code
│ .debug - Debug code
│ .poem - Write poem
│ .story - Write story
│ .joke - Tell joke
│ .quote - Random quote
│ .advice - Get advice
│ .motivate - Motivation
│ .lyrics - Song lyrics
└─────────────────

┌─❑ 「 📥 DOWNLOAD 」
│ .play - YouTube audio
│ .video - YouTube video
│ .ytmp3 - YT to MP3
│ .ytmp4 - YT to MP4
│ .spotify - Spotify download
│ .tiktok - TikTok download
│ .tt - TikTok no WM
│ .instagram - IG download
│ .ig - IG reel
│ .igstory - IG story
│ .facebook - FB download
│ .fb - FB video
│ .twitter - Twitter download
│ .tweet - Tweet download
│ .pinterest - Pinterest
│ .pin - Pin download
│ .mediafire - Mediafire
│ .apk - APK download
│ .song - Song download
│ .music - Music search
│ .mp3 - Audio download
│ .mp4 - Video download
│ .gdrive - Google Drive
│ .mega - Mega download
└─────────────────

┌─❑ 「 🔍 SEARCH 」
│ .google - Google search
│ .bing - Bing search
│ .youtube - YT search
│ .ytsearch - YT search
│ .image - Image search
│ .wiki - Wikipedia
│ .weather - Weather
│ .news - News
│ .movie - Movie info
│ .anime - Anime search
│ .manga - Manga search
│ .github - GitHub search
│ .npm - NPM search
│ .playstore - Play Store
│ .appstore - App Store
│ .shopee - Shopee search
│ .amazon - Amazon search
│ .recipe - Recipe search
│ .dictionary - Dictionary
│ .urban - Urban Dictionary
│ .wallpaper - Wallpaper
│ .ringtone - Ringtone
│ .font - Font search
│ .emoji - Emoji search
│ .stickersearch - Sticker
└─────────────────

┌─❑ 「 🎮 GAMES 」
│ .tictactoe - Tic Tac Toe
│ .truth - Truth
│ .dare - Dare
│ .tod - Truth or Dare
│ .quiz - Quiz
│ .trivia - Trivia
│ .riddle - Riddle
│ .math - Math quiz
│ .wordgame - Word game
│ .hangman - Hangman
│ .rps - Rock Paper Scissors
│ .dice - Roll dice
│ .flip - Flip coin
│ .slot - Slot machine
│ .guess - Guess number
│ .scramble - Word scramble
│ .chess - Chess
│ .sudoku - Sudoku
│ .puzzle - Puzzle
│ .memory - Memory game
│ .snake - Snake game
│ .tetris - Tetris
│ .2048 - 2048 game
│ .blackjack - Blackjack
│ .roulette - Roulette
└─────────────────

┌─❑ 「 👥 GROUP 」
│ .kick - Kick member
│ .add - Add member
│ .promote - Make admin
│ .demote - Remove admin
│ .mute - Mute group
│ .unmute - Unmute group
│ .hidetag - Tag all
│ .tagall - Tag everyone
│ .group - Group info
│ .setname - Set group name
│ .setdesc - Set description
│ .setpp - Set group pic
│ .link - Group link
│ .revoke - Revoke link
│ .poll - Create poll
│ .vote - Vote
│ .warn - Warn member
│ .unwarn - Remove warn
│ .warnlist - Warn list
│ .antilink - Anti link
│ .antispam - Anti spam
│ .welcome - Welcome msg
│ .goodbye - Goodbye msg
│ .antibadword - Anti badword
│ .antidelete - Anti delete
└─────────────────

┌─❑ 「 🛠️ TOOLS 」
│ .calc - Calculator
│ .qr - Generate QR
│ .readqr - Read QR
│ .shorten - Shorten URL
│ .expand - Expand URL
│ .ip - IP lookup
│ .whois - Whois lookup
│ .dns - DNS lookup
│ .ping2 - Ping website
│ .screenshot - Screenshot web
│ .ss - Screenshot
│ .ocr - Image to text
│ .tts - Text to speech
│ .stt - Speech to text
│ .base64enc - Base64 encode
│ .base64dec - Base64 decode
│ .binary - Text to binary
│ .unbinary - Binary to text
│ .hex - Text to hex
│ .unhex - Hex to text
│ .hash - Hash text
│ .password - Gen password
│ .uuid - Generate UUID
│ .color - Color info
│ .timestamp - Timestamp
│ .countdown - Countdown
│ .timer - Set timer
│ .reminder - Set reminder
│ .note - Save note
│ .notes - View notes
│ .delnote - Delete note
│ .todo - Todo list
│ .schedule - Schedule msg
└─────────────────

┌─❑ 「 🎨 STICKER 」
│ .sticker - Make sticker
│ .s - Quick sticker
│ .toimg - Sticker to image
│ .tovid - Sticker to video
│ .emojimix - Mix emojis
│ .smeme - Sticker meme
│ .wm - Watermark sticker
│ .crop - Crop sticker
│ .circle - Circle sticker
│ .rounded - Rounded sticker
│ .flip - Flip sticker
│ .mirror - Mirror sticker
│ .invert - Invert sticker
│ .blur - Blur sticker
│ .pixelate - Pixelate
│ .removebg - Remove BG
│ .ttp - Text to pic
│ .attp - Animated TTP
│ .glow - Glow text
│ .neon - Neon text
│ .3dtext - 3D text
│ .shadow - Shadow text
│ .gradient - Gradient text
│ .fire - Fire text
│ .ice - Ice text
│ .gold - Gold text
└─────────────────

┌─❑ 「 🔊 AUDIO 」
│ .bass - Bass boost
│ .slow - Slow audio
│ .fast - Fast audio
│ .deep - Deep voice
│ .high - High voice
│ .robot - Robot voice
│ .reverse - Reverse audio
│ .echo - Echo effect
│ .nightcore - Nightcore
│ .daycore - Daycore
│ .chipmunk - Chipmunk
│ .demon - Demon voice
│ .distort - Distort
│ .vibrato - Vibrato
│ .tremolo - Tremolo
│ .8d - 8D audio
│ .earrape - Earrape
│ .blown - Blown audio
│ .smooth - Smooth audio
│ .underwater - Underwater
└─────────────────

┌─❑ 「 🔄 CONVERTER 」
│ .tomp3 - Video to MP3
│ .tomp4 - Audio to video
│ .togif - Video to GIF
│ .tourl - Image to URL
│ .topdf - Text to PDF
│ .toqr - Text to QR
│ .compress - Compress
│ .resize - Resize image
│ .rotate - Rotate image
│ .grayscale - Grayscale
│ .sepia - Sepia filter
│ .brightness - Brightness
│ .contrast - Contrast
│ .saturation - Saturation
│ .sharpen - Sharpen
│ .emboss - Emboss
│ .posterize - Posterize
│ .threshold - Threshold
│ .normalize - Normalize
│ .dither - Dither
└─────────────────

┌─❑ 「 📱 STALKER 」
│ .igstalk - IG stalker
│ .ttstalk - TikTok stalk
│ .ghstalk - GitHub stalk
│ .wastalk - WA stalk
│ .fbstalk - FB stalk
│ .ytstalk - YT stalk
│ .twitterstalk - Twitter stalk
│ .npmstalk - NPM stalk
│ .spotstalk - Spotify stalk
│ .telestalk - Telegram stalk
└─────────────────

┌─❑ 「 🕌 RELIGION 」
│ .quran - Quran ayah
│ .hadith - Hadith
│ .dua - Daily dua
│ .asmaul - Asmaul Husna
│ .prayer - Prayer times
│ .bible - Bible verse
│ .psalm - Psalms
│ .proverb - Proverbs
│ .islamic - Islamic quote
│ .tafsir - Tafsir
└─────────────────

┌─❑ 「 ℹ️ INFO 」
│ .covid - Covid stats
│ .crypto - Crypto price
│ .bitcoin - BTC price
│ .forex - Forex rates
│ .gold - Gold price
│ .earthquake - Earthquakes
│ .horoscope - Horoscope
│ .zodiac - Zodiac info
│ .country - Country info
│ .population - Population
│ .holiday - Holidays
│ .time - World time
│ .date - Date info
│ .calendar - Calendar
│ .age - Calculate age
│ .bmi - BMI calculator
│ .love - Love calculator
│ .compat - Compatibility
│ .lucky - Lucky number
│ .fact - Random fact
└─────────────────

┌─❑ 「 😂 FUN 」
│ .meme - Random meme
│ .darkjoke - Dark joke
│ .pickup - Pickup line
│ .roast - Roast someone
│ .compliment - Compliment
│ .hack - Fake hack
│ .virus - Fake virus
│ .crash - Fake crash
│ .gay - Gay meter
│ .simp - Simp meter
│ .iq - IQ test
│ .howold - How old
│ .rate - Rate face
│ .ship - Ship names
│ .waifu - Waifu pic
│ .neko - Neko pic
│ .cat - Cat pic
│ .dog - Dog pic
│ .fox - Fox pic
│ .panda - Panda pic
│ .bird - Bird pic
│ .duck - Duck pic
│ .moan - Moan audio
│ .fart - Fart audio
│ .slap - Slap gif
│ .hug - Hug gif
│ .kiss - Kiss gif
│ .punch - Punch gif
│ .pat - Pat gif
│ .kill - Kill gif
│ .bonk - Bonk gif
│ .cry - Cry gif
│ .happy - Happy gif
│ .dance - Dance gif
│ .triggered - Triggered
│ .wanted - Wanted poster
│ .jail - Jail image
│ .rip - RIP image
│ .trash - Trash image
│ .beautiful - Beautiful
│ .facepalm - Facepalm
│ .rainbow - Rainbow
│ .affect - Affect image
│ .wasted - Wasted GTA
│ .sus - Among Us
└─────────────────

┌─❑ 「 👑 OWNER 」
│ .broadcast - Broadcast
│ .ban - Ban user
│ .unban - Unban user
│ .banlist - Ban list
│ .join - Join group
│ .leave - Leave group
│ .block - Block user
│ .unblock - Unblock user
│ .setprefix - Change prefix
│ .setbotname - Change name
│ .setbotpp - Change pic
│ .setbio - Change bio
│ .shutdown - Shutdown bot
│ .restart - Restart bot
│ .update - Update bot
│ .backup - Backup session
│ .clearsession - Clear session
│ .eval - Evaluate code
│ .exec - Execute cmd
│ .shell - Shell command
│ .addcmd - Add command
│ .delcmd - Delete command
│ .mode - Bot mode
│ .public - Public mode
│ .private - Private mode
│ .anticall - Anti call
│ .autoread - Auto read
│ .autotyping - Auto typing
│ .alwaysonline - Always online
└─────────────────

⚡ *Total Commands: 500+*
📌 *Prefix:* ${ctx.prefix}
👤 *Owner:* wa.me/${config.ownerNumber}

_⚡ TEKNOVA OWEN BOT v${config.botVersion}_
`;
        await ctx.replyImage(fs.readFileSync('./media/botpic.jpg'), menuText);
    },

    // ===== HELP =====
    help: async (ctx) => {
        await ctx.react('📋');
        await ctx.reply(`⚡ *TEKNOVA OWEN BOT - HELP*\n\nTumia ${ctx.prefix}menu kuona commands zote.\n\nMfano:\n${ctx.prefix}ai habari\n${ctx.prefix}play despacito\n${ctx.prefix}sticker (reply picha)\n\n👤 Owner: wa.me/${config.ownerNumber}`);
    },

    // ===== ALIVE =====
    alive: async (ctx) => {
        await ctx.react('⚡');
        await ctx.replyImage(fs.readFileSync('./media/botpic.jpg'), `⚡ *TEKNOVA OWEN BOT*\n\n✅ Bot iko hai na inafanya kazi!\n\n📊 Commands: 500+\n⏰ Uptime: ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m\n👤 Owner: TEKNOVA Owen\n📌 Prefix: ${ctx.prefix}\n\n_Type ${ctx.prefix}menu kuona commands_`);
    },

    // ===== PING =====
    ping: async (ctx) => {
        const start = Date.now();
        await ctx.react('🏓');
        const end = Date.now();
        await ctx.reply(`🏓 *Pong!*\n\n⚡ Speed: ${end - start}ms\n📊 RAM: ${(os.totalmem() - os.freemem() / 1024 / 1024).toFixed(0)} MB\n💻 Platform: ${os.platform()}\n⏰ Uptime: ${Math.floor(process.uptime() / 60)} min`);
    },

    // ===== OWNER =====
    owner: async (ctx) => {
        await ctx.react('👑');
        const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:TEKNOVA Owen\nTEL;type=CELL;type=VOICE;waid=255772991908:+255772991908\nEND:VCARD';
        await ctx.sock.sendMessage(ctx.from, {
            contacts: {
                displayName: 'TEKNOVA Owen',
                contacts: [{ vcard }]
            }
        }, { quoted: ctx.msg });
    },

    // ===== INFO =====
    info: async (ctx) => {
        await ctx.react('ℹ️');
        await ctx.reply(`ℹ️ *BOT INFO*\n\n⚡ Name: ${config.botName}\n👤 Owner: ${config.ownerName}\n📞 Number: +${config.ownerNumber}\n📊 Commands: 500+\n📌 Prefix: ${config.prefix}\n🔖 Version: ${config.botVersion}\n💻 Platform: ${os.platform()} ${os.arch()}\n📦 Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n⏰ Uptime: ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m ${Math.floor(process.uptime() % 60)}s\n🌐 Node: ${process.version}`);
    },

    // ===== SPEED =====
    speed: async (ctx) => {
        const start = Date.now();
        await ctx.react('⚡');
        const end = Date.now();
        await ctx.reply(`⚡ *SPEED TEST*\n\n📶 Response: ${end - start}ms\n💾 RAM Used: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n💾 RAM Total: ${(os.totalmem() / 1024 / 1024).toFixed(0)} MB\n💻 CPU: ${os.cpus()[0]?.model || 'Unknown'}\n🔄 Load: ${os.loadavg()[0].toFixed(2)}`);
    },

    // ===== UPTIME =====
    uptime: async (ctx) => {
        await ctx.react('⏰');
        const up = process.uptime();
        const h = Math.floor(up / 3600);
        const m = Math.floor((up % 3600) / 60);
        const s = Math.floor(up % 60);
        await ctx.reply(`⏰ *BOT UPTIME*\n\n${h} saa, ${m} dakika, ${s} sekunde`);
    },

    runtime: async (ctx) => {
        const up = process.uptime();
        const h = Math.floor(up / 3600);
        const m = Math.floor((up % 3600) / 60);
        const s = Math.floor(up % 60);
        await ctx.reply(`⏰ *Runtime:* ${h}h ${m}m ${s}s`);
    },

    // ===== ABOUT =====
    about: async (ctx) => {
        await ctx.react('📖');
        await ctx.reply(`📖 *KUHUSU TEKNOVA OWEN BOT*\n\nBot hii imetengenezwa na TEKNOVA Owen.\nIna commands 500+ za kufanya kazi mbalimbali.\n\n🔧 Technology: Node.js + Baileys\n📱 Platform: WhatsApp Multi-Device\n🔐 Security: End-to-end encrypted\n\n👤 Developer: TEKNOVA Owen\n📞 Contact: wa.me/${config.ownerNumber}`);
    },

    // ===== DONATE =====
    donate: async (ctx) => {
        await ctx.react('💰');
        await ctx.reply(`💰 *DONATE*\n\nUkipenda bot hii, unaweza kusupport:\n\n📱 M-Pesa: +${config.ownerNumber}\n\nAsante kwa support yako! ⚡`);
    },

    // ===== REPORT =====
    report: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📝 Mfano: ${ctx.prefix}report Bot haifanyi kazi vizuri`);
        await ctx.react('📝');
        const ownerJid = config.ownerNumber + '@s.whatsapp.net';
        await ctx.sock.sendMessage(ownerJid, { text: `📝 *REPORT*\n\n👤 From: ${ctx.pushName}\n📞 Number: ${ctx.sender}\n💬 Message: ${ctx.text}` });
        await ctx.reply('✅ Report yako imetumwa kwa owner. Asante!');
    },

    // ===== REQUEST =====
    request: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📝 Mfano: ${ctx.prefix}request Ongeza command ya ...`);
        await ctx.react('📝');
        const ownerJid = config.ownerNumber + '@s.whatsapp.net';
        await ctx.sock.sendMessage(ownerJid, { text: `📝 *REQUEST*\n\n👤 From: ${ctx.pushName}\n📞 Number: ${ctx.sender}\n💬 Request: ${ctx.text}` });
        await ctx.reply('✅ Request yako imetumwa kwa owner. Asante!');
    },

    // ===== RULES =====
    rules: async (ctx) => {
        await ctx.reply(`📜 *SHERIA ZA BOT*\n\n1. Usitumie bot kwa spam\n2. Usitumie bot kwa mambo haramu\n3. Heshimu watu wengine\n4. Usijaribu kuhack bot\n5. Fuata maelekezo ya owner\n\n⚠️ Ukivunja sheria utabanwa!`);
    },

    // ===== LANGUAGE =====
    language: async (ctx) => {
        await ctx.reply(`🌐 *LUGHA*\n\nBot hii inasupport:\n- Kiswahili 🇹🇿\n- English 🇬🇧\n\nTumia lugha yoyote kupiga command.`);
    },

    // Aliases
    start: async (ctx) => { await module.exports.menu(ctx); },
    cmd: async (ctx) => { await module.exports.menu(ctx); },
    commands: async (ctx) => { await module.exports.menu(ctx); },
    list: async (ctx) => { await module.exports.menu(ctx); },
    allmenu: async (ctx) => { await module.exports.menu(ctx); },
    botmenu: async (ctx) => { await module.exports.menu(ctx); },
};
