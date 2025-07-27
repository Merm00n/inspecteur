const db = require('../db');

const addEtablissement = (req, res) => {
  const { nom, lieu } = req.body;

  if (!nom || !lieu) {
    return res.status(400).json({ error: 'Nom et lieu requis' });
  }

  const sql = `INSERT INTO etablissements (nom, lieu) VALUES (?, ?)`;
  db.run(sql, [nom, lieu], function (err) {
    if (err) {
      console.error('Erreur insertion:', err);
      return res.status(500).json({ error: 'Erreur lors de l\'ajout' });
    }
    res.status(201).json({ message: 'Établissement ajouté', id: this.lastID });
  });
};

const getAllEtablissements = (req, res) => {
  const sql = `SELECT * FROM etablissements`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erreur lecture:', err);
      return res.status(500).json({ error: 'Erreur lors de la lecture' });
    }
    res.json(rows);
  });
};
const deleteEtablissement = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'ID requis' });
  }

  const sql = `DELETE FROM etablissements WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Erreur suppression:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Établissement non trouvé' });
    }

    res.json({ message: 'Établissement supprimé avec succès ✅' });
  });
};

module.exports = {
  addEtablissement,
  getAllEtablissements,
  deleteEtablissement
};
