const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

var goto = require('../util/goto');

// /root router
router
    .get("/",(req,res)=>{  
        goto.go(req,res,{'centerpage':'html/center'});
       
    })
    .get("/html1",(req,res)=>{  
        goto.go(req,res,{'centerpage':'html/html1'});
       
    })
    .get("/html2",(req,res)=>{  
        goto.go(req,res,{'centerpage':'html/html2'});
       
    })
    .get("/html3",(req,res)=>{  
        goto.go(req,res,{'centerpage':'html/html3'});
       
    })
   
module.exports = router;