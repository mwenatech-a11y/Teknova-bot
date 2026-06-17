const fetch = require('node-fetch');

async function safeFetch(url) {
    try { const res = await fetch(url, { timeout: 20000 }); return await res.json(); } catch (e) { return null; }
}
async function safeBuffer(url) {
    try { const res = await fetch(url, { timeout: 20000 }); return await res.buffer(); } catch (e) { return null; }
}

const mod = {};

// ===== ANIMAL / FUN IMAGE COMMANDS =====
const animalApis = {
    cat: 'https://api.thecatapi.com/v1/images/search',
    dog: 'https://api.thedogapi.com/v1/images/search',
};
mod.cat = async (ctx) => {
    await ctx.react('🐱');
    const data = await safeFetch(animalApis.cat);
    if (data && data[0]?.url) { const b = await safeBuffer(data[0].url); if (b) return await ctx.replyImage(b, '🐱 Cat'); }
    await ctx.reply('❌ Imeshindwa.');
};
mod.dog = async (ctx) => {
    await ctx.react('🐶');
    const data = await safeFetch(animalApis.dog);
    if (data && data[0]?.url) { const b = await safeBuffer(data[0].url); if (b) return await ctx.replyImage(b, '🐶 Dog'); }
    await ctx.reply('❌ Imeshindwa.');
};
mod.fox = async (ctx) => {
    await ctx.react('🦊');
    const data = await safeFetch('https://randomfox.ca/floof/');
    if (data && data.image) { const b = await safeBuffer(data.image); if (b) return await ctx.replyImage(b, '🦊 Fox'); }
    await ctx.reply('❌ Imeshindwa.');
};
mod.duck = async (ctx) => {
    await ctx.react('🦆');
    const data = await safeFetch('https://random-d.uk/api/random');
    if (data && data.url) { const b = await safeBuffer(data.url); if (b) return await ctx.replyImage(b, '🦆 Duck'); }
    await ctx.reply('❌ Imeshindwa.');
};

// ===== TEXT FUN COMMANDS =====
mod.bmi = async (ctx) => {
    await ctx.react('⚖️');
    const parts = (ctx.text || '').split(' ');
    if (parts.length < 2) return await ctx.reply(`⚖️ Mfano: ${ctx.prefix}bmi 70 1.75 (uzito_kg urefu_m)`);
    const w = parseFloat(parts[0]); const h = parseFloat(parts[1]);
    if (!w || !h) return await ctx.reply('❌ Weka namba sahihi.');
    const bmi = (w / (h * h)).toFixed(1);
    let cat = bmi < 18.5 ? 'Mwembamba' : bmi < 25 ? 'Sawa' : bmi < 30 ? 'Mnene kiasi' : 'Mnene sana';
    await ctx.reply(`⚖️ *BMI Calculator*\n\nBMI yako: *${bmi}*\nHali: *${cat}*`);
};
mod.love = async (ctx) => {
    await ctx.react('❤️');
    const names = (ctx.text || '').split(/[+&]| na /);
    if (names.length < 2) return await ctx.reply(`❤️ Mfano: ${ctx.prefix}love Juma + Asha`);
    const pct = Math.floor(Math.random() * 51) + 50;
    await ctx.reply(`❤️ *Love Calculator*\n\n${names[0].trim()} 💕 ${names[1].trim()}\n\nMapenzi: *${pct}%*\n${'█'.repeat(Math.floor(pct/10))}${'░'.repeat(10-Math.floor(pct/10))}`);
};
mod.lucky = async (ctx) => {
    await ctx.react('🍀');
    await ctx.reply(`🍀 *Lucky Number*\n\nNamba yako ya bahati leo ni: *${Math.floor(Math.random()*100)}*`);
};
mod.iq = async (ctx) => {
    await ctx.react('🧠');
    const target = ctx.text || ctx.pushName;
    await ctx.reply(`🧠 *IQ Test*\n\n${target} ana IQ ya: *${Math.floor(Math.random()*100)+50}* 🤓`);
};
mod.rate = async (ctx) => {
    await ctx.react('⭐');
    const target = ctx.text || ctx.pushName;
    await ctx.reply(`⭐ *Rating*\n\n${target}: *${Math.floor(Math.random()*5)+6}/10* 🔥`);
};
mod.ship = async (ctx) => {
    await ctx.react('💞');
    const names = (ctx.text || '').split(/[+&]| na /);
    if (names.length < 2) return await ctx.reply(`💞 Mfano: ${ctx.prefix}ship Juma + Asha`);
    const a = names[0].trim(); const b = names[1].trim();
    const shipName = a.slice(0, Math.ceil(a.length/2)) + b.slice(Math.floor(b.length/2));
    await ctx.reply(`💞 *Ship Name*\n\n${a} + ${b} = *${shipName}*\n\nMatch: *${Math.floor(Math.random()*51)+50}%*`);
};
mod.quote = async (ctx) => {
    await ctx.react('💬');
    const data = await safeFetch('https://api.quotable.io/random');
    await ctx.reply(`💬 *Quote*\n\n"${data?.content || 'The best way to predict the future is to create it.'}"\n\n— ${data?.author || 'Unknown'}`);
};
mod.advice = async (ctx) => {
    await ctx.react('💡');
    const data = await safeFetch('https://api.adviceslip.com/advice');
    await ctx.reply(`💡 *Advice*\n\n${data?.slip?.advice || 'Believe in yourself.'}`);
};
mod.joke = async (ctx) => {
    await ctx.react('😂');
    const data = await safeFetch('https://official-joke-api.appspot.com/random_joke');
    await ctx.reply(`😂 *Joke*\n\n${data?.setup || 'Why did the chicken cross the road?'}\n\n${data?.punchline || 'To get to the other side!'}`);
};
mod.motivate = async (ctx) => {
    await ctx.react('💪');
    const quotes = [
        'Usikate tamaa, mafanikio yako yapo karibu! 💪',
        'Kila siku ni fursa mpya ya kufanya vizuri zaidi.',
        'Ndoto zako ni halali. Fanya kazi kuzifikia! 🚀',
        'Mafanikio ni safari, si marudio. Endelea kusonga mbele.'
    ];
    await ctx.reply(`💪 *Motivation*\n\n${quotes[Math.floor(Math.random()*quotes.length)]}`);
};

