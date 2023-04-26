const mongoose = require('mongoose');


const userSchema =new mongoose.Schema({
    firstName:{
       type:String,
       require:true,
       min:3,
       max:10
    },
    lastName:{
        type:String,
        require:false,
        min:3,
        max:10
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowecase:true,
        validate: {
               validator: function(v) {
                  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
                 },
           },
        },
    password:{
        type:String,
        require:true,
        min:7,
        max:15,
    },
    avatar:String,
})

module.exports.userModel = mongoose.model('User', userSchema);
