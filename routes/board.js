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
        goto.go(req,res,{'centerpage':'board/center'});
       
    })
    .get("/new",(req,res)=>{  
        goto.go(req,res,{'centerpage':'board/new'});
       
    })
   
module.exports = router;