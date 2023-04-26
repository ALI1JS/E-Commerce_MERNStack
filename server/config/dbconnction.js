const mongoose = require('mongoose');


/**
 *  function to connect to mongodb:
 */

const connect = async()=>{

    try{
       await mongoose.connect('mongodb://127.0.0.1:27017/Ecomsys').then(()=>{
               console.log("the server connect to database successfully !");
          }).catch((err)=>console.log(err));
    }
    catch(err){
        console.log(err);
    }
      
   
}

module.exports.connect = connect;


