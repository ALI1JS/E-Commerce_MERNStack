import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {FaShoppingCart,FaUserCircle} from "react-icons/fa";
import {useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import { removeInfo } from "../../statemangment/reducers/userstate";
const Header = () =>{
  
  const [useraction,setuseraction] = useState(false);
  const [visible,setvisble] = useState(false);
  const redirect = useNavigate();
  const userInfo = useSelector((state)=>state.userData);
  const cart = useSelector(state=>state.cart);
  const dispatch = useDispatch();
     /**
      * 
      * toogle function
      */

const visibleLogoutBtn = ()=>{
     return  localStorage.getItem('token');
}


const handleNavbar = ()=>{
    return (setvisble(!visible));
}

const handleUserAction = ()=>{
  return  setuseraction(!useraction);
};
   
const logoutProcess = ()=>{
   const confirmed =window.confirm("Are you need to log out ?");

   if (confirmed)
   {
     localStorage.removeItem('token');
     dispatch(removeInfo());
     redirect('/login');
   }
   
}

     return (
      <div className="header-2 shadow-md fixed top-0 left-0 right-0 z-10">

      <nav className="bg-white py-2 md:py-4">
        <div className="container px-4 mx-auto md:flex md:items-center">
    
          <div className="flex justify-between items-center">
             <Link to="/" className="w-20 ml-10">
                <img src={logo} alt="logo_image" className="h-full"/>
             </Link>
            <button onClick={handleNavbar} className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
              <i className="fas fa-bars"></i>
            </button>
          </div>
    
          <div className={`${visible ? 'flex' :'hidden'} md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0`} id="navbar-collapse">
            <Link to="/" className="pt-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600 uppercase">Home</Link>
            <Link to="/menu" className=" font-medium p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 capitalize">menu</Link>
            <Link to="/about" className="font-medium p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 capitalize">about</Link>
            <Link  to="/contact" className="font-medium p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 capitalize">contact</Link>
            <Link to="/shop" className="relative font-medium p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">
            <FaShoppingCart class="w-7 h-full"/>
            <h2 className="absolute bg-red-600 text-white w-6 h-6 rounded-full bottom-7 right-0.5">{cart.Allcount}</h2>
            </Link>
            {
                userInfo.avatar ? 
                 <div onClick={handleUserAction} className="flex flex-col justify-center h-[50px] cursor-pointer p-2 lg:px-4 md:mx-2 text-center">
                   <img className="w-[80px] h-full" src ={userInfo.avatar} alt="user_avatar"/>
                   <h4 className="font-bold capitalize">{userInfo.firstName}</h4>
                 </div>
                :<div onClick={handleUserAction} className="cursor-pointer p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                  <FaUserCircle class="w-7 h-full"/>
                 </div>
              }
            
            {
              useraction &&
              <div onClick={handleUserAction} className="bg-white shadow-md p-2 rounded-sm md:absolute right-5 top-16 md:w-36">
                  <Link to="/login" className={`${visibleLogoutBtn()?'hidden':''} block cursor-pointer hover:bg-gray-300 p-1`}>Login</Link>
                  <Link to="/dashboard" className={`${visibleLogoutBtn()?'':'hidden'} block cursor-pointer hover:bg-gray-300 p-1`}>Dashboard</Link>
                  <Link to="/user/newProduct" className=" block w-full cursor-pointer hover:bg-gray-300 p-1">new product</Link>
                  <h4 onClick={logoutProcess} className={`${visibleLogoutBtn()?'':'hidden'} bg-red-400 text-white py-1 px-2 block cursor-pointer hover:bg-red-600 p-1`}>Logout</h4>
              </div>
            }
          </div>
        </div>
      </nav>
      </div>
     );
}

export default Header;