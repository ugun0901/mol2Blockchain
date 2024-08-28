const express = require('express');
const router = express.Router();

var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

// My util
var goto = require('../util/goto');

// /root router
router
    .get("/", (req, res) => {  
        const conn = db_connect.getConnection();
        conn.query(db_sql.idol_select, function (e, result, fields) {
            try {
                if (e) {
                    console.log('Select Error');
                    throw e;
                } else {
                    console.log(result);
                    goto.go(req, res, { 'centerpage': 'vote1/center', 'vote1': result });
                }
            } catch (e) {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        });
    })

    // 투표 처리
    .post('/voteimpl', (req, res) => {
        const idolId = req.body.id;
        const conn = db_connect.getConnection();
        
        // idol_update SQL 구문에 idolId를 바인딩
        conn.query(db_sql.idol_update, [idolId], function (e, result, fields) {
            try {
                if (e) { // 예외 발생 시
                    console.log('Update Error !');
                    throw e;
                } else {
                    console.log('Update OK !');
                    res.redirect('/vote1'); // 투표 후 메인 페이지로 리다이렉트
                }
            } catch (e) {
                console.log(e); // 예외 처리
            } finally {
                db_connect.close(conn);
            }
        });
    });

module.exports = router;
