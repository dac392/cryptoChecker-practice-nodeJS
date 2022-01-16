const crypto = require("./crypto.js");

// ---------------------main--------------------------
const request = process.argv.slice(2);
if(request.length!==2){
    const err = new Error("Please provide a crypto currency and a currency to exchange it to.")
    console.error(err.message);
}else{
    crypto.get(request)
}


