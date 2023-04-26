const model = require('../models/productmodel');
const JWT = require('jsonwebtoken');

const addNewproduct = (req, res, next) =>{
  const {title, catogery, image, price, amount, description} = req.body.data;
  // console.log(req.body.token);
  
  
  /**
   * ALIDATION FOR THE DATA THAT COME FROM CLIENT BEFORE ANY FUNCTION
   * CHECK IF THIS PRODUCT IF EXIST OR NOT THROGHTOUT THE TITLE OF PRODUCT
   *   YES=>SHOW FOR USER A MESSAGE FOR ADD ANOTHER PRODUCT
   *   NO=>SAVE THE PRODUCT
   */


   JWT.verify(req.body.token,process.env.SECRET_KEY,async (err,decode)=>{
    if (err) res.json({msg:err.message})
    else
    {
      await model.findOne({title: title}).then((product)=>{
        if (product)
        {
          res.json({msg:"This Product is already Exist"});
        }
        else
        {
          const newProduct = new model({
            title,
            catogery,
            image,
            price,
            amount,
            description,
            userID:decode.userId,
          });
          newProduct.save()
          .then((product)=>{
             if (product)
             {
              res.json({msg:"Product saved successfully"});
             }
             else
             {
              res.json({msg:"Product does not saved try again"});
             }
          }).catch((err)=>{
            res.json({msg:err.message});
          })
    
        }
    
      })
    }
 })
  
}


const getProducts = async (req,res)=>{
 await model.find({})
 .then((products)=>{
    if (products)
    {
      res.send(products);
    }
    else
    {
      res.send("there is not exist any products");
    }
 })
 .catch((err)=>{
    res.send(err.message); 
 })  
}
module.exports = {
    addNewproduct,
    getProducts
}