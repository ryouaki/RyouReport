// 加载系统模块
const path = require('path');

// 加载配置模块
const pkg = require(path.resolve(__dirname, '../package.json'));

const {
  NODE_PORT = 3000,
  APPNAME = 'RESTFUL',
  APPID = '/',
  REDIS_HOST = '192.168.22.53',
  REDIS_PORT = 6379,
  MYSQL_HOST = '172.17.134.3',
  MYSQL_PORT = 3306,
  MYSQL_USER = 'root',
  MYSQL_PASSWORD = '1qazXSW2!@#$',
  SESSION_SECRET = 'RESTFUL',
  TTL = 24 * 60 * 60 * 1000 * 7,
  DOMAIN = 'localhost',
  BODY_LIMIT = 1000,
  UPLOAD_PATH = 'uploads/',
  SESSION_TYPE = 'mysql'
} = process.env;

let host = `redis://${REDIS_HOST}:${REDIS_PORT}`;

if (SESSION_TYPE === 'mysql') {
  host = {
    createDatabaseTable: false,
    connectionLimit : 1,
    host            : MYSQL_HOST,
    port            : MYSQL_PORT,
    user            : MYSQL_USER,
    password        : MYSQL_PASSWORD,
    database        : 'elens_session'
  }
}

module.exports = {
  name: pkg.name,
  port: NODE_PORT,
  appid: APPID,
  bodylimit: `${BODY_LIMIT}mb`,
  uploadPath: UPLOAD_PATH,
  session: {
    host: host,
    secret: SESSION_SECRET,
    ttl: TTL,
    domain: DOMAIN
  }
}