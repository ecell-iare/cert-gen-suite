var express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var router = express.Router();

const upload = multer({ dest: 'uploads/' });


router.get('/', function(req, res, next) {
  res.render('index');
});


// example upload endpoint defined
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const tempPath = req.file.path;
  const targetDir = path.join(__dirname, '../uploads');
  const targetPath = path.join(targetDir, req.file.originalname);

  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error occurred during file processing.');
    }
    fs.readFile(targetPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error reading the file.');
      res.send('File uploaded and processed successfully.');
    });
  });
});



module.exports = router;
