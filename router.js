// 路由模块
// 处理路由分发 找到对应的处理函数
// 1. 导包express
// 2. 使用express.Router()返回的路由对象router
// 3. 配置路由router
// 4. 导出路由模块

const express = require('express');
const user = require('./controllers/c_user');


const router = express.Router();

// 渲染登录页面的请求
router.get('/signin', user.showSignin)
    // 处理登录表单的请求
    .post('/handleSignin', user.handleSignin);



module.exports = router;