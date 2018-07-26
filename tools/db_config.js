// 处理mysql包
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'newssql'
});
// connection.connect();//可以不写

module.exports = connection;