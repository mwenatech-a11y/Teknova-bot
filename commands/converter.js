const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const fetch = require('node-fetch');

async function getMedia(ctx) {
    try {
        const quoted = ctx.msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const msg = quoted ? { message: quoted, key: ctx.msg.key } : ctx.msg;
        return await downloadMediaMessage(msg, 'buffer', {});
    } catch (e) { return null; }
}

module.exports = {
    tourl: async (ctx) => {
        await ctx.react('🔗');
        const buffer = await getMedia(ctx);
        if (!buffer) return await ctx.reply('❌ Reply picha/video.');
        try {
            const FormData = require('form-data');
            const form = new FormData();
            form.append('file', buffer, 'file.jpg');
            const res = await fetch('https://telegra.ph/upload', { method: 'POST', body: form });
            const data = await res.json();
            if (data && data[0]) {
                await ctx.reply(`🔗 *URL*\n\nhttps://telegra.ph${data[0].src}`);
            } else { await ctx.reply('❌ Imeshindwa kupakia.'); }
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    topdf: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📄 Mfano: ${ctx.prefix}topdf maandishi yako`);
        await ctx.react('📄');
        await ctx.reply('📄 Inahitaji library ya ziada. Wasiliana na owner.');
    },

    toqr: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📱 Mfano: ${ctx.prefix}toqr maandishi`);
        await ctx.react('📱');
        try {
            const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(ctx.text)}`);
            const buffer = await res.buffer();
            await ctx.replyImage(buffer, '📱 QR Code');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },
};
