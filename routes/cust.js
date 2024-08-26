const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

var goto = require('../util/goto');

// /root router
router
    .get("/",(req,res)=>{  
        goto.go(req,res,{'centerpage':'cust/center'});
       
    })
    .get("/cust1",(req,res)=>{  
        conn = db_connect.getConnection();
            conn.query(db_sql.cust_select, function (e, result, fields) {
                try{
                    if(e){
                        console.log('Select Error');
                        throw e;
                    }else{
                        console.log(result);
                        goto.go(req,res,{'centerpage':'cust/cust1', 'custs':result});
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
    .get("/cust2",(req,res)=>{  
        goto.go(req,res,{'centerpage':'cust/cust2'});
       
    })
    .get("/cust3",(req,res)=>{  
        goto.go(req,res,{'centerpage':'cust/cust3'});
       
    })
    .get("/detail",(req,res)=>{ 
        let id = req.query.id;
        console.log(id);
        conn = db_connect.getConnection();
            conn.query(db_sql.cust_select_one, id, function (e, result, fields) {
                try{
                    if(e){
                        console.log('Select Error');
                        throw e;
                    }else{
                        console.log(result);
                        goto.go(req,res,{'centerpage':'cust/detail', 'cust':result[0]});
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
    .post("/updateimpl",(req,res)=>{
        let id = req.body.id;
        let pwd = req.body.pwd;
        let name = req.body.name;
        let acc = req.body.acc;
        let values = [pwd,name,acc,id];
        
        console.log(pwd,name,acc,id);
        conn = db_connect.getConnection();
            conn.query(db_sql.cust_update, values,function(e, result, fields) {
                try{
                    if(e){
                        console.log('Select Error');
                        throw e;
                    }else{
                        console.log(result);
                        res.redirect('/cust/detail?id='+id);
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

    .get("/deleteimpl",(req,res)=>{
        let id = req.query.id;
        conn = db_connect.getConnection();
            conn.query(db_sql.cust_delete, id,function(e, result, fields) {
                try{
                    if(e){
                        console.log('Delete Error');
                        throw e;
                    }else{
                       res.redirect('/cust/cust1');
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