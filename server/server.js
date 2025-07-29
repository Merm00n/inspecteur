const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { getPdf,deletePdf } = require('./routes/pdf');
const { addProf, getProf, deletProf } = require('./routes/profRoutes');
const { addInfo, getInfo,updateInfo,getCreneau,insertCreneau,deleteCreneau } = require ('./routes/infoProf');
const db = require('./db');
const multer  = require('multer')

const { addEtablissement, getAllEtablissements, deleteEtablissement } = require('./routes/etabRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

const baseDir = path.join(__dirname, 'data');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}


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
app.get('/getPdf/:profId', getPdf);
app.use('/files', express.static(path.join(__dirname, 'files')));

// app.get('/delete-table3', (req, res) => {
//   db.run("DROP TABLE IF EXISTS pdf", (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Erreur suppression table", err });
//     }
//     res.json({ message: "Table infoprofs supprimée " });
//   });
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() 
    cb(null,  uniqueSuffix+file.originalname) 
  }
})
const upload = multer({ storage: storage })

app.post('/upload-file/:profId', upload.single('file'), async (req, res) => {
  const {profId} = req.params;
  const { title } = req.body;
  const file = req.file;
  if (!file || !title || !profId) {
    return res.status(400).json({ error: 'champs manquant' });
  }
  const filePath = `./files/${file.filename}`;
  const sql =  ` INSERT INTO pdf (title, file_path, prof_id) VALUES (?, ?, ?)`;
  db.run(sql, [title,filePath,profId], function(err) {
  
    if(err){
      res.status(500).json({error: "Erreur lors de l'insertion dans la base de données"});
    }
    res.status(200).json({message : "fichier ajoute avec succee"})
  })

 

})

app.delete('/delete-pdf/:pdfId', deletePdf);




app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
