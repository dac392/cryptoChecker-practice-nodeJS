const https = require("https");
const http = require("http");
const api = require("./api.json");
// const binance_url = "https://api.binance.com/api/v3/ticker/24hr";

function get(request){
    const from = request[0];
    const to = request[1];
    try{
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
        obj.on("error", error=>console.error(`Problem with request: ${error.message}`));
    }else{
        const e = new Error(`there was an error: (${http.STATUS_CODES[obj.statusCode]})`);
        console.error(e.message);
    }
}

function printExchangeRate(crypto){
    console.log(`${crypto.asset_id_base} to ${crypto.asset_id_quote}: $${crypto.rate}`)
}

module.exports.get = get;