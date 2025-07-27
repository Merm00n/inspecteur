const db = require("../db")



const addInfo = (req , res) => {
    const {profId } = req.params;
    const {nom, prenom, grade, adresse, phone, situation,niveau } = req.body;

    if(!nom || !prenom || !grade || !adresse || !phone || !situation || !niveau) {
        return res.status(400).json({error: "remplir tout les champs"});
    }
    
const sql = `
INSERT INTO infoprofs (prof_id, nom, prenom, grade, email, telephone, situation, niveaux)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;db.run(sql, [profId, nom, prenom, grade, adresse, phone, situation, niveau], function(err){
    if(err){
        console.error("error insert prof", err);
        return res.status(500).json({error: "Erreur lors de l'ajout des informations du professeur",err});      

    }
    res.status(201).json({message: "Informations du professeur ajoutées ✅", id: this.lastID});

} );
}


module.exports = {addInfo}