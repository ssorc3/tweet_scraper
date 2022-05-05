import { Client } from 'twitter-api-sdk'
import { createObjectCsvWriter } from 'csv-writer';
import config from './config'

const twitterClient = new Client(process.env.BEARER_TOKEN);
const maxTweets = null;

const csvWriter = createObjectCsvWriter({
    path: "out.csv",
    header: [
        {id: "text", title: "Text"},
        {id: "retweet_count", title: "Retweets"},
        {id: "username", title: "Author Username"},
        {id: "reply_to", title: "Reply to"},
    ]
})

const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

function mapTweet(tweet: any, users: Map<string, string>, referenced_tweets: Map<string, string>): any {
    const replys = tweet.referenced_tweets?.filter((t: any) => t.type = 'reply_to')
    return {
        text: tweet.text,
        retweet_count: tweet.public_metrics.retweet_count,
        username: users.get(tweet.author_id),
        reply_to: replys && replys[0] ? referenced_tweets.get(replys[0].id) : null
    }
}

async function getTweets(): Promise<{tweets: any[], users: Map<string, string>, referenced_tweets: Map<string, string>}> {
        // Just collect tweets don't map them
        let tweets = [];
        let newTweets = null;
        let paginationToken = null;
        let users: Map<string, string> = new Map<string, string>();
        let referenced_tweets: Map<string, string> = new Map<string, string>();
        let i = 0;
        do {
            newTweets = await twitterClient.tweets.tweetsFullarchiveSearch({
                query: config.query,
                start_time: config.start_time,
                end_time: config.end_time,
                pagination_token: paginationToken,
                "tweet.fields": ["public_metrics", 'referenced_tweets'],
                "user.fields": ["username"],
                expansions: ["author_id", "referenced_tweets.id"],
                max_results: 100
            });

            paginationToken = newTweets.meta.next_token;
            const us = newTweets.includes.users;
            for(const u in us) {
                users.set(us[u].id, us[u].username);
            }
            const rts = newTweets.includes.tweets;
            for(const rt in rts) {
                referenced_tweets.set(rts[rt].id, rts[rt].text);
            }
            tweets.push(...newTweets.data);
            await timer(1000);
            console.log("done %d iterations", ++i);
        } while (paginationToken && (!maxTweets || tweets.length < maxTweets));

        return {tweets, users, referenced_tweets}
}

async function run() {
    const tweets = await getTweets();
    const mappedTweets = tweets.tweets.map((tweet: any) => mapTweet(tweet, tweets.users, tweets.referenced_tweets));
    csvWriter.writeRecords(mappedTweets);
    console.log("Finished")
}

run();
