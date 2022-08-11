## Getting started

This projects aims to give an overview of how to retrieve blockchain's data using Alchemy's APIs. Other options would be to use Infura or web scrap blockchains scanners
sites like etherscan.

This project uses Ethereum but other blockains are available. 

## Prerequisites

An Alchemy account is required (https://www.alchemy.com/), the free tiers is enough for this project. You will find your API key in your dashboard.

Node.js needs to be installed, follow intructions there https://nodejs.org/. This will also install NPM.

Alchemy SDK needs to be installed, run in commmand line:

> npm install alchemy-sdk

Replace the API KEY in the alchemy.js script by your own key. 

Update the file package.json (installed with the SDK) to add the line (allows to use the import statement, outside a module):

> "type": "module",


## APIs

The script plays around with different APIs:
- Latest Ethereum block number
- The current gwei price for gas fees
- Token metadata
- Transfers event on the blockchain
- NFT owner 
- Get all the token balances for one address

You can monitor the requests, response and throughput on the Alchemy dashboard. This comes in handy if a request fails.

You can also compare the data retrieved to the etherscan directly or site like debank.

## Final notes

The starting point of this investigation was to understand how companies providing on chain analytics were capturing the blockchain's data.

Alchemy is one answer, Infura another one. We could draft a solution from our usage of APIs: 
- stream all transfer events into a database
- recalculate token balances when necessary
- perform more analytics(top 10 holders, dail change etc)

One frequent use case for these analytics company is to follow the smart money/big whales, the APIs available are a start to monitor this flows.



