//模型：专门处理c-user.js中的数据模型

var mysql = require('mysql');
var connection = mysql.creatConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'newssql'
});

connection.connect();

exports.showSignin = (req, res) => {
	res.render('signin.html');
};

exports.handleSignin = (req, res) => {
	const body = req.body;
	const sqlstr = 'SELECT * FROM `users` WHERE `email`=?';

	connection.query(sqlstr,body.email,(err, results) => {
		if(err) {
			return res.send({
				code:500,
				message:message
			});
		}
		if(!results[0]) {
			return res.send({
				code:1,
				message:err.message
			})
		}
		if(results[0].password !== body.password) {
			return res.send({
				code:2,
				message:'密码不正确'
			});
		}
		res.send({
			code:200,
			message:'可以登录跳转'
		})
	})
}
