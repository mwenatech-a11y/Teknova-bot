module.exports = {
    bass: async (ctx) => { await ctx.react('🔊'); await ctx.reply('🔊 *Bass Boost*\n\nReply audio kisha tumia command. Inahitaji ffmpeg kwenye server.'); },
    slow: async (ctx) => { await ctx.react('🐢'); await ctx.reply('🐢 *Slow Audio*\n\nReply audio. Inahitaji ffmpeg.'); },
    fast: async (ctx) => { await ctx.react('🐇'); await ctx.reply('🐇 *Fast Audio*\n\nReply audio. Inahitaji ffmpeg.'); },
    nightcore: async (ctx) => { await ctx.react('🎵'); await ctx.reply('🎵 *Nightcore*\n\nReply audio. Inahitaji ffmpeg.'); },
    robot: async (ctx) => { await ctx.react('🤖'); await ctx.reply('🤖 *Robot Voice*\n\nReply audio. Inahitaji ffmpeg.'); },
    deep: async (ctx) => { await ctx.react('🔉'); await ctx.reply('🔉 *Deep Voice*\n\nReply audio. Inahitaji ffmpeg.'); },
    reverse: async (ctx) => { await ctx.react('⏪'); await ctx.reply('⏪ *Reverse Audio*\n\nReply audio. Inahitaji ffmpeg.'); },
    '8d': async (ctx) => { await ctx.react('🎧'); await ctx.reply('🎧 *8D Audio*\n\nReply audio. Inahitaji ffmpeg.'); },
};
