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


      // ✅ Si la ligne existe, on fait un UPDATE
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



module.exports = {addInfo,getInfo,updateInfo}