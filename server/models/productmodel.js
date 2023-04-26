const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true,
  },
  catogery:{
    type:String,
    require:true,
  },
  image:{
    type:String,
    require:true,
  },
  price:{
    type:String,
    require:true,
  },
  amoutn:{
    type:String,
    require:true,
  },
  description:{
    type:String
  },
  userID:String
})

module.exports= mongoose.model('Products',ProductSchema);