
const db = require ("../db");
const path = require('path');
const fs = require('fs');

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

const deletePdf = (req, res) => {
  const pdfId = req.params.pdfId;

  const selectSql = `SELECT file_path FROM pdf WHERE id = ?`;

  db.get(selectSql, [pdfId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Erreur SQL (select)", details: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: "PDF non trouvé" });
    }

    const filePath = path.join(__dirname, "..", row.file_path); 

    fs.unlink(filePath, (fsErr) => {
      if (fsErr && fsErr.code !== 'ENOENT') {
        return res.status(500).json({ error: "Erreur suppression fichier", details: fsErr.message });
      }

      const deleteSql = `DELETE FROM pdf WHERE id = ?`;
      db.run(deleteSql, [pdfId], function (dbErr) {
        if (dbErr) {
          return res.status(500).json({ error: "Erreur SQL (delete)", details: dbErr.message });
        }

        res.json({ message: "PDF supprimé avec succes" });
      });
    });
  });
};




module.exports = {getPdf,deletePdf};