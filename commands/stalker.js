const fetch = require('node-fetch');
async function safeFetch(url) {
    try { const res = await fetch(url, { timeout: 20000 }); return await res.json(); } catch (e) { return null; }
}
async function fetchBuffer(url) {
    try { const res = await fetch(url, { timeout: 20000 }); return await res.buffer(); } catch (e) { return null; }
}

module.exports = {
    ghstalk: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`💻 Mfano: ${ctx.prefix}ghstalk username`);
        await ctx.react('💻');
        const data = await safeFetch(`https://api.github.com/users/${encodeURIComponent(ctx.text)}`);
        if (data && data.login) {
            const caption = `💻 *GitHub Stalker*\n\n👤 Username: ${data.login}\n📛 Name: ${data.name || 'N/A'}\n📝 Bio: ${data.bio || 'N/A'}\n📦 Repos: ${data.public_repos}\n👥 Followers: ${data.followers}\n👤 Following: ${data.following}\n📍 Location: ${data.location || 'N/A'}\n🔗 ${data.html_url}`;
            const buffer = await fetchBuffer(data.avatar_url);
            if (buffer) return await ctx.replyImage(buffer, caption);
            await ctx.reply(caption);
        } else { await ctx.reply('❌ User hajapatikana.'); }
    },

    githubstalk: async (ctx) => { await module.exports.ghstalk(ctx); },

    npmstalk: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📦 Mfano: ${ctx.prefix}npmstalk express`);
        await ctx.react('📦');
        const data = await safeFetch(`https://registry.npmjs.org/${encodeURIComponent(ctx.text)}`);
        if (data && data.name) {
            const latest = data['dist-tags']?.latest;
            await ctx.reply(`📦 *NPM Stalker*\n\n📛 Name: ${data.name}\n📝 Description: ${data.description || 'N/A'}\n🔖 Latest: ${latest}\n👤 Author: ${data.author?.name || 'N/A'}\n🔗 https://www.npmjs.com/package/${data.name}`);
        } else { await ctx.reply('❌ Package haijapatikana.'); }
    },

    wastalk: async (ctx) => {
        await ctx.react('📱');
        const mentioned = ctx.msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned?.[0] || ctx.sender;
        try {
            let pp;
            try { pp = await ctx.sock.profilePictureUrl(target, 'image'); } catch (e) { pp = null; }
            let bio;
            try { const s = await ctx.sock.fetchStatus(target); bio = s?.status; } catch (e) { bio = 'N/A'; }
            const caption = `📱 *WhatsApp Stalker*\n\n📞 Number: ${target.split('@')[0]}\n📝 Bio: ${bio || 'N/A'}`;
            if (pp) {
                const buffer = await fetchBuffer(pp);
                if (buffer) return await ctx.replyImage(buffer, caption);
            }
            await ctx.reply(caption);
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    igstalk: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📸 Mfano: ${ctx.prefix}igstalk username`);
        await ctx.react('📸');
        await ctx.reply(`📸 *Instagram Stalker*\n\n👤 @${ctx.text}\n🔗 https://www.instagram.com/${ctx.text}\n\n_Profile data inahitaji API ya ziada._`);
    },

    ttstalk: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎵 Mfano: ${ctx.prefix}ttstalk username`);
        await ctx.react('🎵');
        await ctx.reply(`🎵 *TikTok Stalker*\n\n👤 @${ctx.text}\n🔗 https://www.tiktok.com/@${ctx.text}`);
    },
};
