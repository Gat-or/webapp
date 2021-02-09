const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "team06db.crpsera9bqne.us-west-1.rds.amazonaws.com",
    user: "team06",
    password: "team06team06",
    database: "gatordb",
    connectionLimit: 50,
    
    debug:false,
});

const promisePool = pool.promise();
module.exports = promisePool;