// ===== UTILITY TEXT COMMANDS =====
mod.calc = async (ctx) => {
    if (!ctx.text) return await ctx.reply(`🧮 Mfano: ${ctx.prefix}calc 5 * 8 + 2`);
    await ctx.react('🧮');
    try {
        const expr = ctx.text.replace(/[^0-9+\-*/().% ]/g, '');
        const result = Function('"use strict"; return (' + expr + ')')();
        await ctx.reply(`🧮 *Calculator*\n\n${ctx.text} = *${result}*`);
    } catch (e) { await ctx.reply('❌ Hesabu si sahihi.'); }
};
mod.base64enc = async (ctx) => {
    if (!ctx.text) return await ctx.reply(`🔐 Mfano: ${ctx.prefix}base64enc Habari`);
    await ctx.reply(`🔐 *Base64 Encode*\n\n${Buffer.from(ctx.text).toString('base64')}`);
};
mod.base64dec = async (ctx) => {
    if (!ctx.text) return await ctx.reply(`🔓 Mfano: ${ctx.prefix}base64dec SGFiYXJp`);
    try { await ctx.reply(`🔓 *Base64 Decode*\n\n${Buffer.from(ctx.text, 'base64').toString('utf-8')}`); }
    catch (e) { await ctx.reply('❌ Imeshindwa.'); }
};
mod.binary = async (ctx) => {
    if (!ctx.text) return await ctx.reply(`💻 Mfano: ${ctx.prefix}binary Hi`);
    const bin = ctx.text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    await ctx.reply(`💻 *Text to Binary*\n\n${bin}`);
};
mod.password = async (ctx) => {
    await ctx.react('🔑');
    const len = parseInt(ctx.text) || 12;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let pw = '';
    for (let i = 0; i < Math.min(len, 50); i++) pw += chars[Math.floor(Math.random() * chars.length)];
    await ctx.reply(`🔑 *Password Generated*\n\n${pw}`);
};
mod.uuid = async (ctx) => {
    const { randomUUID } = require('crypto');
    await ctx.reply(`🆔 *UUID*\n\n${randomUUID()}`);
};
mod.dice = async (ctx) => {
    await ctx.react('🎲');
    await ctx.reply(`🎲 *Dice Roll*\n\nUmepata: *${Math.floor(Math.random()*6)+1}*`);
};
mod.flip = async (ctx) => {
    await ctx.react('🪙');
    await ctx.reply(`🪙 *Coin Flip*\n\n${Math.random() < 0.5 ? 'HEADS 👑' : 'TAILS 🦅'}`);
};
mod.rps = async (ctx) => {
    await ctx.react('✊');
    const opts = ['Rock ✊', 'Paper ✋', 'Scissors ✌️'];
    await ctx.reply(`✊ *Rock Paper Scissors*\n\nBot amechagua: *${opts[Math.floor(Math.random()*3)]}*`);
};
mod.guess = async (ctx) => {
    await ctx.react('🔢');
    await ctx.reply(`🔢 *Guess Number*\n\nNimewaza namba kati ya 1-10... Ni *${Math.floor(Math.random()*10)+1}*!`);
};

// ===== TRUTH OR DARE / QUIZ =====
mod.truth = async (ctx) => {
    await ctx.react('🤔');
    const truths = [
        'Ni siri gani huijawahi kumwambia mtu yeyote?',
        'Umewahi kupenda mtu kimya kimya?',
        'Ni jambo gani la aibu zaidi umewahi kufanya?',
        'Unaogopa nini zaidi maishani?'
    ];
    await ctx.reply(`🤔 *Truth*\n\n${truths[Math.floor(Math.random()*truths.length)]}`);
};
mod.dare = async (ctx) => {
    await ctx.react('😈');
    const dares = [
        'Tuma ujumbe wa kuchekesha kwa mtu wa mwisho kwenye chat zako.',
        'Imba wimbo na urekodi sauti.',
        'Badilisha picha yako ya WhatsApp kwa dakika 10.',
        'Andika status ya kuchekesha sasa hivi.'
    ];
    await ctx.reply(`😈 *Dare*\n\n${dares[Math.floor(Math.random()*dares.length)]}`);
};
mod.riddle = async (ctx) => {
    await ctx.react('🧩');
    await ctx.reply(`🧩 *Riddle*\n\nNina miji lakini hakuna nyumba, nina misitu lakini hakuna miti, nina maji lakini hakuna samaki. Mimi ni nani?\n\n_Jibu: Ramani 🗺️_`);
};

// ===== ALIASES & EXTRA TEXT TOOLS =====
mod.ask = async (ctx) => { const ai = require('./ai'); if (ai.ai) return await ai.ai(ctx); };
mod.fact = async (ctx) => {
    await ctx.react('💡');
    const data = await safeFetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
    await ctx.reply(`💡 *Fact*\n\n${data?.text || 'Honey never spoils!'}`);
};

module.exports = mod;
