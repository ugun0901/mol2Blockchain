

//web application을 개발하기 위한
// Library 선언 5~10
require('dotenv').config(); //
const express=require('express');
const nunjucks = require('nunjucks'); //
const bodyParser = require('body-parser')   //body parser 추가 1
const app = express(); //express라는 객체 생성
const port = process.env.SERVER_PORT || 3000; //.env안에 있는 server port 정보를 가져와라 default는 3000번

// web application 개발을 위한 디렉토리 설정
nunjucks.configure('views',{ 
    express:app,
});//views라는 폴더를 가지고 html을 쓴다.

app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false})); //객체 들어감. 추가 2 
app.use(express.static('public')); //public이라는 폴더에는 js,css같은 html이 아닌게 들어간다.

//127.0.0.1
app.get('/', (req,res)=>{ //'/(루트)'라고 요청하면 index.html을 서버에서 만들어서 화면에 전송
    res.render('index');//상대방이 내컴퓨터로 들어오면 '/'여기로 들어옴->index.html을 만들어서 브라우저로 이동함.-> 보여짐
});


app.listen(port,()=>{ //start를하면 얘가 최초실행(서버 띄우는 모델)
    console.log(`server start port:${port}`)
});
//클릭을 하면 서버에 data요청