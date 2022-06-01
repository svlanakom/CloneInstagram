const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'images/');
    },
    filename(req, file, cb) {
      // let name = file.originalname.substring(0, file.originalname.lastIndexOf("."));
      // let ext = file.originalname.substring(file.originalname.lastIndexOf("."));
      // cb(null, `${name}-${Date.now()}${ext}`);
      cb(null, file.originalname)
    },
  });
  
   const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });

const User = require('../models/user');

router.post('/image', upload.any('image'), (req, res) => {
    console.log(req.files);
     res.sendStatus(200);
});


module.exports = router;