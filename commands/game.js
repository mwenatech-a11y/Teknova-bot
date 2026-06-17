const fetch = require('node-fetch');
async function safeFetch(url) {
    try { const res = await fetch(url, { timeout: 20000 }); return await res.json(); } catch (e) { return null; }
}

module.exports = {
    truth: async (ctx) => {
        await ctx.react('🎯');
        const truths = [
            'Ni nani umewahi kumpenda kwa siri?',
            'Umewahi kusema uongo gani mkubwa?',
            'Ni siri gani huijawahi kumwambia mtu?',
            'Umewahi kufanya nini cha aibu zaidi?',
            'Ni nani unayemtegemea zaidi maishani?',
            'Umewahi kuiba kitu? Ni nini?',
            'Ndoto yako kubwa ni ipi?'
        ];
        await ctx.reply(`🎯 *TRUTH*\n\n${truths[Math.floor(Math.random() * truths.length)]}`);
    },

    dare: async (ctx) => {
        await ctx.react('🔥');
        const dares = [
            'Piga selfie na uweke status kwa dakika 10.',
            'Mpigie simu rafiki yako wa karibu sasa hivi.',
            'Andika status ya kupenda kwa mtu yeyote.',
            'Imba wimbo na urekodi video.',
            'Tuma ujumbe wa kuchekesha kwa mtu wa random.',
            'Badilisha profile picture yako kuwa ya kuchekesha.',
            'Sema jambo zuri kuhusu kila mtu kwenye group.'
        ];
        await ctx.reply(`🔥 *DARE*\n\n${dares[Math.floor(Math.random() * dares.length)]}`);
    },

    tod: async (ctx) => {
        await ctx.react('🎲');
        await ctx.reply(`🎲 *Truth or Dare*\n\nChagua: ${ctx.prefix}truth au ${ctx.prefix}dare`);
    },

    riddle: async (ctx) => {
        await ctx.react('🧩');
        const riddles = [
            { q: 'Nina miji lakini hakuna nyumba, nina milima lakini hakuna miti. Mimi ni nini?', a: 'Ramani' },
            { q: 'Kadiri unavyochukua zaidi, ndivyo ninavyobaki nyuma zaidi. Mimi ni nini?', a: 'Hatua/Nyayo' },
            { q: 'Nina ufunguo lakini sina mlango. Mimi ni nini?', a: 'Piano' },
            { q: 'Naongea bila mdomo na nasikia bila masikio. Mimi ni nini?', a: 'Mwangwi (Echo)' }
        ];
        const r = riddles[Math.floor(Math.random() * riddles.length)];
        await ctx.reply(`🧩 *RIDDLE*\n\n${r.q}\n\n_Jibu litakuja baada ya sekunde 15..._`);
        setTimeout(() => ctx.reply(`✅ *Jibu:* ${r.a}`), 15000);
    },

    math: async (ctx) => {
        await ctx.react('🔢');
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * 50) + 1;
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        const answer = op === '+' ? a + b : op === '-' ? a - b : a * b;
        await ctx.reply(`🔢 *MATH QUIZ*\n\n${a} ${op} ${b} = ?\n\n_Jibu litakuja sekunde 15..._`);
        setTimeout(() => ctx.reply(`✅ *Jibu:* ${answer}`), 15000);
    },

    rps: async (ctx) => {
        await ctx.react('✊');
        if (!ctx.text) return await ctx.reply(`✊ Mfano: ${ctx.prefix}rps rock/paper/scissors`);
        const choices = ['rock', 'paper', 'scissors'];
        const bot = choices[Math.floor(Math.random() * 3)];
        const user = ctx.text.toLowerCase();
        let result = 'Draw!';
        if ((user === 'rock' && bot === 'scissors') || (user === 'paper' && bot === 'rock') || (user === 'scissors' && bot === 'paper')) result = 'Umeshinda! 🎉';
        else if (user !== bot) result = 'Umeshindwa! 😢';
        await ctx.reply(`✊ *Rock Paper Scissors*\n\n👤 Wewe: ${user}\n🤖 Bot: ${bot}\n\n${result}`);
    },

    guess: async (ctx) => {
        await ctx.react('🔢');
        const num = Math.floor(Math.random() * 10) + 1;
        await ctx.reply(`🔢 *GUESS THE NUMBER*\n\nNimefikiria namba kati ya 1-10.\n_Jibu litakuja sekunde 10..._`);
        setTimeout(() => ctx.reply(`✅ Namba ilikuwa: *${num}*`), 10000);
    },

    quiz: async (ctx) => {
        await ctx.react('❓');
        const data = await safeFetch('https://opentdb.com/api.php?amount=1&type=multiple');
        if (data && data.results && data.results[0]) {
            const q = data.results[0];
            const answers = [...q.incorrect_answers, q.correct_answer].sort();
            let txt = `❓ *QUIZ*\n\n${decodeURIComponent(q.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'"))}\n\n`;
            answers.forEach((a, i) => { txt += `${i + 1}. ${a.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}\n`; });
            await ctx.reply(txt);
            setTimeout(() => ctx.reply(`✅ *Jibu:* ${q.correct_answer.replace(/&quot;/g, '"')}`), 15000);
        } else { await ctx.reply('❌ Imeshindwa.'); }
    },

    trivia: async (ctx) => { await module.exports.quiz(ctx); },

    slot: async (ctx) => {
        await ctx.react('🎰');
        const emojis = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣'];
        const s = [0,0,0].map(() => emojis[Math.floor(Math.random() * emojis.length)]);
        const win = s[0] === s[1] && s[1] === s[2];
        await ctx.reply(`🎰 *SLOT MACHINE*\n\n[ ${s[0]} | ${s[1]} | ${s[2]} ]\n\n${win ? '🎉 JACKPOT! Umeshinda!' : '😢 Jaribu tena!'}`);
    },

    scramble: async (ctx) => {
        await ctx.react('🔤');
        const words = ['teknova', 'kompyuta', 'simu', 'mtandao', 'programu', 'maendeleo'];
        const word = words[Math.floor(Math.random() * words.length)];
        const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
        await ctx.reply(`🔤 *WORD SCRAMBLE*\n\nPanga herufi: *${scrambled}*\n\n_Jibu sekunde 15..._`);
        setTimeout(() => ctx.reply(`✅ *Jibu:* ${word}`), 15000);
    },
};
