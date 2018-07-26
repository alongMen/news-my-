// 1. 导包express
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');

// 2. 实例化app
const app = express();

// 配置包
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