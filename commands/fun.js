const fetch = require('node-fetch');

async function fetchImage(url) {
    try {
        const res = await fetch(url, { timeout: 20000 });
        return await res.buffer();
    } catch (e) { return null; }
}
async function safeFetch(url) {
    try {
        const res = await fetch(url, { timeout: 20000 });
        return await res.json();
    } catch (e) { return null; }
}

function randomPercent() { return Math.floor(Math.random() * 101); }

module.exports = {
    meme: async (ctx) => {
        await ctx.react('😂');
        try {
            const data = await safeFetch('https://meme-api.com/gimme');
            if (data && data.url) {
                const buffer = await fetchImage(data.url);
                if (buffer) return await ctx.replyImage(buffer, `😂 ${data.title || 'Meme'}`);
            }
            await ctx.reply('😂 Imeshindwa kupata meme.');
        } catch (e) { await ctx.reply('😂 Imeshindwa kupata meme.'); }
    },

    pickup: async (ctx) => {
        await ctx.react('😍');
        try {
            const data = await safeFetch('https://api.popcat.xyz/pickuplines');
            await ctx.reply(`😍 *Pickup Line*\n\n${data?.pickupline || 'Are you a magician? Because whenever I look at you, everyone else disappears.'}`);
        } catch (e) {
            await ctx.reply('😍 Are you WiFi? Because I\'m feeling a connection.');
        }
    },

    roast: async (ctx) => {
        await ctx.react('🔥');
        const roasts = [
            'Wewe ni kama Monday, hakuna anayekupenda.',
            'Akili yako iko kwenye airplane mode.',
            'Hata Google haijui ulichotaka kusema.',
            'Wewe ni proof kwamba evolution inaweza kwenda nyuma.',
            'Ukisema utafikiri, ni kazi ngumu kwako.'
        ];
        await ctx.reply(`🔥 *Roast*\n\n${roasts[Math.floor(Math.random() * roasts.length)]}`);
    },

    compliment: async (ctx) => {
        await ctx.react('💖');
        const c = [
            'Wewe ni mtu mzuri sana wa moyo! 💖',
            'Tabasamu lako linang\'arisha siku.',
            'Una akili ya kipekee na ya ajabu!',
            'Dunia ni nzuri zaidi kwa sababu yako.',
            'Wewe ni nyota inayong\'aa! ⭐'
        ];
        await ctx.reply(`💖 *Compliment*\n\n${c[Math.floor(Math.random() * c.length)]}`);
    },

    gay: async (ctx) => {
        await ctx.react('🏳️‍🌈');
        const target = ctx.text || ctx.pushName;
        await ctx.reply(`🏳️‍🌈 *Gay Meter*\n\n${target} ni gay kwa ${randomPercent()}% 🌈`);
    },

    simp: async (ctx) => {
        await ctx.react('😍');
        const target = ctx.text || ctx.pushName;
        await ctx.reply(`😍 *Simp Meter*\n\n${target} ni simp kwa ${randomPercent()}%`);
    },

    iq: async (ctx) => {
        await ctx.react('🧠');
        const target = ctx.text || ctx.pushName;
        await ctx.reply(`🧠 *IQ Test*\n\n${target} ana IQ ya ${Math.floor(Math.random() * 150) + 50}`);
    },

    rate: async (ctx) => {
        await ctx.react('⭐');
        const target = ctx.text || ctx.pushName;
        await ctx.reply(`⭐ *Rating*\n\n${target}: ${Math.floor(Math.random() * 10) + 1}/10`);
    },

    love: async (ctx) => {
        await ctx.react('❤️');
        const names = ctx.text.split(' ');
        if (names.length < 2) return await ctx.reply(`❤️ Mfano: ${ctx.prefix}love John Mary`);
        await ctx.reply(`❤️ *Love Calculator*\n\n${names[0]} 💕 ${names[1]}\n\nLove: ${randomPercent()}% ❤️`);
    },

    ship: async (ctx) => {
        await ctx.react('💕');
        const names = ctx.text.split(' ');
        if (names.length < 2) return await ctx.reply(`💕 Mfano: ${ctx.prefix}ship John Mary`);
        const ship = names[0].slice(0, names[0].length / 2) + names[1].slice(names[1].length / 2);
        await ctx.reply(`💕 *Ship Name*\n\n${names[0]} + ${names[1]} = *${ship}*\n\nMatch: ${randomPercent()}%`);
    },

    cat: async (ctx) => {
        await ctx.react('🐱');
        const buffer = await fetchImage('https://cataas.com/cat');
        if (buffer) return await ctx.replyImage(buffer, '🐱 Meow!');
        await ctx.reply('🐱 Imeshindwa.');
    },

    dog: async (ctx) => {
        await ctx.react('🐶');
        const data = await safeFetch('https://dog.ceo/api/breeds/image/random');
        if (data && data.message) {
            const buffer = await fetchImage(data.message);
            if (buffer) return await ctx.replyImage(buffer, '🐶 Woof!');
        }
        await ctx.reply('🐶 Imeshindwa.');
    },

    fox: async (ctx) => {
        await ctx.react('🦊');
        const data = await safeFetch('https://randomfox.ca/floof/');
        if (data && data.image) {
            const buffer = await fetchImage(data.image);
            if (buffer) return await ctx.replyImage(buffer, '🦊');
        }
        await ctx.reply('🦊 Imeshindwa.');
    },

    fact: async (ctx) => {
        await ctx.react('💡');
        const data = await safeFetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
        await ctx.reply(`💡 *Random Fact*\n\n${data?.text || 'Octopuses have three hearts!'}`);
    },

    darkjoke: async (ctx) => {
        await ctx.react('😈');
        const data = await safeFetch('https://v2.jokeapi.dev/joke/Dark?type=single');
        await ctx.reply(`😈 *Dark Joke*\n\n${data?.joke || 'I have a joke about time travel, but you didn\'t like it.'}`);
    },

    hack: async (ctx) => {
        await ctx.react('💻');
        const target = ctx.text || ctx.pushName;
        await ctx.reply(`💻 *HACKING ${target}...*`);
        setTimeout(() => ctx.reply('🔓 Accessing database... 25%'), 1000);
        setTimeout(() => ctx.reply('🔓 Bypassing firewall... 60%'), 2000);
        setTimeout(() => ctx.reply('🔓 Downloading data... 90%'), 3000);
        setTimeout(() => ctx.reply('😂 Just kidding! Hii ni fun command tu. Hatuwezi kuhack mtu!'), 4000);
    },

    waifu: async (ctx) => {
        await ctx.react('🌸');
        const data = await safeFetch('https://api.waifu.pics/sfw/waifu');
        if (data && data.url) {
            const buffer = await fetchImage(data.url);
            if (buffer) return await ctx.replyImage(buffer, '🌸 Waifu');
        }
        await ctx.reply('🌸 Imeshindwa.');
    },

    neko: async (ctx) => {
        await ctx.react('🐱');
        const data = await safeFetch('https://api.waifu.pics/sfw/neko');
        if (data && data.url) {
            const buffer = await fetchImage(data.url);
            if (buffer) return await ctx.replyImage(buffer, '🐱 Neko');
        }
        await ctx.reply('🐱 Imeshindwa.');
    },

    slap: async (ctx) => {
        await ctx.react('👋');
        const data = await safeFetch('https://api.waifu.pics/sfw/slap');
        if (data && data.url) {
            const buffer = await fetchImage(data.url);
            if (buffer) return await ctx.replyVideo(buffer, '👋 Slap!');
        }
        await ctx.reply('👋 Slap!');
    },

    hug: async (ctx) => {
        await ctx.react('🤗');
        const data = await safeFetch('https://api.waifu.pics/sfw/hug');
        if (data && data.url) {
            const buffer = await fetchImage(data.url);
            if (buffer) return await ctx.replyVideo(buffer, '🤗 Hug!');
        }
        await ctx.reply('🤗 Hug!');
    },

    flip: async (ctx) => {
        await ctx.react('🪙');
        await ctx.reply(`🪙 *Coin Flip*\n\n${Math.random() < 0.5 ? 'HEADS 👑' : 'TAILS 🪙'}`);
    },

    dice: async (ctx) => {
        await ctx.react('🎲');
        await ctx.reply(`🎲 *Dice Roll*\n\nUmepata: *${Math.floor(Math.random() * 6) + 1}*`);
    },
};
