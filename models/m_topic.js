//处理话题数据库文件

// 导入数据库配置模块
const connection = require('../tools/db_config');

//查询topics中的数据
exports.findAllTopics = (callback) => {

	const sqlstr = 'SELECT * FROM `topics` ORDER BY `createdAt` DESC';
	connection.query(sqlstr,(err,results) => {
		if(err) {
			return callback(err);
		}
		callback(null,results);
	})
}

exports.insertTopic = (body,callback) => {
	const sqlstr = 'INSERT INTO `topics` SET ?';
	connection.query(sqlstr,body,(err,results) => {
		if(err) {
			return callback(err);
		}
		callback(null,results);
	})
}

exports.findTopicById = (id,callback) => {
	const sqlstr = 'SELECT * FROM `topics` WHERE `id`=?';
	connection.query(sqlstr,id,(err,results) => {
		if(err) {
			return callback(err);
		}
		callback(null,results);
	})
}

exports.deleteTopic = (id,callback) => {
	const sqlstr = 'DELETE FROM `topics` WHERE id=?';
	connection.query(sqlstr,id,(err,results) => {
		if(err) {
			return callback(err);
		}
		callback(null,results);
	})
}

exports.updateTopicById = (id,body,callback) => {
	const sqlstr = 'UPDATE `topics` SET `title`=?,`content`=? WHERE `id`=?';

	connection.query(sqlstr,[
		body.title,
		body.content,
		id
		],(err, results) => {
		if(err) {
			return callback(err);
		}
		callback(null,results);
	})
}