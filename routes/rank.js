const express = require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

// Database 연동
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

var goto = require('../util/goto');

router
.get("/",(req,res)=>{  
    conn = db_connect.getConnection();
    conn.query(db_sql.idol_select, function (e, result, fields) {
        try{
            if(e){
                console.log('Select Error');
                throw e;
            }else{
                console.log(result);
                goto.go(req,res,{'centerpage':'rank', 'ranks':ranks});
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
module.exports = router;
