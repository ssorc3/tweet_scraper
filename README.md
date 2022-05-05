# Tweet downloader
This script downloads tweets specified by the parameters in the `config.ts` file.

## Config
The config is in the file `config.ts`.
The `start_time` and `end_time` parameter should be in the form "2000-01-01T00:00:00Z" for midnight UTC on Jan 1st 2000.
The query parameter should be in twitter's format. Documentation can be found here: [https://developer.twitter.com/apitools/query](https://developer.twitter.com/apitools/query).

## Running the script
### Requirements
The script requires the following tools to be installed:
- nodejs

### Running
An API key with academic access is required to use the script. It should be provided as an environment variable.
To run the script, use this command:
```shell
> BEARER_TOKEN=<your bearer token> ./run.sh
```
