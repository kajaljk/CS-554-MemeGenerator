const router = require('express').Router();
const mongoose = require('mongoose');
const Meme = mongoose.model('Meme'); 
const User = mongoose.model('User');
const auth = require('../auth');
const Jimp = require('jimp');

router.param('meme', function(req, res, next, slug) {
  Meme.findOne({ slug: slug})
    .populate('author')
    .then(function (meme) {
      if (!meme) { return res.sendStatus(404); }

      req.meme = meme;

      return next();
    }).catch(next);
});

router.get('/', auth.optional, function(req, res, next) {
    var query = {};
    var limit = 12;
    var offset = 0;
  
    if(typeof req.query.limit !== 'undefined'){
      limit = req.query.limit;
    }
  
    if(typeof req.query.offset !== 'undefined'){
      offset = req.query.offset;
    }
    Promise.all([
      req.query.author ? User.findOne({username: req.query.author}) : null,
      req.query.favorited ? User.findOne({username: req.query.favorited}) : null
    ]).then(function(results){
      var author = results[0];
  
      if(author){
        query.author = author._id;
      }
      return Promise.all([
        Meme.find(query)
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({createdAt: 'desc'})
          .populate('author')
          .exec(),
          Meme.count(query).exec(),
        req.payload ? User.findById(req.payload.id) : null,
      ]).then(function(results){
        var memes = results[0];
        var memesCount = results[1];
        var user = results[2];
  
        return res.json({
          memes: memes.map(function(meme){
            return meme.toJSONFor(user);
          }),
          memesCount: memesCount
        });
      });
    }).catch(next);
});
 
const CreateMemeImage = (fileName,topText,bottomText) => {
    let fileMIME = fileName.split('.').pop();
 
    let memeImgPath = "images/IMG_" + Math.floor(Math.random()*89999+10000)+"."+fileMIME; 

    Jimp.read('public/images/'+fileName)
        .then(function(image){
          Jimp.loadFont(Jimp.FONT_SANS_64_WHITE) 
              .then(function(font) {
                image.resize(520, Jimp.AUTO)  
                .print(
                  font,
                  10,
                  10,
                  {
                      text: topText,
                      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                      alignmentY: Jimp.VERTICAL_ALIGN_TOP
                  }, 
                  520,
                  image.getHeight() 
                );
                image.print(
                  font,
                  10,
                  10,
                  {
                      text: bottomText,
                      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                      alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
                  }, 
                  520,
                  image.getHeight() 
                )  
                .write('public/'+memeImgPath); 
              }).catch(function(err){throw err}); 
    }).catch(function (err) {
        alert("Image load fail.\n"+err.message)
        throw err;
    });
    return memeImgPath;
}

router.post('/', auth.required, function(req, res, next) {

    User.findById(req.payload.id).then(function(user){
      if (!user) { return res.sendStatus(401); }
  
      // save meme image
      const memeImgPath = CreateMemeImage(req.body.meme.imageURL,req.body.meme.topTxt,req.body.meme.bottomTxt);

      var meme = new Meme(req.body.meme);
      meme.memeImageURL = "http://localhost:3000/public/"+memeImgPath;
      meme.author = user;
  
      return meme.save().then(function(){ 
        return res.json({meme: meme.toJSONFor(user)});
      });
    }).catch(next);
});

router.get('/:meme', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.meme.populate('author').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({meme: req.meme.toJSONFor(user)});
  }).catch(next);
});

router.put('/:meme', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.meme.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.meme.title !== 'undefined'){
        req.meme.title = req.body.meme.title;
      }

      if(typeof req.body.meme.topTxt !== 'undefined'){
        req.meme.topTxt = req.body.meme.topTxt;
      }

      if(typeof req.body.meme.bottomTxt !== 'undefined'){
        req.meme.bottomTxt = req.body.meme.bottomTxt;
      } 
      req.meme.save().then(function(meme){
        return res.json({meme: meme.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

router.delete('/:meme', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.meme.author._id.toString() === req.payload.id.toString()){
      return req.meme.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});


module.exports = router;