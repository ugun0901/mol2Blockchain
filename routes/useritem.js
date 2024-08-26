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
    // .get("/",(req,res)=>{  
    //     goto.go(req,res,{'centerpage':'useritem/center'});
       
    // })
    .get("/",(req,res)=>{  
        conn = db_connect.getConnection();
        conn.query(db_sql.item_select, function (e, result, fields) {
            try{
                if(e){
                    console.log('Select Error');
                    throw e;
                }else{
                    console.log(result);
                    goto.go(req,res,{'centerpage':'useritem/select', 'items':result});
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

    
    // .get("/cartadmin",(req,res)=>{  
    //     conn = db_connect.getConnection();
    //     conn.query(db_sql.cart_select, function (e, result, fields) {
    //         try{
    //             if(e){
    //                 console.log('Select Error');
    //                 throw e;
    //             }else{
    //                 console.log(result);
    //                 goto.go(req,res,{'centerpage':'useritem/cart', 'carts':result});
    //             }
                
    //         }
    //         catch(e){
                
    //             console.log(e)
    //         }
    //         finally{
    //             db_connect.close(conn);
    //         }
    //     });
    // })

    .get("/cart",(req,res)=>{  
        let userid = req.query.userid;
        let loginid = req.query.loginid;
        conn = db_connect.getConnection();

        if (userid == 'admin') {
            // admin일 때 모든 데이터 조회
            query = db_sql.cart_select;
        } else {
            // 일반 사용자일 때 사용자별 데이터 조회
            query = db_sql.cart_select_one;
        }

        conn.query(query, userid, function (e, result, fields) {
            try{
                if(e){
                    console.log('Select Error');
                    throw e;
                }else{
                    console.log(result);
                    goto.go(req,res,{'centerpage':'useritem/cart', 'carts':result});
                }
                
            }
            catch(e){
                
                console.log(e)
            }
            finally{
                db_connect.close(conn);
            }
        });
    })

    .post("/addcart",(req,res)=>{ 
        let count = req.body.count;
        let userid = req.body.userid;
        let itemid = req.body.itemid;
        
        
//1. 상품 조회
//2. cart에 모든 정보 입력
        conn = db_connect.getConnection();  
        conn.query(db_sql.item_select_one, itemid, function (e, result, fields) {
            try{
                if(e){
                    console.log('Select Error');
                    throw e;
                }else{
                    console.log(result[0].name);
                    console.log(result[0].price);
                    console.log(result[0].price*count);
                    let values = [userid, itemid, result[0].name, result[0].price, count, result[0].price*count];


                    conn.query(db_sql.cart_insert, values, function (e, result, fields) {
                        try{
                            if(e){
                                console.log('Insert Error');
                                throw e;
                            }else{
                                console.log('Insert OK');
                                res.redirect('/useritem/cart?userid='+userid);
                            }
                            
                        }
                        catch(e){
                            
                            throw e;
                        }
                    });

                }
                
            }
            catch(e){
                
                console.log(e)
            }
            finally{
                db_connect.close(conn);
            }
        });
       
    })

    .post("/deletecart",(req,res)=>{ 
        let count = req.body.count;
        let userid = req.body.userid;
        let itemid = req.body.itemid;
        
        conn = db_connect.getConnection();  
        conn.query(db_sql.item_select_one, itemid, function (e, result, fields) {
            try{
                if(e){
                    console.log('Select Error');
                    throw e;
                }else{
                    console.log(result[0].name);
                    console.log(result[0].price);
                    console.log(result[0].price*count);
                    let values = [userid, itemid, result[0].name, result[0].price, count, result[0].price*count];


                    conn.query(db_sql.cart_delete, userid, function (e, result, fields) {
                        try{
                            if(e){
                                console.log('Delete Error');
                                throw e;
                            }else{
                                console.log('Delete OK');
                                res.redirect('/useritem/cart?userid='+userid);
                            }
                            
                        }
                        catch(e){
                            
                            throw e;
                        }
                    });

                }
                
            }
            catch(e){
                
                console.log(e)
            }
            finally{
                db_connect.close(conn);
            }
        });
       
    })

    .get("/detail",(req,res)=>{ 
        let id = req.query.id;
        console.log(id);
        conn = db_connect.getConnection();
            conn.query(db_sql.item_select_one, id, function (e, result, fields) {
                try{
                    if(e){
                        console.log('Select Error');
                        throw e;
                    }else{
                        console.log(result);
                        goto.go(req,res,{'centerpage':'useritem/detail', 'item':result[0]});
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