const db = require("../db")




const addInfo = (req , res) => {
    
    const {profId } = req.params;
    const {nom, prenom, echelon, email,  situation,niveaux,derniereVisite,note } = req.body;

    if(!nom || !prenom || !echelon || !situation || !niveaux  || !derniereVisite || !note) {
        return res.status(400).json({error: "remplir tout les champs"});
    }
    
const sql = `
INSERT INTO info (prof_id, nom, prenom, echelon, email, situation, niveaux, derniereVisite, note)
VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
`;db.run(sql, [profId, nom, prenom, echelon, email, situation, niveaux, derniereVisite, note], function(err){
    if(err){
        console.error("error insert prof", err);
        return res.status(500).json({error: "Erreur lors de l'ajout des informations du professeur",err});      

    }
    res.status(201).json({message: "Informations du professeur ajoutées ✅", id: this.lastID});

} );
}

const getInfo = (req, res) => {
  const { profId } = req.params;

  const sql = `SELECT * FROM info WHERE prof_id = ?`;

  db.get(sql, [profId], (err, row) => {
    if (err) {
      console.error("Erreur lors de la récupération des informations :", err.message);
      return res.status(500).json({ error: "Erreur lors de la récupération des informations." });
    }

    if (!row) {
      return res.json({}); 
    }

    res.json(row);
  });
};
const updateInfo = (req, res) => {
  const { profId } = req.params;
  const { nom, prenom, echelon, email, situation, niveaux, derniereVisite, note } = req.body;

  if (!nom || !prenom || !echelon || !situation || !niveaux || !derniereVisite || !note) {
    return res.status(400).json({ error: "Remplir tous les champs" });
  }

  // Vérifier si une ligne existe déjà pour ce prof
  const checkSql = `SELECT id FROM info WHERE prof_id = ?`;
  db.get(checkSql, [profId], (err, row) => {
    if (err) {
      console.error("Erreur vérification info :", err);
      return res.status(500).json({ error: "Erreur lors de la vérification" });
    }


      const updateSql = `
        UPDATE info
        SET nom = ?, prenom = ?, echelon = ?, email = ?, situation = ?, niveaux = ?, derniereVisite = ?, note = ?
        WHERE prof_id = ?
      `;
      db.run(updateSql, [nom, prenom, echelon, email, situation, niveaux, derniereVisite, note, profId], function (err) {
        if (err) {
          console.error("Erreur update info :", err);
          return res.status(500).json({ error: "Erreur lors de la mise à jour" });
        }
        return res.status(200).json({ message: "Informations mises à jour ✅" });
      });
   

 
    
  });
};

const getCreneau = (req, res) => {
    const { profId } = req.params;
    db.all(
        "SELECT jour, heure, texte FROM emploi_du_temps WHERE prof_id = ?",
        [profId],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
};


const insertCreneau = (req, res) => {
    const { profId } = req.params;
    const { jour, heure, texte } = req.body;

    db.get(
        `SELECT id FROM emploi_du_temps WHERE prof_id = ? AND jour = ? AND heure = ?`,
        [profId, jour, heure],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });

            if (row) {
                // Si existe → update
                db.run(
                    `UPDATE emploi_du_temps SET texte = ? WHERE id = ?`,
                    [texte, row.id],
                    function (err) {
                        if (err) return res.status(500).json({ error: err.message });
                        res.json({ updated: this.changes });
                    }
                );
            } else {
                // Sinon → insert
                db.run(
                    `INSERT INTO emploi_du_temps (prof_id, jour, heure, texte) VALUES (?, ?, ?, ?)`,
                    [profId, jour, heure, texte],
                    function (err) {
                        if (err) return res.status(500).json({ error: err.message });
                        res.json({ id: this.lastID });
                    }
                );
            }
        }
    );
};



const deleteCreneau = (req, res) => {
    const { profId } = req.params;
    const { jour, heure } = req.body;

    db.run(
        `DELETE FROM emploi_du_temps WHERE prof_id = ? AND jour = ? AND heure = ?`,
        [profId, jour, heure],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ deleted: this.changes });
        }
    );
};






module.exports = {addInfo,getInfo,updateInfo,getCreneau,insertCreneau,deleteCreneau}