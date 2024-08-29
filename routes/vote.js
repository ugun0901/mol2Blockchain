const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

// Database 연동
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');


var goto = require('../util/goto');

router.get("/", async (req, res) => {
    const conn = db_connect.getConnection();
    
    try {
        let id = req.query.id;

        // 첫 번째 쿼리와 두 번째 쿼리를 Promise로 처리
        const idolSelectPromise = new Promise((resolve, reject) => {
            conn.query(db_sql.idol_select, (e, voteResult) => {
                if (e) {
                    console.log('Select Error in idol_select');
                    reject(e);
                } else {
                    console.log(voteResult);
                    resolve(voteResult);
                }
            });
        });

        const custSelectPromise = new Promise((resolve, reject) => {
            conn.query(db_sql.cust_select_one, [id], (err, custResult) => {
                if (err) {
                    console.log('Select Error in cust_select_one');
                    reject(err);
                } else {
                    console.log(custResult);
                    resolve(custResult[0]);
                }
            });
        });

        // Promise.all을 사용하여 두 쿼리를 병렬로 실행
        const [voteResult, custinfo] = await Promise.all([idolSelectPromise, custSelectPromise]);

        // 쿼리 결과를 합쳐서 페이지로 전달
        goto.go(req, res, { 
            'centerpage': 'vote/center', 
            'vote3': voteResult, 
            'custinfo': custinfo 
        });

    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    } finally {
        db_connect.close(conn);
    }
});




// router
// .get("/", (req, res) => {  
//     const conn = db_connect.getConnection();
//     conn.query(db_sql.idol_select, function (e, result, fields) {
//         try {
//             if (e) {
//                 console.log('Select Error');
//                 throw e;
//             } else {
//                 console.log(result);
//                 goto.go(req, res, { 'centerpage': 'vote/center', 'vote3': result });
                
//             }
//         } catch (e) {
//             console.log(e);
//         } finally {
//             db_connect.close(conn);
//         }
//     });
    

// })

// // /root router
// router

//     .get("/",(req,res)=>{   
//         let id = req.query.id;
//         conn = db_connect.getConnection();
//         conn.query(db_sql.cust_select_one, [id], (err, result, fields) => {
//             try{
//                 if(err){
//                     console.log('Select Error');
//                     throw err;
//                 }else{
//                     console.log(result);
//                     custinfo = result[0];
//                     console.log(custinfo);
//                     goto.go(req,res,{'centerpage':'vote/center','custinfo':custinfo});
//                 }
//             }catch(e){
//                 console.log(e);
//             }finally{
//                 db_connect.close(conn);
//             }
//         });
//     })
router

        // 투표 처리 누르면 +1되게끔
        .post('/voteimpll', (req, res) => {
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
                       res.redirect('/vote'); // 투표 후 메인 페이지로 리다이렉트
                }
            } catch (e) {
                console.log(e); // 예외 처리
            } finally {
                  db_connect.close(conn);
               }
          });
       });

  
    
 
   
module.exports = router;