const router = require ('express').Router();
const Controller = require('../controller/authcontroller');
const multer = require("multer");

/**
 * Requests:
 *  =>signupRequest
 *  =>loginRequest
 */

const storage = multer.diskStorage({
    destination: (req , file , cb)=>{
        cb(null , './uploads');
    },
    filename:(req, file ,cb)=>{
      cb (null, file.originalname);
    }
   });
  
  /**
   * midelware
   */
 const upload = multer({storage:storage});  


router.post("/signup",upload.single('file'),Controller.signup);
router.post("/login",Controller.login);

module.exports=router;