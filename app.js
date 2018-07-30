// 1. 导包express
const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');

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
// console.log(app);


//请求日志打印--第三方中间件
app.use(morgan('tiny'));

// 配置包
// 配置express-mysql-session包
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

//用session,配置完
//公共成员app.locals，注意next(),让后面的中间件执行
app.use((req,res,next) => {
	app.locals.sessionUser = req.session.user;	
	next();
})

// 模板引擎
app.engine('html', require('express-art-template'));
// 统一处理静态资源
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));


// 3. 挂载路由==>控制器处理错误
// 注意: 写在绑定端口的前面
app.use(router);

//返回友好的404，在路由中不存在的请求都会渲染到404.html页面
app.use((req,res,next) => {
	res.render('404.html');
})

//错误处理中间件
app.use((err,req,res,next) => {
	res.send({
		code:500,
		message:err.message
	})
})



// 4. 绑定端口
app.listen(12345, () => {
    console.log('run it at 12345');

});