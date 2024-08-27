var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');
conn = db_connect.getConnection();



conn.query(db_sql.idol_select, function (e, result, fields) {
    try{
        if(e){
            console.log('Select Error');
            throw e;
        }else{
            console.log(result);
            goto.go(req,res,{'centerpage':'rank', 'ranks':result});
        }
    }
    catch(e){
        console.log(e);
    }
    finally{
        db_connect.close(conn);
    }
    
});