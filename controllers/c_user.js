// 专门实现用户相关功能的控制器

const M_user = require('../models/m_user');

// 渲染用户登录页的方法
exports.showSignin = (req, res,next) => {
    res.render('signin.html');
};

// 处理登录的表单请求
exports.handleSignin = (req, res,next) => {
    // 1 获取表单数据(post)
    const body = req.body;
    // console.log(body);
    // 2 校验表单数据(去数据库中校验)

    // 让模型去检查邮箱，把数据库操作结果返回
    M_user.checkEmail(body.email,(err,results) => {
        if (err) {
            return next(err);
        }

        // console.log(results);
        // 如果result为[] 证明邮箱不存在
        if (!results[0]) {
            return res.send({
                code: 1,
                message: '邮箱不存在 你 改改!'
            });
        }


        // console.log('邮箱存在');
        // 如果邮箱没问题, 再校验密码
        // 如果密码不正确
        if (results[0].password !== body.password) {
            return res.send({
                code: 2,
                message: '密码不正确'
            });
        }

        // 如果密码正确,将邮箱昵称保存到session中,将来在话题页使用
        // session不是持久存储，重启服务器需要重新登录,
        // 这就需要把数据保存在数据库中，使用包express-mysql-session
        req.session.user = results[0];
        // console.log(req.session);
        // 3 发送响应到客户端 告诉客户端可以登录了!
        res.send({
            code: 200,
            message: '可以登录了,请跳转到话题列表'
        });
    })
};

exports.handleSignout = (req,res,next) => {
    delete req.session.user;
    res.redirect('/signin');//用户退出
}

//处理渲染注册页面
exports.showSignup = (req,res,next) => {

    res.render('signup.html');
}

//处理注册表单
exports.handleSignup = (req,res,next) => {
    //获取表单数据
    const body = req.body;
    M_user.checkEmail(body.email,(err,results) => {
        if (err) {
            return next(err);
        }

        // 如果result为[] 证明邮箱不存在
        if (results[0]) {
            return res.send({
                code: 1,
                message: '邮箱已存在!'
            });
        }

        //新邮箱则验证昵称nickname
        M_user.checkNickname(body.nickname,(err,results) => {
            if (err) {
                return res.send({
                    code: 500,
                    message: err.message
                });
            }

            if (results[0]) {
                return res.send({
                    code: 1,
                    message: '昵称已存在!'
                });
            }

            M_user.insertUser(body,(err,results) => {
               if (err) {
                    return res.send({
                        code: 500,
                        message: err.message
                    });
                } 
                //发送响应
                res.send({
                    code:200,
                    message:'跳转到登录页'
                })
            })
        })
    })
}