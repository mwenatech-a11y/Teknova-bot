const fetch = require('node-fetch');

async function safeFetch(url) {
    try {
        const res = await fetch(url, { timeout: 30000 });
        return await res.json();
    } catch (e) {
        return null;
    }
}

module.exports = {
    play: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎵 Mfano: ${ctx.prefix}play despacito`);
        await ctx.react('🎵');
        await ctx.reply(`🎵 *Inatafuta:* ${ctx.text}\n\n_Inapakia audio..._`);
        try {
            const search = await safeFetch(`https://api.popcat.xyz/youtube?q=${encodeURIComponent(ctx.text)}`);
            if (search && search.results && search.results[0]) {
                const video = search.results[0];
                await ctx.reply(`🎵 *${video.title}*\n\n🔗 ${video.url}\n\n_Bonyeza link kuangalia/kupakua. Audio download inahitaji API ya ziada._`);
            } else {
                await ctx.reply(`🎵 *${ctx.text}*\n\n🔗 https://www.youtube.com/results?search_query=${encodeURIComponent(ctx.text)}\n\n_Bonyeza link kupata audio._`);
            }
        } catch (e) {
            await ctx.reply(`🔗 https://www.youtube.com/results?search_query=${encodeURIComponent(ctx.text)}`);
        }
    },

    video: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎬 Mfano: ${ctx.prefix}video despacito`);
        await ctx.react('🎬');
        await ctx.reply(`🎬 *${ctx.text}*\n\n🔗 https://www.youtube.com/results?search_query=${encodeURIComponent(ctx.text)}\n\n_Bonyeza link kuangalia video._`);
    },

    ytmp3: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎵 Mfano: ${ctx.prefix}ytmp3 [YouTube URL]`);
        await ctx.react('🎵');
        await ctx.reply(`🎵 *YouTube to MP3*\n\n🔗 ${ctx.text}\n\n_Audio download inahitaji API. Tumia ${ctx.prefix}play kutafuta._`);
    },

    ytmp4: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎬 Mfano: ${ctx.prefix}ytmp4 [YouTube URL]`);
        await ctx.react('🎬');
        await ctx.reply(`🎬 *YouTube to MP4*\n\n🔗 ${ctx.text}`);
    },

    tiktok: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎵 Mfano: ${ctx.prefix}tiktok [TikTok URL]`);
        await ctx.react('🎵');
        try {
            const data = await safeFetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(ctx.text)}`);
            if (data && data.data && data.data.play) {
                const res = await fetch(data.data.play);
                const buffer = await res.buffer();
                await ctx.replyVideo(buffer, `🎵 *TikTok Download*\n\n${data.data.title || ''}\n\n⚡ TEKNOVA OWEN BOT`);
            } else {
                await ctx.reply('❌ Imeshindwa kupakua. Hakikisha URL ni sahihi.');
            }
        } catch (e) {
            await ctx.reply('❌ Imeshindwa kupakua TikTok video.');
        }
    },

    tt: async (ctx) => { await module.exports.tiktok(ctx); },

    instagram: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📸 Mfano: ${ctx.prefix}instagram [IG URL]`);
        await ctx.react('📸');
        await ctx.reply(`📸 *Instagram Download*\n\n🔗 ${ctx.text}\n\n_Inahitaji API. Wasiliana na owner._`);
    },

    ig: async (ctx) => { await module.exports.instagram(ctx); },

    igstory: async (ctx) => {
        await ctx.react('📸');
        await ctx.reply(`📸 *IG Story*\n\nMfano: ${ctx.prefix}igstory username`);
    },

    facebook: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📘 Mfano: ${ctx.prefix}facebook [FB URL]`);
        await ctx.react('📘');
        await ctx.reply(`📘 *Facebook Download*\n\n🔗 ${ctx.text}\n\n_Inapakia..._`);
    },

    fb: async (ctx) => { await module.exports.facebook(ctx); },

    twitter: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🐦 Mfano: ${ctx.prefix}twitter [Twitter URL]`);
        await ctx.react('🐦');
        await ctx.reply(`🐦 *Twitter Download*\n\n🔗 ${ctx.text}`);
    },

    tweet: async (ctx) => { await module.exports.twitter(ctx); },

    pinterest: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📌 Mfano: ${ctx.prefix}pinterest cars`);
        await ctx.react('📌');
        try {
            const data = await safeFetch(`https://api.popcat.xyz/pinterest?q=${encodeURIComponent(ctx.text)}`);
            if (data && data.images && data.images[0]) {
                const res = await fetch(data.images[0]);
                const buffer = await res.buffer();
                await ctx.replyImage(buffer, `📌 *Pinterest:* ${ctx.text}`);
            } else {
                await ctx.reply('❌ Hakuna picha zilizopatikana.');
            }
        } catch (e) {
            await ctx.reply('❌ Imeshindwa kupakua.');
        }
    },

    pin: async (ctx) => { await module.exports.pinterest(ctx); },

    mediafire: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📁 Mfano: ${ctx.prefix}mediafire [URL]`);
        await ctx.react('📁');
        await ctx.reply(`📁 *Mediafire*\n\n🔗 ${ctx.text}`);
    },

    apk: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📱 Mfano: ${ctx.prefix}apk whatsapp`);
        await ctx.react('📱');
        await ctx.reply(`📱 *APK Search:* ${ctx.text}\n\n🔗 https://www.apkmirror.com/?s=${encodeURIComponent(ctx.text)}`);
    },

    song: async (ctx) => { await module.exports.play(ctx); },
    music: async (ctx) => { await module.exports.play(ctx); },
    mp3: async (ctx) => { await module.exports.play(ctx); },
    mp4: async (ctx) => { await module.exports.video(ctx); },
    spotify: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎵 Mfano: ${ctx.prefix}spotify [Spotify URL au jina]`);
        await ctx.react('🎵');
        await ctx.reply(`🎵 *Spotify:* ${ctx.text}\n\n_Inapakia..._`);
    },
    gdrive: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📁 Mfano: ${ctx.prefix}gdrive [URL]`);
        await ctx.react('📁');
        await ctx.reply(`📁 *Google Drive*\n\n🔗 ${ctx.text}`);
    },
    mega: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📁 Mfano: ${ctx.prefix}mega [URL]`);
        await ctx.react('📁');
        await ctx.reply(`📁 *Mega Download*\n\n🔗 ${ctx.text}`);
    },
};
