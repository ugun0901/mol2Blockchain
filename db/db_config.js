// 환경파일 안에 있는 코드들을 읽어온다
require('dotenv').config();

module.exports = (function() {
    return{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
    }
})();