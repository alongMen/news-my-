//模型：专门处理c_user.js中的数据模型

// 导入数据库配置模块
const connection = require('../tools/db_config');

function checkEmail(email,callback){
	const sqlstr = 'SELECT *FROM `users` WHERE `email`=?';
    connection.query(sqlstr,email, (err, results) => {
    	if(err){
    		return callback(err);//异步用回调函数处理
    	}
    	callback(null,results);
    });
}

exports.checkNickname = (nickname,callback) => {
	const sqlstr = 'SELECT *FROM `users` WHERE `nickname`=?';
    connection.query(sqlstr,nickname, (err, results) => {
    	if(err){
    		return callback(err);//异步用回调函数处理
    	}
    	callback(null,results);
    });
}

// 添加新数据
exports.insertUser = (body,callback) => {
	const sqlstr = 'INSERT INTO `users` SET ?';
    connection.query(sqlstr,body, (err, results) => {
    	if(err){
    		return callback(err);//异步用回调函数处理
    	}
    	callback(null,results);
    });
}

exports.checkEmail = checkEmail;