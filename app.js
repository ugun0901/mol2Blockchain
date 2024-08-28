

//web application을 개발하기 위한
// Library 선언 5~10
require('dotenv').config(); //
const express=require('express');
const nunjucks = require('nunjucks'); //
const bodyParser = require('body-parser')   //body parser 추가 1
const app = express(); //express라는 객체 생성
const port = process.env.SERVER_PORT || 3000; //.env안에 있는 server port 정보를 가져와라 default는 3000번

// 로그인 처리를 위한 라이브러리
const session = require('express-session');
// session 저장소 지정(메모리)
const MemoryStore = require("memorystore")(session);
// Passport lib 
const passport = require("passport"),
LocalStrategy = require("passport-local").Strategy;

// My util
var goto = require('./util/goto');

//MySQL DB Connection
var db_connect = require('./db/db_connect');
var db_sql = require('./db/db_sql');

//cors지정
const cors = require("cors");
app.use(cors());


// web application 개발을 위한 디렉토리 설정
nunjucks.configure('views',{ 
    express:app,
});//views라는 폴더를 가지고 html을 쓴다.


app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false})); //객체 들어감. 추가 2 
app.use(express.static('public')); //public이라는 폴더에는 js,css같은 html이 아닌게 들어간다.

//------------------------------------------------------------------------------------------------------------------------------------
// 파일 업로드

//------------------------------------------------------------------------------------------------------------------------------------
//login 처리

// Session 선언
app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,
    
        store: new MemoryStore({
            checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
        })
    })
);

// 2. Passport를 이용한 로그인 처리 ---------------------------------------------------------------------------------------

// passport 초기화 및 session 연결
app.use(passport.initialize());
app.use(passport.session());

// login이 최초로 성공했을 때만 호출되는 함수
// done(null, user.id)로 세션을 초기화 한다.
passport.serializeUser(function (req, user, done) {
    console.log('serializeUser'+user);
    console.log('serializeUser'+user.id);
    console.log('serializeUser'+user.name);
    console.log('serializeUser'+user.acc);

    done(null, user);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
// done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser(function (req, user, done) {
    console.log('Login User'+user.name+' '+user.id);
    done(null, user);
});

// local login 전략을 세우는 함수
// client에서 전송되는 변수의 이름이 각각 id, pw이므로 
// usernameField, passwordField에서 해당 변수의 값을 받음
// 이후부터는 username, password에 각각 전송받은 값이 전달됨
// 위에서 만든 login 함수로 id, pw가 유효한지 검출
// 여기서 로그인에 성공하면 위의 passport.serializeUser 함수로 이동

passport.use(
    new LocalStrategy(
        {
            usernameField: "id",
            passwordField: "pwd",
        },
        function (userid, password, done) {
            console.log('--------------------------'+userid);
            console.log('--------------------------'+password);

            conn = db_connect.getConnection();
            conn.query(db_sql.cust_select_one, [userid], (err, row, fields) => {
            
                if(err) throw err;
                
                let result = 0;
                //console.log('--------------------------'+row[0]['pwd']);

                
                if(row[0] == undefined){
                    return done(null, false, { message: "Login Fail " });
                }else if(row[0]['pwd'] != password){
                    return done(null, false, { message: "Login Fail " });
                }else{
                    let name = row[0]['name'];
                    let acc = row[0]['acc'];

                    return done(null, { id: userid, name: name, acc:acc });
                }

            });

        }
    )
);

// login 요청이 들어왔을 때 성공시 / 로, 실패시 /login 으로 리다이렉트
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/loginerror",
    })
);

app.get('/loginerror', (req,res)=>{
    goto.go(req,res,{
        'centerpage':'loginerror'
    })
})

//------------------------------------------------------------------------------------------------------------------------------------

app.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

//---------------------------------------------------------------
//127.0.0.1
app.get('/', (req,res)=>{ //'/(루트)'라고 요청하면 index.html을 서버에서 만들어서 화면에 전송
    goto.go(req,res,undefined);//상대방이 내컴퓨터로 들어오면 '/'여기로 들어옴->index.html을 만들어서 브라우저로 이동함.-> 보여짐
});


app.listen(port,()=>{ //start를하면 얘가 최초실행(서버 띄우는 모델)
    console.log(`server start port:${port}`)
});
//클릭을 하면 서버에 data요청


app.get('/login', (req,res)=>{
    goto.go(req,res,{'centerpage':'login'});
});
app.get('/register', (req,res)=>{
    goto.go(req,res,{'centerpage':'register'});
});
app.get('/about', (req,res)=>{
    goto.go(req,res,{'centerpage':'about'});
});

app.post('/registerimpl', (req,res)=>{
    let id = req.body.id; //name= let id 
    let pwd = req.body.pwd;
    let name = req.body.name;
    let acc = req.body.acc;
    console.log(id+' '+pwd+' '+name+' '+acc);

    conn = db_connect.getConnection();
    let values = [id,pwd,name,acc];
    conn.query(db_sql.cust_insert, values, (e, result, fields) => {
        try{
            if(e){
                console.log('Insert Error');
                throw e;
                
            }else{
                console.log('Insert OK !');
                goto.go(req,res, {'centerpage':'registerok'});
            }
        }
        catch(e) {
            console.log(e);
            goto.go(req,res, {'centerpage':'registerfail'});
        }
        finally {
            db_connect.close(conn);
        }
    });
});

    const vote = require('./routes/vote');//html은 html.js를 의미
    app.use('/vote', vote);

   
    const cust = require('./routes/cust');
    app.use('/cust', cust);
    const rank = require('./routes/rank');
    app.use('/rank', rank)


    
    const rank = require('./routes/rank');
    app.use('/rank', rank);


