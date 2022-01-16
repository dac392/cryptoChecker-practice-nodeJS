const https = require("https");
const url = "https://api.binance.com/api/v3/ticker/24hr";
const targets = ["BTCUSD", "ETHUSD"]


function get(){
    try{
        const response = https.get(url,onResponse);
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
            const currencies = [];
            for(let i = 0; i < crypto.length; i++){
                for(let j = 0; j < targets.length; j++){
                    if(crypto[i].symbol.includes(targets[j])){
                        currencies.push(crypto[i]);
                    }
                }
                if(currencies.length === targets.length) break;
            }
            printCryptoValues(currencies);
            
        })
        obj.on("error", error=>console.error(`Problem with request: ${error.message}`));
    }else{
        const e = new Error(`there was an error: (${http.STATUS_CODES[obj.statusCode]})`);
        printErrorMessage(e);
    }
}

function printCryptoValues(currencies){
    currencies.forEach(coin => {
        console.log(`${coin.symbol}: ${coin.openPrice}`)
    });
}

module.exports.get = get;