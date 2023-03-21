require('dotenv').config();
const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.config.BINANCE_API_KEY,
    APISECRET: process.config.BINANCE_SECRET_KEY,
    useServerTime: true,
    adjustForTimeDifference: true
});
