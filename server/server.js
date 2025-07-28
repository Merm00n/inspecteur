const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { addProf, getProf, deletProf } = require('./routes/profRoutes');
const { addInfo, getInfo,updateInfo,getCreneau,insertCreneau,deleteCreneau } = require ('./routes/infoProf');
const db = require('./db');


// Import des fonctions
const { addEtablissement, getAllEtablissements, deleteEtablissement } = require('./routes/etabRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // ton frontend
  credentials: true
}));

// Création du dossier data si inexistant
const baseDir = path.join(__dirname, 'data');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// ✅ Définition des routes
app.post('/add', addEtablissement);
app.get('/all', getAllEtablissements);
app.delete('/delete/:id', deleteEtablissement);
app.post('/add-prof', addProf );
app.get('/all-prof/:etabId', getProf);
app.delete('/delete-prof/:id', deletProf);
app.post('/add-info/:profId', addInfo);
app.get('/get-info/:profId', getInfo);
app.put('/update-info/:profId',updateInfo ); 
app.get('/get-creneau/:profId', getCreneau);
app.post('/insert-creneau/:profId', insertCreneau);
app.delete('/delete-creneau/:profId', deleteCreneau);
// app.get('/delete-table3', (req, res) => {
//   db.run("DROP TABLE IF EXISTS info", (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Erreur suppression table", err });
//     }
//     res.json({ message: "Table infoprofs supprimée ✅" });
//   });
// });




app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
