const fetch = require('node-fetch');

async function aiChat(text) {
    try {
        const res = await fetch(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(text)}&owner=TEKNOVA+Owen&botname=TEKNOVA+Bot`);
        const data = await res.json();
        return data.response || 'Samahani, sijaweza kujibu sasa.';
    } catch (e) {
        return 'Samahani, kuna tatizo la mtandao.';
    }
}

module.exports = {
    ai: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🤖 Mfano: ${ctx.prefix}ai Habari, unasemaje?`);
        await ctx.react('🤖');
        const response = await aiChat(ctx.text);
        await ctx.reply(`🤖 *TEKNOVA AI*\n\n${response}`);
    },

    gpt: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🤖 Mfano: ${ctx.prefix}gpt What is AI?`);
        await ctx.react('🤖');
        const response = await aiChat(ctx.text);
        await ctx.reply(`🤖 *GPT Response*\n\n${response}`);
    },

    bard: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🤖 Mfano: ${ctx.prefix}bard Tell me about Tanzania`);
        await ctx.react('🤖');
        const response = await aiChat(ctx.text);
        await ctx.reply(`🤖 *Bard Response*\n\n${response}`);
    },

    chat: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`💬 Mfano: ${ctx.prefix}chat Mambo vipi?`);
        await ctx.react('💬');
        const response = await aiChat(ctx.text);
        await ctx.reply(response);
    },

    ask: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`❓ Mfano: ${ctx.prefix}ask What is the capital of Tanzania?`);
        await ctx.react('❓');
        const response = await aiChat(ctx.text);
        await ctx.reply(`❓ *Answer*\n\n${response}`);
    },

    translate: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🌐 Mfano: ${ctx.prefix}translate en hello my friend`);
        await ctx.react('🌐');
        const [lang, ...words] = ctx.args;
        const text = words.join(' ');
        try {
            const res = await fetch(`https://api.popcat.xyz/translate?to=${lang}&text=${encodeURIComponent(text)}`);
            const data = await res.json();
            await ctx.reply(`🌐 *Translation*\n\n📝 Original: ${text}\n🔄 Translated: ${data.translated || text}`);
        } catch (e) {
            await ctx.reply(`🌐 *Translation*\n\n${text}`);
        }
    },

    grammar: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📝 Mfano: ${ctx.prefix}grammar I is going to school`);
        await ctx.react('📝');
        const response = await aiChat(`Fix the grammar of this sentence: ${ctx.text}`);
        await ctx.reply(`📝 *Grammar Fix*\n\n✅ ${response}`);
    },

    summarize: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📋 Mfano: ${ctx.prefix}summarize [long text]`);
        await ctx.react('📋');
        const response = await aiChat(`Summarize this: ${ctx.text}`);
        await ctx.reply(`📋 *Summary*\n\n${response}`);
    },

    explain: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📖 Mfano: ${ctx.prefix}explain quantum physics`);
        await ctx.react('📖');
        const response = await aiChat(`Explain this simply: ${ctx.text}`);
        await ctx.reply(`📖 *Explanation*\n\n${response}`);
    },

    code: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`💻 Mfano: ${ctx.prefix}code hello world in python`);
        await ctx.react('💻');
        const response = await aiChat(`Write code for: ${ctx.text}`);
        await ctx.reply(`💻 *Code*\n\n${response}`);
    },

    debug: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🔧 Mfano: ${ctx.prefix}debug [paste your code]`);
        await ctx.react('🔧');
        const response = await aiChat(`Debug this code: ${ctx.text}`);
        await ctx.reply(`🔧 *Debug*\n\n${response}`);
    },

    poem: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📝 Mfano: ${ctx.prefix}poem about love`);
        await ctx.react('📝');
        const response = await aiChat(`Write a short poem about: ${ctx.text}`);
        await ctx.reply(`📝 *Poem*\n\n${response}`);
    },

    story: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`📖 Mfano: ${ctx.prefix}story about a brave warrior`);
        await ctx.react('📖');
        const response = await aiChat(`Write a short story about: ${ctx.text}`);
        await ctx.reply(`📖 *Story*\n\n${response}`);
    },

    joke: async (ctx) => {
        await ctx.react('😂');
        try {
            const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
            const data = await res.json();
            await ctx.reply(`😂 *Joke*\n\n${data.joke || 'Why did the bot cross the road? To get more commands!'}`);
        } catch (e) {
            await ctx.reply('😂 Why did the bot cross the road? To get more commands!');
        }
    },

    quote: async (ctx) => {
        await ctx.react('💭');
        try {
            const res = await fetch('https://api.popcat.xyz/quote');
            const data = await res.json();
            await ctx.reply(`💭 *Quote*\n\n"${data.quote || 'Life is beautiful'}"\n\n— ${data.uploader || 'Unknown'}`);
        } catch (e) {
            await ctx.reply('💭 "The only way to do great work is to love what you do." — Steve Jobs');
        }
    },

    advice: async (ctx) => {
        await ctx.react('💡');
        try {
            const res = await fetch('https://api.adviceslip.com/advice');
            const data = await res.json();
            await ctx.reply(`💡 *Advice*\n\n${data.slip?.advice || 'Work hard and be kind.'}`);
        } catch (e) {
            await ctx.reply('💡 Work hard, stay humble, and never give up.');
        }
    },

    motivate: async (ctx) => {
        await ctx.react('🔥');
        const quotes = [
            'Usikate tamaa, mafanikio yako yanakuja! 🔥',
            'Kila siku ni fursa mpya ya kufanikiwa.',
            'Amini ndoto zako na ufanye kazi kwa bidii.',
            'Hakuna kitu kisichowezekana kwa mtu anayeamini.',
            'Leo ni siku yako ya kung\'ara! ⚡',
            'Usiache ndoto zako kwa sababu ya watu wengine.',
            'Mafanikio ni matokeo ya kazi ngumu na uvumilivu.',
            'Wewe ni zaidi ya unavyofikiri. Amini uwezo wako!',
            'Kila hatua ndogo ni hatua kuelekea mafanikio.',
            'Usijali kushindwa, jali kutojaribu.'
        ];
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        await ctx.reply(`🔥 *Motivation*\n\n${random}`);
    },

    lyrics: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎵 Mfano: ${ctx.prefix}lyrics Despacito`);
        await ctx.react('🎵');
        try {
            const res = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(ctx.text)}`);
            const data = await res.json();
            if (data.lyrics) {
                const lyr = data.lyrics.substring(0, 3000);
                await ctx.reply(`🎵 *${data.title || ctx.text}*\n🎤 ${data.artist || 'Unknown'}\n\n${lyr}`);
            } else {
                await ctx.reply('❌ Lyrics hazijapatikana.');
            }
        } catch (e) {
            await ctx.reply('❌ Lyrics hazijapatikana. Jaribu jina lingine.');
        }
    },

    dalle: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎨 Mfano: ${ctx.prefix}dalle a beautiful sunset`);
        await ctx.react('🎨');
        await ctx.reply('🎨 Samahani, AI image generation inahitaji API key. Wasiliana na owner.');
    },

    imagine: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎨 Mfano: ${ctx.prefix}imagine a futuristic city`);
        await ctx.react('🎨');
        await ctx.reply('🎨 Samahani, AI image generation inahitaji API key. Wasiliana na owner.');
    },
};
