async function isAdmin(ctx) {
    try {
        const metadata = await ctx.sock.groupMetadata(ctx.from);
        const participant = metadata.participants.find(p => p.id === ctx.sender);
        return participant?.admin === 'admin' || participant?.admin === 'superadmin';
    } catch (e) { return false; }
}
async function isBotAdmin(ctx) {
    try {
        const metadata = await ctx.sock.groupMetadata(ctx.from);
        const botId = ctx.sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const bot = metadata.participants.find(p => p.id.includes(ctx.sock.user.id.split(':')[0]));
        return bot?.admin === 'admin' || bot?.admin === 'superadmin';
    } catch (e) { return false; }
}

module.exports = {
    tagall: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        await ctx.react('📢');
        try {
            const metadata = await ctx.sock.groupMetadata(ctx.from);
            const participants = metadata.participants;
            let text = `📢 *TAG ALL*\n${ctx.text ? '💬 ' + ctx.text + '\n' : ''}\n`;
            participants.forEach(p => { text += `@${p.id.split('@')[0]}\n`; });
            await ctx.sock.sendMessage(ctx.from, { text, mentions: participants.map(p => p.id) }, { quoted: ctx.msg });
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    hidetag: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        await ctx.react('📢');
        try {
            const metadata = await ctx.sock.groupMetadata(ctx.from);
            const participants = metadata.participants;
            await ctx.sock.sendMessage(ctx.from, { text: ctx.text || '📢 Attention!', mentions: participants.map(p => p.id) });
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    kick: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!await isAdmin(ctx)) return await ctx.reply('❌ Wewe si admin.');
        await ctx.react('👢');
        try {
            const mentioned = ctx.msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (mentioned && mentioned.length) {
                await ctx.sock.groupParticipantsUpdate(ctx.from, mentioned, 'remove');
                await ctx.reply('✅ Mtu ametolewa.');
            } else {
                await ctx.reply(`👢 Tag mtu wa kumtoa. Mfano: ${ctx.prefix}kick @user`);
            }
        } catch (e) { await ctx.reply('❌ Imeshindwa. Hakikisha bot ni admin.'); }
    },

    promote: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!await isAdmin(ctx)) return await ctx.reply('❌ Wewe si admin.');
        await ctx.react('⬆️');
        try {
            const mentioned = ctx.msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (mentioned && mentioned.length) {
                await ctx.sock.groupParticipantsUpdate(ctx.from, mentioned, 'promote');
                await ctx.reply('✅ Mtu amekuwa admin.');
            } else { await ctx.reply(`⬆️ Tag mtu. Mfano: ${ctx.prefix}promote @user`); }
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    demote: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!await isAdmin(ctx)) return await ctx.reply('❌ Wewe si admin.');
        await ctx.react('⬇️');
        try {
            const mentioned = ctx.msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (mentioned && mentioned.length) {
                await ctx.sock.groupParticipantsUpdate(ctx.from, mentioned, 'demote');
                await ctx.reply('✅ Admin ametolewa.');
            } else { await ctx.reply(`⬇️ Tag mtu. Mfano: ${ctx.prefix}demote @user`); }
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    group: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        await ctx.react('👥');
        try {
            const metadata = await ctx.sock.groupMetadata(ctx.from);
            await ctx.reply(`👥 *GROUP INFO*\n\n📛 Name: ${metadata.subject}\n👤 Members: ${metadata.participants.length}\n📝 Description: ${metadata.desc || 'Hakuna'}\n🆔 ID: ${metadata.id}`);
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    link: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!await isAdmin(ctx)) return await ctx.reply('❌ Wewe si admin.');
        await ctx.react('🔗');
        try {
            const code = await ctx.sock.groupInviteCode(ctx.from);
            await ctx.reply(`🔗 *Group Link*\n\nhttps://chat.whatsapp.com/${code}`);
        } catch (e) { await ctx.reply('❌ Imeshindwa. Bot lazima awe admin.'); }
    },

    setname: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!await isAdmin(ctx)) return await ctx.reply('❌ Wewe si admin.');
        if (!ctx.text) return await ctx.reply(`📝 Mfano: ${ctx.prefix}setname Jina Jipya`);
        await ctx.react('📝');
        try {
            await ctx.sock.groupUpdateSubject(ctx.from, ctx.text);
            await ctx.reply('✅ Jina la group limebadilishwa.');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    setdesc: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!await isAdmin(ctx)) return await ctx.reply('❌ Wewe si admin.');
        if (!ctx.text) return await ctx.reply(`📝 Mfano: ${ctx.prefix}setdesc Description mpya`);
        await ctx.react('📝');
        try {
            await ctx.sock.groupUpdateDescription(ctx.from, ctx.text);
            await ctx.reply('✅ Description imebadilishwa.');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    mute: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!await isAdmin(ctx)) return await ctx.reply('❌ Wewe si admin.');
        await ctx.react('🔇');
        try {
            await ctx.sock.groupSettingUpdate(ctx.from, 'announcement');
            await ctx.reply('🔇 Group imefungwa. Admin tu wanaweza kuandika.');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    unmute: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!await isAdmin(ctx)) return await ctx.reply('❌ Wewe si admin.');
        await ctx.react('🔊');
        try {
            await ctx.sock.groupSettingUpdate(ctx.from, 'not_announcement');
            await ctx.reply('🔊 Group imefunguliwa. Kila mtu anaweza kuandika.');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    revoke: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!await isAdmin(ctx)) return await ctx.reply('❌ Wewe si admin.');
        await ctx.react('🔄');
        try {
            await ctx.sock.groupRevokeInvite(ctx.from);
            await ctx.reply('✅ Link ya group imebadilishwa.');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    poll: async (ctx) => {
        if (!ctx.isGroup) return await ctx.reply('❌ Command hii ni ya group tu.');
        if (!ctx.text) return await ctx.reply(`📊 Mfano: ${ctx.prefix}poll Swali?|Jibu1|Jibu2`);
        await ctx.react('📊');
        const parts = ctx.text.split('|');
        if (parts.length < 3) return await ctx.reply(`📊 Mfano: ${ctx.prefix}poll Swali?|Jibu1|Jibu2`);
        try {
            await ctx.sock.sendMessage(ctx.from, {
                poll: { name: parts[0], values: parts.slice(1), selectableCount: 1 }
            });
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },
};
