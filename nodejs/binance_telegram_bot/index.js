require('dotenv').config();
const bot = require('./modules/telegramApi');

function checkUser(chatId) {
    return chatId == process.config.BINANCE_OWNER_ID;
}

bot.on('message', async (msg) => {
    await binance.useServerTime();
    const chatId = msg.chat.id;

    if (checkUser(chatId)) {
        const currency = msg.text
        binance.balance((error, balances) => {
            if (balances[currency]) {
                bot.sendMessage(chatId, `Баланс ${currency}: ${balances[currency].available}`);
            } else {
                bot.sendMessage(chatId, 'Не известная пара');
            }
            if (error) return console.error(error);
        });
    } else {
        bot.sendMessage(chatId, `Я не знаю вас 🧐 / I dunno who ure `);
    }


});