const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 
// My util
var goto = require('../util/goto');//로그인을 했을때와 안했을때를 내부적으로 검증(로그인 처리와는 다름)

// Database 연동
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');



// /html이렇게 실행하면 router가 동작
//127.0.0.1/html
router//라우터 등록.
    .get("/",(req,res)=>{  
       goto.go(req,res,{'centerpage':'vote/center'});//html 폴더 밑에 center가 있어야됨
        
    });




router//라우터 등록.
.get("/vote",(req,res)=>{  
    let id = req.query.id;
        conn = db_connect.getConnection();
        conn.query(db_sql.cust_select_one, id, (err, result, fields) => {
            try{
                if(err){
                    console.log('Select Error');
                    throw err;
                }else{
                    console.log(result);
                    custinfo = result[0];
                    console.log(custinfo);
                    goto.go(req,res,{'centerpage':'vote/vote1','custinfo':custinfo});
                }
            }catch(e){
                console.log(e);
            }finally{
                db_connect.close(conn);
            }
        });
        
});



    

module.exports = router;