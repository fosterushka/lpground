const { TwitterApi } = require('twitter-api-v2');

// Instanciate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi('');

console.log(twitterClient);