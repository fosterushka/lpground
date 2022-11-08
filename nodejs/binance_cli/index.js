#!/usr/bin/env node
import binance_api from 'node-binance-api'
import * as dotenv from 'dotenv'

const binance = new binance_api().options({
    APIKEY: dotenv.config().BINANCE_API_KEY,
    APISECRET: dotenv.config().BINANCE_SECRET_KEY,
    useServerTime: true,
    adjustForTimeDifference: true
});

binance.balance((error, balances) => {
    if ( error ) return console.error(error);
    console.info("balances()", balances);
    console.info("ETH balance: ", balances.ETH.available);
  });