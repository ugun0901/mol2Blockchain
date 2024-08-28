const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');


// My util
var goto = require('../util/goto');

// /root router
router
    .get("/",(req,res)=>{  
        conn = db_connect.getConnection();
        conn.query(db_sql.board_select, function (e, result, fields) {
            try{
                if(e){
                    console.log('Select Error');
                    throw e;
                }else{
                    console.log(result);
                    goto.go(req,res,{'centerpage':'board/center', 'boards':result});
                }
            }
            catch(e){
                console.log(e);
            }
            finally{
                db_connect.close(conn);
            }
            
        });
       
    })
    .get("/new",(req,res)=>{  
        goto.go(req,res,{'centerpage':'board/new'});
       
    })
   
module.exports = router;