const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'rodindatabase.czzy7rn53jga.ap-northeast-2.rds.amazonaws.com',
    user: 'hyuk2449',
    port: '3306',
    password: 'choi2449!',
    database: 'rodinAirbnb'
});

module.exports = {
    pool: pool
};