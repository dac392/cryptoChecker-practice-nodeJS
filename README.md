# Crypto Price Checker - Practice - node.js

> quick way to check crypto prices

Fun project that I always saw everyone build and just wanted to try it out for myself after learning node.js. I hope to update it a little more to make it a little more useful in the near future. In its current state, it just gets the current price of a crypto currency without doing any other calculations.

## How to use

The program takes in a bitcoin currency and its current price in USD. The program normalizes the input and searches for a matching key in crypto-data.json, so that the program can fetch the data from the api.

The app takes in one arguments:

1. The crypto currency that you want to get the proce of.

```basch
    node app.js Ethereum Classic
```
