var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); 
var slug = require('slug');
var User = mongoose.model('User');

var MemeSchema = new mongoose.Schema({ 
  slug: {type: String, lowercase: true, unique: true},
  title: {type: String},  
  topTxt: {type: String,required: [true, "can't be blank"]},  
  bottomTxt: {type: String,required: [true, "can't be blank"]},  
  imageURL: String,  
  memeImageURL: String, 
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true,usePushEach: true});

MemeSchema.plugin(uniqueValidator, {message: 'is already taken'});

MemeSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

MemeSchema.methods.slugify = function() {
  this.slug =  'meme-' + (Math.random() * Math.pow(36, 6) | 0).toString(36); 
  this.title =  this.title+'-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};
 
MemeSchema.methods.toJSONFor = function(user){
  return { 
    slug: this.slug,
    title: this.title, 
    createdAt: this.createdAt,
    updatedAt: this.updatedAt, 
    memeImageURL: this.memeImageURL,  
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Meme', MemeSchema);
