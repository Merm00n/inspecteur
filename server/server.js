const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { addProf, getProf, deletProf } = require('./routes/profRoutes');
const { addInfo } = require ('./routes/infoProf');

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


app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
