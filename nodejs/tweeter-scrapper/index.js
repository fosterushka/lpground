const { TwitterScraper } = require("@tcortega/twitter-scraper");

// Tweet Metadata by tweet url.
(async () => {
  try {
    const twtScraper = await TwitterScraper.create();
    const tweetMeta = await twtScraper.getTweetMeta("https://twitter.com/Di_animals/status/1467925779388538881/retweets");
    console.log(tweetMeta.retweets);
  } catch (error) {
    console.log(error);
  }
})();