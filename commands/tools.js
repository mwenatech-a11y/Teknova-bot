const fetch = require('node-fetch');
const crypto = require('crypto');

async function safeFetch(url) {
    try {
        const res = await fetch(url, { timeout: 20000 });
        return await res.json();
    } catch (e) { return null; }
}
async function fetchBuffer(url) {
    try {
        const res = await fetch(url, { timeout: 20000 });
        return await res.buffer();
    } catch (e) { return null; }
}

module.exports = {
    calc: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🧮 Mfano: ${ctx.prefix}calc 5 + 3 * 2`);
        await ctx.react('🧮');
        try {
            const sanitized = ctx.text.replace(/[^0-9+\-*/.() ]/g, '');
            const result = Function('"use strict"; return (' + sanitized + ')')();
            await ctx.reply(`🧮 *Calculator*\n\n${ctx.text} = *${result}*`);
        } catch (e) { await ctx.reply('❌ Hesabu si sahihi.'); }
    },

    qr: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📱 Mfano: ${ctx.prefix}qr https://teknova.com`);
        await ctx.react('📱');
        const buffer = await fetchBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(ctx.text)}`);
        if (buffer) return await ctx.replyImage(buffer, `📱 *QR Code*\n\n${ctx.text}`);
        await ctx.reply('❌ Imeshindwa.');
    },

    shorten: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🔗 Mfano: ${ctx.prefix}shorten https://example.com`);
        await ctx.react('🔗');
        try {
            const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(ctx.text)}`, { timeout: 15000 });
            const short = await res.text();
            await ctx.reply(`🔗 *URL Shortener*\n\n📎 Original: ${ctx.text}\n✂️ Short: ${short}`);
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    ip: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🌐 Mfano: ${ctx.prefix}ip 8.8.8.8`);
        await ctx.react('🌐');
        const data = await safeFetch(`http://ip-api.com/json/${ctx.text}`);
        if (data && data.status === 'success') {
            await ctx.reply(`🌐 *IP Lookup*\n\n📍 IP: ${data.query}\n🏳️ Country: ${data.country}\n🏙️ City: ${data.city}\n🏢 ISP: ${data.isp}\n🌐 Region: ${data.regionName}\n⏰ Timezone: ${data.timezone}`);
        } else { await ctx.reply('❌ IP haijapatikana.'); }
    },

    tts: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🔊 Mfano: ${ctx.prefix}tts Habari yako`);
        await ctx.react('🔊');
        const buffer = await fetchBuffer(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(ctx.text)}&tl=sw&client=tw-ob`);
        if (buffer) return await ctx.replyAudio(buffer);
        await ctx.reply('❌ Imeshindwa.');
    },

    base64enc: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🔐 Mfano: ${ctx.prefix}base64enc Hello`);
        await ctx.react('🔐');
        await ctx.reply(`🔐 *Base64 Encode*\n\n${Buffer.from(ctx.text).toString('base64')}`);
    },

    base64dec: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🔓 Mfano: ${ctx.prefix}base64dec SGVsbG8=`);
        await ctx.react('🔓');
        try {
            await ctx.reply(`🔓 *Base64 Decode*\n\n${Buffer.from(ctx.text, 'base64').toString('utf-8')}`);
        } catch (e) { await ctx.reply('❌ Si sahihi.'); }
    },

    binary: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`💻 Mfano: ${ctx.prefix}binary Hi`);
        await ctx.react('💻');
        const bin = ctx.text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        await ctx.reply(`💻 *Binary*\n\n${bin}`);
    },

    unbinary: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`💻 Mfano: ${ctx.prefix}unbinary 01001000`);
        await ctx.react('💻');
        try {
            const text = ctx.text.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
            await ctx.reply(`💻 *Text*\n\n${text}`);
        } catch (e) { await ctx.reply('❌ Si sahihi.'); }
    },

    hash: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🔐 Mfano: ${ctx.prefix}hash password`);
        await ctx.react('🔐');
        await ctx.reply(`🔐 *Hash*\n\n📝 MD5: ${crypto.createHash('md5').update(ctx.text).digest('hex')}\n📝 SHA256: ${crypto.createHash('sha256').update(ctx.text).digest('hex')}`);
    },

    password: async (ctx) => {
        await ctx.react('🔑');
        const len = parseInt(ctx.text) || 16;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let pass = '';
        for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
        await ctx.reply(`🔑 *Password Generated*\n\n\`${pass}\`\n\n_Length: ${len}_`);
    },

    uuid: async (ctx) => {
        await ctx.react('🆔');
        await ctx.reply(`🆔 *UUID*\n\n${crypto.randomUUID()}`);
    },

    color: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎨 Mfano: ${ctx.prefix}color #FF5733`);
        await ctx.react('🎨');
        const hex = ctx.text.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        await ctx.reply(`🎨 *Color Info*\n\n#${hex.toUpperCase()}\nRGB: ${r}, ${g}, ${b}`);
    },

    whois: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🌐 Mfano: ${ctx.prefix}whois google.com`);
        await ctx.react('🌐');
        await ctx.reply(`🌐 *Whois:* ${ctx.text}\n\n🔗 https://who.is/whois/${encodeURIComponent(ctx.text)}`);
    },

    screenshot: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📸 Mfano: ${ctx.prefix}screenshot google.com`);
        await ctx.react('📸');
        const url = ctx.text.startsWith('http') ? ctx.text : 'https://' + ctx.text;
        const buffer = await fetchBuffer(`https://image.thum.io/get/fullpage/${url}`);
        if (buffer) return await ctx.replyImage(buffer, `📸 Screenshot: ${ctx.text}`);
        await ctx.reply('❌ Imeshindwa.');
    },

    ss: async (ctx) => { await module.exports.screenshot(ctx); },

    timestamp: async (ctx) => {
        await ctx.react('⏰');
        await ctx.reply(`⏰ *Timestamp*\n\nUnix: ${Math.floor(Date.now() / 1000)}\nMillis: ${Date.now()}\nDate: ${new Date().toLocaleString()}`);
    },

    hex: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`💻 Mfano: ${ctx.prefix}hex Hi`);
        await ctx.react('💻');
        await ctx.reply(`💻 *Hex*\n\n${Buffer.from(ctx.text).toString('hex')}`);
    },

    bmi: async (ctx) => {
        const args = ctx.text.split(' ');
        if (args.length < 2) return await ctx.reply(`⚖️ Mfano: ${ctx.prefix}bmi 70 1.75 (uzito kg, urefu m)`);
        await ctx.react('⚖️');
        const w = parseFloat(args[0]), h = parseFloat(args[1]);
        const bmi = (w / (h * h)).toFixed(1);
        let cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
        await ctx.reply(`⚖️ *BMI Calculator*\n\nBMI: ${bmi}\nStatus: ${cat}`);
    },
};
