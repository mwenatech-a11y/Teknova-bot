const fs = require('fs-extra');

module.exports = {
    broadcast: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        if (!ctx.text) return await ctx.reply(`📢 Mfano: ${ctx.prefix}broadcast Ujumbe wako`);
        await ctx.react('📢');
        try {
            const chats = await ctx.sock.groupFetchAllParticipating();
            const ids = Object.keys(chats);
            for (const id of ids) {
                await ctx.sock.sendMessage(id, { text: `📢 *BROADCAST*\n\n${ctx.text}\n\n_⚡ TEKNOVA OWEN BOT_` });
                await new Promise(r => setTimeout(r, 1500));
            }
            await ctx.reply(`✅ Broadcast imetumwa kwa group ${ids.length}.`);
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    block: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        await ctx.react('🚫');
        try {
            const mentioned = ctx.msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            const target = mentioned?.[0] || ctx.from;
            await ctx.sock.updateBlockStatus(target, 'block');
            await ctx.reply('✅ User amebanwa (blocked).');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    unblock: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        await ctx.react('✅');
        try {
            const mentioned = ctx.msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            const target = mentioned?.[0] || ctx.from;
            await ctx.sock.updateBlockStatus(target, 'unblock');
            await ctx.reply('✅ User ametolewa block.');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    join: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        if (!ctx.text) return await ctx.reply(`🔗 Mfano: ${ctx.prefix}join [group link]`);
        await ctx.react('🔗');
        try {
            const code = ctx.text.split('chat.whatsapp.com/')[1];
            await ctx.sock.groupAcceptInvite(code);
            await ctx.reply('✅ Bot imejiunga na group.');
        } catch (e) { await ctx.reply('❌ Imeshindwa kujiunga.'); }
    },

    leave: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        if (!ctx.isGroup) return await ctx.reply('❌ Hii ni group tu.');
        await ctx.react('👋');
        await ctx.reply('👋 Bot inatoka group. Kwaheri!');
        try { await ctx.sock.groupLeave(ctx.from); } catch (e) {}
    },

    setbio: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        if (!ctx.text) return await ctx.reply(`📝 Mfano: ${ctx.prefix}setbio Bio mpya`);
        await ctx.react('📝');
        try {
            await ctx.sock.updateProfileStatus(ctx.text);
            await ctx.reply('✅ Bio imebadilishwa.');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    setbotname: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        if (!ctx.text) return await ctx.reply(`📝 Mfano: ${ctx.prefix}setbotname Jina`);
        await ctx.react('📝');
        try {
            await ctx.sock.updateProfileName(ctx.text);
            await ctx.reply('✅ Jina la bot limebadilishwa.');
        } catch (e) { await ctx.reply('❌ Imeshindwa.'); }
    },

    restart: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        await ctx.react('🔄');
        await ctx.reply('🔄 Bot inarestart...');
        process.exit(0);
    },

    shutdown: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        await ctx.react('⛔');
        await ctx.reply('⛔ Bot inazimwa...');
        process.exit(0);
    },

    eval: async (ctx) => {
        if (!ctx.isOwner) return await ctx.reply('❌ Command hii ni ya owner tu.');
        if (!ctx.text) return;
        try {
            let result = eval(ctx.text);
            if (typeof result !== 'string') result = JSON.stringify(result, null, 2);
            await ctx.reply(`✅ *Result:*\n\n${result}`);
        } catch (e) { await ctx.reply(`❌ Error: ${e.message}`); }
    },
};
