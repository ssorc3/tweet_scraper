# Tweet downloader
This script downloads tweets specified by the parameters in the `config.ts` file.

The tweets are output to `out.csv` with the columns:
- text - The text of the tweet
- retweet_count - the number of retweets the tweet got
- username - the user who wrote the tweet
- reply_to - the tweet that this tweet was a reply to

## Config
The config is in the file `config.ts`.
The `start_time` and `end_time` parameter should be in the form `"2000-02-01T00:00:00Z"` for midnight UTC on Feb 1st 2000.
The query parameter should be in twitter's format. Documentation can be found here: [https://developer.twitter.com/apitools/query](https://developer.twitter.com/apitools/query).

## Running the script
### Requirements
The script requires the following tools to be installed:
- nodejs

### Installing dependencies
Run this command to install dependencies:
```shell
> npm install
```

### Running
An API key with academic access is required to use the script. It should be provided as an environment variable.
To run the script, use this command:
```shell
> BEARER_TOKEN=<your bearer token> ./run.sh
```
