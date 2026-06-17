const fetch = require('node-fetch');
async function safeFetch(url) {
    try { const res = await fetch(url, { timeout: 20000 }); return await res.json(); } catch (e) { return null; }
}

module.exports = {
    quran: async (ctx) => {
        await ctx.react('🕌');
        const num = parseInt(ctx.text) || Math.floor(Math.random() * 6236) + 1;
        const data = await safeFetch(`https://api.alquran.cloud/v1/ayah/${num}/editions/quran-simple,en.asad`);
        if (data && data.data) {
            const ar = data.data[0];
            const en = data.data[1];
            await ctx.reply(`🕌 *Quran*\n\n${ar.text}\n\n📖 ${en.text}\n\n_Surah ${ar.surah.englishName}, Ayah ${ar.numberInSurah}_`);
        } else { await ctx.reply('❌ Imeshindwa.'); }
    },

    dua: async (ctx) => {
        await ctx.react('🤲');
        const duas = [
            'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً\n\n"Mola wetu, tupe mema duniani na mema akhera, na utuepushe na adhabu ya Moto."',
            '"Ee Allah, nisaidie kukukumbuka, kukushukuru, na kukuabudu vizuri."',
            '"Ee Allah, nakuomba elimu yenye manufaa, riziki nzuri, na amali zinazokubaliwa."'
        ];
        await ctx.reply(`🤲 *Dua*\n\n${duas[Math.floor(Math.random() * duas.length)]}`);
    },

    bible: async (ctx) => {
        await ctx.react('✝️');
        const data = await safeFetch('https://bible-api.com/?random=verse');
        if (data && data.text) {
            await ctx.reply(`✝️ *Bible Verse*\n\n${data.text.trim()}\n\n📖 ${data.reference}`);
        } else {
            await ctx.reply('✝️ *Bible Verse*\n\n"Kwa maana jinsi hii Mungu aliupenda ulimwengu..." — Yohana 3:16');
        }
    },

    hadith: async (ctx) => {
        await ctx.react('🕌');
        await ctx.reply(`🕌 *Hadith*\n\n"Matendo hutegemea nia, na kila mtu atapata kile alichonuia." \n\n— Bukhari & Muslim`);
    },

    prayer: async (ctx) => {
        if (!ctx.text) return await ctx.reply(`🕌 Mfano: ${ctx.prefix}prayer Dar es Salaam`);
        await ctx.react('🕌');
        const data = await safeFetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(ctx.text)}&country=Tanzania&method=2`);
        if (data && data.data && data.data.timings) {
            const t = data.data.timings;
            await ctx.reply(`🕌 *Prayer Times - ${ctx.text}*\n\n🌅 Fajr: ${t.Fajr}\n☀️ Dhuhr: ${t.Dhuhr}\n🌤️ Asr: ${t.Asr}\n🌇 Maghrib: ${t.Maghrib}\n🌙 Isha: ${t.Isha}`);
        } else { await ctx.reply('❌ Imeshindwa.'); }
    },
};
