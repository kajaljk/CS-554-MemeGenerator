var router = require('express').Router();
const multer=require('multer');
const xss = require("xss"); 

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/memes', require('./memes'));
 

//router.use('/image', require('./image'));

const storageImages = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function(req, file, cb) {
    cb(null, xss(file.originalname));
  }
});

const uploadImage = multer({ storage: storageImages });

router.post("/uploadImage", uploadImage.single('uploadfile'), async(req, res) => { 
  let filename = req.file.filename;  
  res.json({"filename":filename});
});

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;