import { Link, useNavigate } from "react-router-dom";
import signupImage from "../../assets/login-animation.gif";
import {AiFillEyeInvisible} from "react-icons/ai";
import {MdVisibility} from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addInfo } from "../../statemangment/reducers/userstate";

const Login = () => {
    const redirect = useNavigate();
    const dispatch = useDispatch();
    const [showpassword,setshowpassword]= useState(false);
    const [visibleIcon,setvisibleIcon] = useState(false);
    const [user, setuser] = useState({
       email:"",
       password:""
    })

    const togglePassword= ()=>{
         setshowpassword(!showpassword);
         setvisibleIcon(!visibleIcon);
    }

    const onchangeUser=(e)=>{
      const {name,value} = e.target;
       setuser(prev=>{
           return {
              ...prev,
              [name]:value
           }
       })
    }
 
  const handelUser = (e)=>{
      e.preventDefault();
      
      /**
       * validation 
       * snd it to server:
       */

      const {email , password} = user;
      if (email && password)
      {
            axios.post("http://localhost:5000/api/login",user).then((res)=>{
                 if (res.data.state === true)
                 {   
                     const {firstName ,avatar ,isAuth} = res.data.userInfo;
                      localStorage.setItem('token',res.data.token);
                      toast.success(res.data.msg);
                      dispatch(addInfo(
                        {
                          firstName,
                          avatar,
                          isAuth
                        }
                      ))    
                      console.log(avatar);
                       redirect('/');
                 }
                 else{
                      toast.error(res.data.msg);
                 }
            })
      }
      else{
          toast.error("Please fill the required fields !");
      }

  }


  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div className="bg-white mt-12 px-4 py-2 rounded-md min-w-md min-h-50 flex items-center flex-col">
        <div className="w-20 rounded-full overflow-hidden drop-shadow-md shadow-md">
          <img className="w-full" src={signupImage} alt="signup_image" />
        </div>
        <h2 className="mb-3 text-lg font-bold capitalize text-amber-700">login</h2>
        <form on onSubmit={handelUser} noValidate className="w-full flex flex-col gap-3">
           
           <div className="w-full flex flex-col gap-1">
              <label className=" w-full capitalize font-bold" for="email">your email</label>
              <input onChange={onchangeUser} className="w-96 bg-gray-300 outline-2 focus-within:outline-blue-600 rounded-sm h-7 pl-2 text-lg" type="email" id="email" name="email"/>
           </div>
           <div className="w-full flex flex-col gap-1 relative">
              <label className=" w-full capitalize font-bold" for="password">password</label>
              <input onChange={onchangeUser} className="w-96 bg-gray-300 outline-2 outline-blue-600 rounded-sm h-7 pl-2 text-lg" type= { showpassword ? "text": "password"}id="password" name="password"/>
              {
                !visibleIcon?
                 <AiFillEyeInvisible onClick={togglePassword} class="absolute top-8 right-4 text-xl cursor-pointer"/>
                :
                <MdVisibility onClick={togglePassword} class="absolute top-8 right-4 text-xl cursor-pointer"/>
              }

           </div>
            <div className="w-full flex justify-center">
                <button className="bg-blue-500 border-none rounded-sm py-2 px-4 text-white capitalize cursor-pointer">login</button>
            </div>
           <div className="w-full">
               <p className="capitalize font-bold text-md">you have not acount <Link className="text-blue-500 text-lg" to="/register">signup</Link> </p>
           </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
