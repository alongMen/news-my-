// 1. 导包express
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'newssql'
};
var sessionStore = new MySQLStore(options);


// 2. 实例化app
const app = express();

// 配置包
// 配置express-mysql-session包
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// 模板引擎
app.engine('html', require('express-art-template'));
// 统一处理静态资源
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));


// 3. 挂载路由
// 注意: 写在绑定端口的前面
app.use(router);






// 4. 绑定端口
app.listen(12345, () => {
    console.log('run it at 12345');

});