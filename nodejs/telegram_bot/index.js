const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const telegram_token = process.config.TELEGRAM_API_KEY;

const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.config.BINANCE_API_KEY,
    APISECRET: process.config.BINANCE_SECRET_KEY,
    useServerTime: true,
    adjustForTimeDifference: true
});

const bot = new TelegramBot(telegram_token, { polling: true });

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