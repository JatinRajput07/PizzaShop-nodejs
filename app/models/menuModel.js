const mongoose = require('mongoose')
const slugify = require('slugify');

const menuSchema =  new mongoose.Schema({
    name:{
      type:String,
      required:[true,'enter pizza name'],
      unique:true
    },

    slug: String,
  
    image:{
        type:String,
        required:true
    },
  
    price:{
      type:Number,
      required:[true,'Plz Enter price']
    },
  
    size:{
      type:String,
      enum:['small','medium','large'],
      required:[true,'plz enter pizza size']
    }
  });


  menuSchema.pre('save',function(next){
      this.slug = slugify(this.name,{lower:true});
      next();
  })
  
  const Menus = mongoose.model('Menu',menuSchema);
  module.exports = Menus;