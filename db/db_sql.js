//sql문
module.exports = {
    cust_select:'SELECT * FROM cust',
    cust_select_one:'SELECT * FROM cust WHERE id = ?',
    cust_insert:'INSERT INTO cust VALUES (?,?,?,?)',
    cust_update:'UPDATE cust SET pwd=?, name=?, acc=? WHERE id=?',
    cust_delete:'DELETE FROM cust WHERE id = ?',

    idol_select: 'SELECT id,name,agency,hobby,specialty,comment,imgname,date_format(birth_date, "%Y년%m월%d일") as birth_date FROM idol'
}