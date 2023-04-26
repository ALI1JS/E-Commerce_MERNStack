const userModel = require('../models/usermodel').userModel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup =async (req,res,next)=>{
      const {firstName , lastName ,email , password , image} = req.body;
      console.log(req.body.file);
      /**
       * validation first
       * check if email exist or not 
       * no =>save data
       *   =>encrypt the password
       *   => redirect to login page
       * yes=>redirect to signup page to change eamil
       */
       
      try {
        await userModel.findOne({email:email}).then((user)=>{
            if (user)
           {
             res.send({state:false,msg:`this email ${email} already exist `});
           }
           else{
               
             bcrypt.hash(password , 10,(err,hash)=>{
                
                if (err){
                   console.log(err)
                    res.send({state:false,msg:`there are error in hashing password try again please !`});
                }
                else{
    
                   const user = new userModel({
                      firstName,
                      lastName,
                      email,
                      password:hash,
                      avatar:image
                   });
    
                   user.save()
                   .then((user)=>res.send({state:true,msg:`user is registerd successfully !`}))
                   .catch((err)=>res.send({msg:err}))
    
                }
    
             }) 
              

           }
        }).catch((err)=>{
             res.send({msg:err.message})
        })
            
        
      } catch (err) {
          res.send({msg:err.message})
      } 
       

    

}


const login = async(req,res,next)=>{

   /**
    * validation:
    * check  if email exist or no
    *   y=> check for password equaility after encrypted
    *     =>eq ==>redirect to home page
    *     +>neq==> type the coreect password
    *  n=>type the correct email or create neew acount
    */ 
  
   const {email,password}= req.body;
   let userinfo ;
    try {
        
        userModel.findOne({email:email}).then((user)=>{
            let avatar = user.avatar;
          if (!user)
          {
             res.send({state:false,msg:`this email ${email} is not available`})
          }
          else{
             userinfo  = user;
             bcrypt.compare(password, user.password,(err,match)=>{
                  if (err)
                  {
                     res.send({state:false,msg:"there are error try again !"})
                  }
                  else
                  {
                    /**
                     * create token and let state flage true and send sucessfull message
                     */
                      const token = jwt.sign({
                        userId: userinfo._id,  
                        userName: userinfo.firstName,
                      },process.env.SECRET_KEY,{
                        expiresIn:'24h'
                      })
                      
                      
                     res.send({
                        state:true,
                        msg:"login successfully !",
                        token:token,
                        userInfo:{
                           firstName:user.firstName,
                           avatar:user.avatar,
                           isAuth:true
                        }
                     });
                  }
             })
               
          }
        }) 


    } catch (err) {
       res.send({msg:err.message})
    }
}

module.exports = {signup,login};

