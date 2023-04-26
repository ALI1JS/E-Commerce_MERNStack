const jwt = require('jsonwebtoken');

const getDetails = (req,res,next)=>{
  
  const token = req.header('Authorization');

  try{
     const data = jwt.verify(token,process.env.SECRET_KEY,);
     
     if (data.userId)
     {
        res.json({isAuth:true});
     }
     else{
        res.json({isAuth:false});
     }
     
  }
   catch(err)
   {
     res.json({msg:err.message});
   }
}

module.exports={getDetails}