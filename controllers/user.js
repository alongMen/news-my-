// 专门实现用户相关功能的控制器


// 处理mysql包
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'newssql'
});
connection.connect();

// 渲染用户登录页的方法
exports.showSignin = (req, res) => {
    res.render('signin.html');
};

// 处理登录的表单请求
exports.handleSignin = (req, res) => {
    // 1 获取表单数据(post)
    const body = req.body;
    // console.log(body);
    // 2 校验表单数据(去数据库中校验)

    // 2.1 先校验邮箱
    const sqlstr = 'SELECT *FROM `users` WHERE `email`=?';
    connection.query(sqlstr, body.email, (err, results) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            });
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

        // 如果密码正确,告诉客户端可以跳转了
        // 3 发送响应到客户端 告诉客户端可以登录了!
        res.send({
            code: 200,
            message: '可以登录了,请跳转到话题列表'
        });
    });
};