//话题控制器

const M_topic = require('../models/m_topic');
//导入包moment
const moment = require('moment');

exports.showIndex = (req,res) => {

	M_topic.findAllTopics((err,results) => {
		if(err){
			return res.send({
				code:500,
				message:err.message
			})
		}

		res.render('index.html',{
			user:req.session.user,
			topics:results
		});
	})
}

//渲染发布新话题
exports.showCreateTopic = (req,res) => {


	// 渲染发布新话题topic/create.html
	res.render('topic/create.html');
}

exports.handleCreateTopic = (req,res) => {
	//最终目的向数据库中新增话题，然后跳转回列表页
	//获取表单数据
	const body = req.body;
	//给表单数据设置创建话题时间
	body.createdAt = moment().format();
	// console.log(body);
	// 给表单设置userId
	body.userId = req.session.user.id
	//模型操作数据库新增话题
	M_topic.insertTopic(body,(err, results) => {
		if(err) {
			return res.send({
				code:500,
				message:err.message
			})
		}
		res.send({
			code:200,
			message:'跳转到列表页'
		})
	})
	//客户端实现跳转，不用服务端重定向（只适用于同步请求），这里是因为异步请求
}

exports.showDetail = (req, res) => {
	//获取请求对象中放入动态参数router中的topicId
	//获取当前点击话题的ID
	const topicId = req.params.topicId;
	M_topic.findTopicById(topicId,(err, results) => {
		if(err) {
			return res.send({
				code:500,
				message:err.message
			})
		}
		res.render('topic/show.html',{
			sessionId:req.session.user.id,
			topic:results[0]
		})
	})
}

exports.deleteTopic = (req,res) => {
	//让模型根据topID删除话题
	const topicId = req.params.topicId;
	M_topic.deleteTopic(topicId,(err, results) => {
		if(err) {
			return res.send({
				code:500,
				message:err.message
			})
		}
		res.send({
			code:200,
			message:'删除成功'
		})
	})

}

// 渲染编辑页面
exports.showEdit = (req, res) => {


    // 1. 获取topicId
    const topicId = req.params.topicId;

    // 2. 让模型根据topicId找到话题
    M_topic.findTopicById(topicId, (err, results) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            });
        }
        // 3. 渲染edit.html并且绑定数据
        res.render('topic/edit.html', {
            topic: results[0]
        });
    });
}
//处理编辑表单请求
exports.handleEdit = (req,res) => {
	const topicId = req.params.topicId;
	const body = req.body;
	M_topic.updateTopicById(topicId,body,(err, results) => {
		if(err) {
			return res.send({
				code:500,
				message:err.message
			})
		}
		res.send({
			code:200,
			message:'修改成功'
		})
	})
}