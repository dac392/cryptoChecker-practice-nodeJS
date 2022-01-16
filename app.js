const crypto = require("./crypto.js");

// ---------------------main--------------------------
const request = process.argv.slice(2).join('-');
crypto.get(request);



