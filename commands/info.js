const fetch = require('node-fetch');
async function safeFetch(url) {
    try { const res = await fetch(url, { timeout: 20000 }); return await res.json(); } catch (e) { return null; }
}

module.exports = {
    crypto: async (ctx) => {
        await ctx.react('💰');
        const coin = (ctx.text || 'bitcoin').toLowerCase();
        const data = await safeFetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_24hr_change=true`);
        if (data && data[coin]) {
            await ctx.reply(`💰 *${coin.toUpperCase()}*\n\n💵 Price: $${data[coin].usd}\n📈 24h: ${data[coin].usd_24h_change?.toFixed(2)}%`);
        } else { await ctx.reply('❌ Coin haijapatikana.'); }
    },

    bitcoin: async (ctx) => {
        await ctx.react('₿');
        const data = await safeFetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        if (data && data.bitcoin) {
            await ctx.reply(`₿ *Bitcoin*\n\n💵 Price: $${data.bitcoin.usd}\n📈 24h: ${data.bitcoin.usd_24h_change?.toFixed(2)}%`);
        } else { await ctx.reply('❌ Imeshindwa.'); }
    },

    country: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🏳️ Mfano: ${ctx.prefix}country Tanzania`);
        await ctx.react('🏳️');
        const data = await safeFetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(ctx.text)}`);
        if (data && data[0]) {
            const c = data[0];
            await ctx.reply(`🏳️ *${c.name.common}*\n\n🏛️ Capital: ${c.capital?.[0] || 'N/A'}\n👥 Population: ${c.population?.toLocaleString()}\n🌍 Region: ${c.region}\n💰 Currency: ${Object.keys(c.currencies || {})[0] || 'N/A'}\n📞 Code: ${c.idd?.root || ''}${c.idd?.suffixes?.[0] || ''}`);
        } else { await ctx.reply('❌ Nchi haijapatikana.'); }
    },

    horoscope: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`♈ Mfano: ${ctx.prefix}horoscope aries`);
        await ctx.react('♈');
        await ctx.reply(`♈ *Horoscope: ${ctx.text}*\n\nLeo ni siku nzuri kwako. Fursa mpya zinakuja. Kuwa makini na maamuzi yako ya kifedha. Mapenzi yako yatang'aa! ⭐`);
    },

    age: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🎂 Mfano: ${ctx.prefix}age 2000-01-15`);
        await ctx.react('🎂');
        try {
            const birth = new Date(ctx.text);
            const now = new Date();
            let age = now.getFullYear() - birth.getFullYear();
            const m = now.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
            await ctx.reply(`🎂 *Age Calculator*\n\nUmri wako: *${age} miaka*`);
        } catch (e) { await ctx.reply('❌ Tarehe si sahihi. Tumia: YYYY-MM-DD'); }
    },

    time: async (ctx) => {
        await ctx.react('⏰');
        const now = new Date();
        await ctx.reply(`⏰ *World Time*\n\n🇹🇿 Tanzania: ${now.toLocaleString('en-US', { timeZone: 'Africa/Dar_es_Salaam' })}\n🇬🇧 London: ${now.toLocaleString('en-US', { timeZone: 'Europe/London' })}\n🇺🇸 New York: ${now.toLocaleString('en-US', { timeZone: 'America/New_York' })}`);
    },

    fact: async (ctx) => {
        await ctx.react('💡');
        const data = await safeFetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
        await ctx.reply(`💡 *Fact*\n\n${data?.text || 'Honey never spoils!'}`);
    },
};
