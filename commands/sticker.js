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
    sticker: async (ctx) => {
        await ctx.react('🎨');
        const buffer = await getMedia(ctx);
        if (!buffer) return await ctx.reply(`🎨 Reply picha kisha andika ${ctx.prefix}sticker`);
        try {
            // Send image directly as sticker (Baileys handles webp conversion for images)
            await ctx.sock.sendMessage(ctx.from, { sticker: buffer }, { quoted: ctx.msg });
        } catch (e) {
            await ctx.reply('❌ Imeshindwa. Hakikisha umereply picha (si video).');
        }
    },

    s: async (ctx) => { await module.exports.sticker(ctx); },

    ttp: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎨 Mfano: ${ctx.prefix}ttp Habari`);
        await ctx.react('🎨');
        try {
            const res = await fetch(`https://api.popcat.xyz/textcraft?text=${encodeURIComponent(ctx.text)}`, { timeout: 20000 });
            const buffer = await res.buffer();
            await ctx.sock.sendMessage(ctx.from, { sticker: buffer }, { quoted: ctx.msg });
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    toimg: async (ctx) => {
        await ctx.react('🖼️');
        const buffer = await getMedia(ctx);
        if (!buffer) return await ctx.reply('❌ Reply sticker.');
        try {
            await ctx.replyImage(buffer, '🖼️ Sticker to Image');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },
};
