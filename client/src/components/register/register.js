import { Link ,useNavigate } from "react-router-dom";
import signupImage from "../../assets/login-animation.gif";
import {AiFillEyeInvisible} from "react-icons/ai";
import {MdVisibility} from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";


const Register = () => {
    const redirect = useNavigate();
    const [showpassword,setshowpassword]= useState(false);
    const [visibleIcon,setvisibleIcon] = useState(false);
    const [user , setUser] = useState({
      firstName : "",
      lastName : "",
      email : "",
      password : "",
      confirm : "",
      image:"",
      file:"",
    });

    const togglePassword= ()=>{
         setshowpassword(!showpassword);
         setvisibleIcon(!visibleIcon);
    }

    const changeUser = (e) =>{
       const {name, value} = e.target;
        
       setUser(prev=>{
           return {
               ...prev,
               [name]:value
           }
       });
       console.log(user.file)

    }

    const handleUser = (e)=>{
        e.preventDefault();
        const {firstName , lastName , email , password ,confirm, image} = user;

        if (firstName && lastName && email && password &&confirm )
        {
            if (password === confirm)
             {   
                 axios.post('http://localhost:5000/api/signup',user).then((res)=>{
                          
                          if (res.data.state === false)
                          {
                            toast.error(res.data.msg);
                          }
                           if (res.data.state ===true) 
                          {
                            toast.success(res.data.msg);
                             redirect('/login');
                          }
                 }).catch((err)=>{
                       toast.error(err.message);
                 })
                
             }
             else{
                 toast.error("the confirm password doese not match to password");
             }
        }
         else
        {
              toast.error("Please fill the required fileds !");
        }
    }

    const uploadeAvatar = (e) =>{
       const file = e.target.files[0];
       const Reader = new FileReader();
       Reader.readAsDataURL(file) ;
       Reader.onload = ()=>{
           const data =  Reader.result;

           setUser((prev=>{
            return{
              ...prev,
               image:data,
               file:file
            }
          }))
       }
       Reader.onerror=(err)=>{
         console.log(err);
       }

       
    }

  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div className="bg-white mt-12 px-4 py-2 rounded-md min-w-md min-h-50 flex items-center flex-col">
      <form encType="multipart/form-data" onSubmit={handleUser} noValidate className="w-full flex flex-col gap-3">
        <div className="relative w-20 rounded-full overflow-hidden drop-shadow-md shadow-md">
          <img className="w-full" src={user.image ? user.image:signupImage} alt="signup_image" />
          <div className="absolute bottom-0 w-full  bg-slate-300 h-1/3 ">
              <label className="cursor-pointer">
                  <p className="text-sm text-center">upload</p>
                  <input onChange={uploadeAvatar} className="hidden" name="file" type="file" accept="image/*"/>
              </label>
          </div>
        </div>
        <h2 className="mb-3 text-lg font-bold capitalize text-amber-700">signup</h2>
        
           <div className="w-full flex flex-col gap-1">
              <label className=" w-full capitalize font-bold" for="fname">first name</label>
              <input onChange={changeUser} className="w-96 bg-gray-300 outline-2 outline-blue-600 rounded-sm h-7 pl-2 text-lg" type="text" id="name" name="firstName"/>
           </div>
           <div className="w-full flex flex-col gap-1">
              <label className=" w-full capitalize font-bold" for="lname">last name</label>
              <input onChange={changeUser} className="w-96 bg-gray-300 outline-2 outline-blue-600 rounded-sm h-7 pl-2 text-lg" type="text" id="name" name="lastName"/>
           </div>
           <div className="w-full flex flex-col gap-1">
              <label className=" w-full capitalize font-bold" for="email">your email</label>
              <input onChange={changeUser} className="w-96 bg-gray-300 outline-2 outline-blue-600 rounded-sm h-7 pl-2 text-lg" type="email" id="email" name="email"/>
           </div>
           <div className="w-full flex flex-col gap-1 relative">
              <label className=" w-full capitalize font-bold" for="password">password</label>
              <input onChange={changeUser} className="w-96 bg-gray-300 outline-2 outline-blue-600 rounded-sm h-7 pl-2 text-lg" type= { showpassword ? "text": "password"}id="password" name="password"/>
              {
                !visibleIcon?
                 <AiFillEyeInvisible onClick={togglePassword} class="absolute top-8 right-4 text-xl cursor-pointer"/>
                :
                <MdVisibility onClick={togglePassword} class="absolute top-8 right-4 text-xl cursor-pointer"/>
              }

           </div>
           <div className="w-full flex flex-col gap-1 relative">
              <label className=" w-full capitalize font-bold" for="confirm">confim password</label>
              <input onChange={changeUser} className="w-96 bg-gray-300 outline-2 outline-blue-600 rounded-sm h-7 pl-2 text-lg" type={showpassword ? "text":"password"} id="conform" name="confirm"/>
              {
                !visibleIcon?
                 <AiFillEyeInvisible onClick={togglePassword} class="absolute top-8 right-4 text-xl cursor-pointer"/>
                :
                <MdVisibility onClick={togglePassword} class="absolute top-8 right-4 text-xl cursor-pointer"/>
              }
           </div>
            <div className="w-full flex justify-center">
                <button className="bg-blue-500 border-none rounded-sm py-2 px-4 text-white capitalize cursor-pointer">signup</button>
            </div>
           <div className="w-full">
               <p className="capitalize font-bold text-md">you have aready acount <Link className="text-blue-500 text-lg" to="/login">Login</Link> </p>
           </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
