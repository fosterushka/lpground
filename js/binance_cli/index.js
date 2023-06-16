#!/usr/bin/env node
import binance_api from 'node-binance-api'
import * as dotenv from 'dotenv'

const binance = new binance_api().options({
    APIKEY: dotenv.config().parsed.BINANCE_API_KEY,
    APISECRET: dotenv.config().parsed.BINANCE_SECRET_KEY,
    useServerTime: true,
    adjustForTimeDifference: true
});

await binance.useServerTime();
binance.balance((error, balances) => {
    asdasdasdsa
    if ( error ) return console.error(error);
    Object.keys(balances).forEach(key => {
        const value = balances[key]
        if (parseFloat(value.available)) {
            console.log(key, '=>', value.available)
        }
    })
});