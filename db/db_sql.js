//sql문
module.exports = {
    cust_select:'SELECT * FROM cust',
    cust_select_one:'SELECT * FROM cust WHERE id = ?',
    cust_insert:'INSERT INTO cust VALUES (?,?,?,?)',
    cust_update:'UPDATE cust SET pwd=?, name=?, acc=? WHERE id=?',
    cust_delete:'DELETE FROM cust WHERE id = ?',

    idol_select: 'SELECT id, name, birthdate, agency, vote, imgname FROM idol',
    idol_select_one:'SELECT * FROM idol WHERE id = ?'

}