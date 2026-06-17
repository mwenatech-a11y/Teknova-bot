const fetch = require('node-fetch');

async function safeFetch(url) {
    try {
        const res = await fetch(url, { timeout: 20000 });
        return await res.json();
    } catch (e) { return null; }
}

module.exports = {
    google: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🔍 Mfano: ${ctx.prefix}google Tanzania history`);
        await ctx.react('🔍');
        await ctx.reply(`🔍 *Google Search:* ${ctx.text}\n\n🔗 https://www.google.com/search?q=${encodeURIComponent(ctx.text)}`);
    },

    bing: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🔍 Mfano: ${ctx.prefix}bing weather`);
        await ctx.react('🔍');
        await ctx.reply(`🔍 *Bing:* ${ctx.text}\n\n🔗 https://www.bing.com/search?q=${encodeURIComponent(ctx.text)}`);
    },

    youtube: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📺 Mfano: ${ctx.prefix}youtube music videos`);
        await ctx.react('📺');
        try {
            const data = await safeFetch(`https://api.popcat.xyz/youtube?q=${encodeURIComponent(ctx.text)}`);
            if (data && data.results) {
                let txt = `📺 *YouTube Results: ${ctx.text}*\n\n`;
                data.results.slice(0, 5).forEach((v, i) => {
                    txt += `${i + 1}. *${v.title}*\n🔗 ${v.url}\n\n`;
                });
                await ctx.reply(txt);
            } else {
                await ctx.reply(`📺 https://www.youtube.com/results?search_query=${encodeURIComponent(ctx.text)}`);
            }
        } catch (e) {
            await ctx.reply(`📺 https://www.youtube.com/results?search_query=${encodeURIComponent(ctx.text)}`);
        }
    },

    ytsearch: async (ctx) => { await module.exports.youtube(ctx); },

    image: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🖼️ Mfano: ${ctx.prefix}image cars`);
        await ctx.react('🖼️');
        await ctx.reply(`🖼️ *Image Search:* ${ctx.text}\n\n🔗 https://www.google.com/search?tbm=isch&q=${encodeURIComponent(ctx.text)}`);
    },

    wiki: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📖 Mfano: ${ctx.prefix}wiki Tanzania`);
        await ctx.react('📖');
        try {
            const data = await safeFetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ctx.text)}`);
            if (data && data.extract) {
                await ctx.reply(`📖 *${data.title}*\n\n${data.extract}\n\n🔗 ${data.content_urls?.desktop?.page || ''}`);
            } else {
                await ctx.reply('❌ Hakuna matokeo Wikipedia.');
            }
        } catch (e) {
            await ctx.reply('❌ Imeshindwa kutafuta.');
        }
    },

    weather: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🌤️ Mfano: ${ctx.prefix}weather Dar es Salaam`);
        await ctx.react('🌤️');
        try {
            const data = await safeFetch(`https://api.popcat.xyz/weather?q=${encodeURIComponent(ctx.text)}`);
            if (data && data[0]) {
                const w = data[0].current;
                await ctx.reply(`🌤️ *Weather: ${ctx.text}*\n\n🌡️ Temp: ${w?.temperature || 'N/A'}\n☁️ ${w?.skytext || ''}\n💧 Humidity: ${w?.humidity || 'N/A'}%\n💨 Wind: ${w?.winddisplay || 'N/A'}`);
            } else {
                await ctx.reply(`🌤️ Weather: https://www.google.com/search?q=weather+${encodeURIComponent(ctx.text)}`);
            }
        } catch (e) {
            await ctx.reply(`🌤️ https://www.google.com/search?q=weather+${encodeURIComponent(ctx.text)}`);
        }
    },

    news: async (ctx) => {
        await ctx.react('📰');
        await ctx.reply(`📰 *Habari za Hivi Punde*\n\n🔗 https://news.google.com\n\n_Habari za Tanzania: https://www.google.com/search?q=habari+tanzania_`);
    },

    movie: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎬 Mfano: ${ctx.prefix}movie Avengers`);
        await ctx.react('🎬');
        try {
            const data = await safeFetch(`https://www.omdbapi.com/?apikey=4f4b3322&t=${encodeURIComponent(ctx.text)}`);
            if (data && data.Response === 'True') {
                const caption = `🎬 *${data.Title}* (${data.Year})\n\n⭐ Rating: ${data.imdbRating}\n🎭 Genre: ${data.Genre}\n⏱️ Runtime: ${data.Runtime}\n🎬 Director: ${data.Director}\n👥 Actors: ${data.Actors}\n\n📝 ${data.Plot}`;
                if (data.Poster && data.Poster !== 'N/A') {
                    const res = await fetch(data.Poster);
                    const buffer = await res.buffer();
                    await ctx.replyImage(buffer, caption);
                } else {
                    await ctx.reply(caption);
                }
            } else {
                await ctx.reply('❌ Movie haijapatikana.');
            }
        } catch (e) {
            await ctx.reply('❌ Imeshindwa kutafuta movie.');
        }
    },

    github: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`💻 Mfano: ${ctx.prefix}github username`);
        await ctx.react('💻');
        try {
            const data = await safeFetch(`https://api.github.com/users/${encodeURIComponent(ctx.text)}`);
            if (data && data.login) {
                await ctx.reply(`💻 *GitHub: ${data.login}*\n\n👤 Name: ${data.name || 'N/A'}\n📝 Bio: ${data.bio || 'N/A'}\n📦 Repos: ${data.public_repos}\n👥 Followers: ${data.followers}\n👤 Following: ${data.following}\n🔗 ${data.html_url}`);
            } else {
                await ctx.reply('❌ User hajapatikana.');
            }
        } catch (e) {
            await ctx.reply('❌ Imeshindwa kutafuta.');
        }
    },

    dictionary: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📚 Mfano: ${ctx.prefix}dictionary hello`);
        await ctx.react('📚');
        try {
            const data = await safeFetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(ctx.text)}`);
            if (data && data[0]) {
                const def = data[0].meanings[0]?.definitions[0]?.definition || 'No definition';
                await ctx.reply(`📚 *${data[0].word}*\n\n📖 ${def}\n\n🔊 ${data[0].phonetic || ''}`);
            } else {
                await ctx.reply('❌ Neno halijapatikana.');
            }
        } catch (e) {
            await ctx.reply('❌ Imeshindwa kutafuta.');
        }
    },

    anime: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎌 Mfano: ${ctx.prefix}anime Naruto`);
        await ctx.react('🎌');
        try {
            const data = await safeFetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(ctx.text)}&limit=1`);
            if (data && data.data && data.data[0]) {
                const a = data.data[0];
                await ctx.reply(`🎌 *${a.title}*\n\n⭐ Score: ${a.score || 'N/A'}\n📺 Episodes: ${a.episodes || 'N/A'}\n📅 Status: ${a.status}\n\n📝 ${(a.synopsis || '').substring(0, 500)}`);
            } else {
                await ctx.reply('❌ Anime haijapatikana.');
            }
        } catch (e) {
            await ctx.reply('❌ Imeshindwa kutafuta.');
        }
    },

    playstore: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📱 Mfano: ${ctx.prefix}playstore whatsapp`);
        await ctx.react('📱');
        await ctx.reply(`📱 *Play Store:* ${ctx.text}\n\n🔗 https://play.google.com/store/search?q=${encodeURIComponent(ctx.text)}`);
    },

    urban: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📖 Mfano: ${ctx.prefix}urban yeet`);
        await ctx.react('📖');
        try {
            const data = await safeFetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(ctx.text)}`);
            if (data && data.list && data.list[0]) {
                await ctx.reply(`📖 *${ctx.text}*\n\n${data.list[0].definition.substring(0, 800)}\n\n_Example:_ ${(data.list[0].example || '').substring(0, 300)}`);
            } else {
                await ctx.reply('❌ Neno halijapatikana.');
            }
        } catch (e) {
            await ctx.reply('❌ Imeshindwa kutafuta.');
        }
    },

    recipe: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🍳 Mfano: ${ctx.prefix}recipe pilau`);
        await ctx.react('🍳');
        await ctx.reply(`🍳 *Recipe:* ${ctx.text}\n\n🔗 https://www.google.com/search?q=${encodeURIComponent(ctx.text)}+recipe`);
    },

    npm: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📦 Mfano: ${ctx.prefix}npm express`);
        await ctx.react('📦');
        await ctx.reply(`📦 *NPM:* ${ctx.text}\n\n🔗 https://www.npmjs.com/package/${encodeURIComponent(ctx.text)}`);
    },

    appstore: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📱 Mfano: ${ctx.prefix}appstore instagram`);
        await ctx.react('📱');
        await ctx.reply(`📱 *App Store:* ${ctx.text}\n\n🔗 https://www.apple.com/us/search/${encodeURIComponent(ctx.text)}`);
    },

    wallpaper: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🖼️ Mfano: ${ctx.prefix}wallpaper nature`);
        await ctx.react('🖼️');
        await ctx.reply(`🖼️ *Wallpaper:* ${ctx.text}\n\n🔗 https://wallpaperaccess.com/search?q=${encodeURIComponent(ctx.text)}`);
    },

    manga: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📚 Mfano: ${ctx.prefix}manga One Piece`);
        await ctx.react('📚');
        try {
            const data = await safeFetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(ctx.text)}&limit=1`);
            if (data && data.data && data.data[0]) {
                const m = data.data[0];
                await ctx.reply(`📚 *${m.title}*\n\n⭐ Score: ${m.score || 'N/A'}\n📖 Chapters: ${m.chapters || 'N/A'}\n📅 Status: ${m.status}\n\n${(m.synopsis || '').substring(0, 400)}`);
            } else {
                await ctx.reply('❌ Manga haijapatikana.');
            }
        } catch (e) {
            await ctx.reply('❌ Imeshindwa.');
        }
    },
};
