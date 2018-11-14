const Koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const app = new Koa();

const config = require('./../config');
const {router} = require('./routers');

// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'sess',
  store: new MysqlStore(sessionMysqlConfig),
}))

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 配置ctx.body解析中间件
app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000)