const https = require("https");
const http = require("http");
const api = require("./api.json");
const crypto_names = require("./crypto-data.json");
// const binance_url = "https://api.binance.com/api/v3/ticker/24hr";

function parseInput(arg){
    if(crypto_names[arg.toLowerCase()] === undefined){
        throw new Error(`Sorry, the key ${arg.toLowerCase()} was not accepted`);
    }
    return crypto_names[arg.toLowerCase()];
}

function get(request){

    try{
        const from = parseInput(request);
        const to = "USD";
        const response = https.get(`https://rest.coinapi.io/v1/exchangerate/${from}/${to}?apikey=${api.coinAPI}`,onResponse);
    }catch(e){
        console.error(e.message);
    }
    
}

function onResponse(obj){
    if(obj.statusCode === 200){
        let body = "";
        obj.on('data', data=> body+=data.toString());
        obj.on('end',()=>{
            const crypto = JSON.parse(body);
            printExchangeRate(crypto);
        })
        obj.on("error", error=>console.error(`Problem getting your request: ${error.message}`));
    }else{
        const e = new Error(`There was an error with your request: (${http.STATUS_CODES[obj.statusCode]})`);
        console.error(e.message);
    }
}

function printExchangeRate(crypto){
    if(Number(crypto.rate)>0.01){
        console.log(`${crypto.asset_id_base} to ${crypto.asset_id_quote}: $${Number(crypto.rate).toFixed(2)}`);
    }else if((crypto.rate)>0.00001){
        console.log(`${crypto.asset_id_base} to ${crypto.asset_id_quote}: $${Number(crypto.rate).toFixed(5)}`);
    }else{
        console.log(`${crypto.asset_id_base} to ${crypto.asset_id_quote}: $${Number(crypto.rate)}`);
    }
    
}

module.exports.get = get;