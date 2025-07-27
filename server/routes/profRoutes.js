const express = require("express");
const router = express.Router();
const db = require("../db");

// ➤ POST : Ajouter un prof
const addProf = (req, res) => {
  const { nom,  etabId } = req.body;

  if (!nom ||  !etabId) {
    return res.status(400).json({ error: "Nom ID établissement requis" });
  }

  const sql = `INSERT INTO profs (nom, etab_id) VALUES (?, ?)`;
  db.run(sql, [nom, etabId], function (err) {
    if (err) {
      console.error("Erreur insertion prof:", err);
      return res.status(500).json({ error: "Erreur lors de l'ajout du prof" });
    }
    res.status(201).json({ message: "Prof ajouté ✅", id: this.lastID });
  });
};

// ➤ GET : Récupérer tous les profs d'un établissement
const getProf = (req, res) => {
  const { etabId } = req.params;

  const sql = `SELECT * FROM profs WHERE etab_id = ?`;
  db.all(sql, [etabId], (err, rows) => {
    if (err) {
      console.error("Erreur récupération profs:", err);
      return res.status(500).json({ error: "Erreur lors de la récupération des profs" });
    }
    res.json(rows);
  });
};

// ➤ DELETE : Supprimer un prof
const deletProf = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM profs WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Erreur suppression prof:", err);
      return res.status(500).json({ error: "Erreur lors de la suppression" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Prof non trouvé" });
    }

});
}


module.exports = { addProf, getProf, deletProf };
