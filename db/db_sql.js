//sql문
module.exports = {
    cust_select:'SELECT * FROM cust',
    cust_select_one:'SELECT * FROM cust WHERE id = ?',
    cust_insert:'INSERT INTO cust VALUES (?,?,?,?)',
    cust_update:'UPDATE cust SET pwd=?, name=?, acc=? WHERE id=?',
    cust_delete:'DELETE FROM cust WHERE id = ?',

<<<<<<< Updated upstream
    idol_select: 'SELECT * FROM idol'

=======
    idol_select_vote: 'SELECT id,name,agency,hobby,specialty,comment,imgname,vote,date_format(birth_date, "%Y년%m월%d일") as birth_date FROM idol ORDER BY vote DESC',
    idol_select_name: 'SELECT id,name,agency,hobby,specialty,comment,imgname,vote,date_format(birth_date, "%Y년%m월%d일") as birth_date FROM idol ORDER BY name ASC',

    idol_select: 'SELECT id,name,agency,hobby,specialty,comment,imgname,vote,date_format(birth_date, "%Y.%m.%d") as birth_date FROM idol ORDER BY vote DESC',
    idol_update :'UPDATE idol SET vote = vote + 1 WHERE id = ?'
>>>>>>> Stashed changes
}