const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin vers la base
const dbPath = path.join(__dirname, 'data', 'database.sqlite');

// Connexion
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur connexion SQLite:', err);
  } else {
    console.log('Base SQLite connectée ✅');
  }
});
db.run("PRAGMA foreign_keys = ON", (err) => {
  if (!err) {
    console.log("Foreign keys activées ✅");
  }
});

// Créer la table établissements si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS etablissements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    lieu TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS profs (
    id INTEGER PRIMARY KEY ,
    nom TEXT NOT NULL,
    etab_id INTEGER,
    FOREIGN KEY(etab_id) REFERENCES etablissements(id) ON DELETE CASCADE
)`);
db.run(`
 CREATE TABLE IF NOT EXISTS info (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prof_id INTEGER,
  nom TEXT,
  prenom TEXT,
  echelon INTEGER,
  email TEXT,
  situation TEXT,
  niveaux TEXT,
  derniereVisite TEXT,
  note TEXT,
  FOREIGN KEY(prof_id) REFERENCES profs(id) ON DELETE CASCADE);

`);
db.run(`CREATE TABLE IF NOT EXISTS emploi_du_temps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prof_id INTEGER NOT NULL,
    jour TEXT NOT NULL,
    heure TEXT NOT NULL,
    status INTEGER DEFAULT 1,
    FOREIGN KEY (prof_id) REFERENCES profs(id) ON DELETE CASCADE
);`
);
 

module.exports = db;
