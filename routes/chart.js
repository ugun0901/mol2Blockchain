const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

// My util
var goto = require('../util/goto');

// /root router
router
    .get("/",(req,res)=>{  
        goto.go(req,res,{'centerpage':'chart/center'});
       
    })
    .get("/chart1",(req,res)=>{  
        goto.go(req,res,{'centerpage':'chart/chart1'});
       
    })
    .get("/chart2",(req,res)=>{  
        goto.go(req,res,{'centerpage':'chart/chart2'});
       
    })
    .get("/chart3",(req,res)=>{  
        goto.go(req,res,{'centerpage':'chart/chart3'});
       
    })
   
module.exports = router;