
const db = require ("../db")

const getPdf = (req, res) => {
    const profId = req.params.profId;

    const sql = `SELECT * FROM pdf WHERE prof_id = ?`;
    db.all(sql,[profId] , (err, row) =>
    {
        if(err) {
            return res.status(400).json({error : "erreur dans sql"})
        }
        if(!row){
            return res.json({})
        }

        res.json(row);

    });
}

module.exports = {getPdf};