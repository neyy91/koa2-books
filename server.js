var koa = require('koa');

var bodyParser = require('koa-bodyparser');
const routers = require('./routes/index');
var app = new koa();

app.use(bodyParser());
app.use(routers.routes());

app.listen(8008);
console.log('Koa listening on port 8008');

