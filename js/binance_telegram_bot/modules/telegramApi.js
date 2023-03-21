require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const telegram_token = process.config.TELEGRAM_API_KEY;
const bot = new TelegramBot(telegram_token, { polling: true });


export default bot;