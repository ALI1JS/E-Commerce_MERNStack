import {Link} from "react-router-dom";
import { useState } from "react";


const DashBoardNav = ()=>{
  const [acoutnToggle,setAcountToggle] = useState(false);
  const [productToggle,setProductToggle] = useState(false);
  const [shopToggle,setShopToggle] = useState(false);

    const acountTogglefun = ()=>{
        setAcountToggle(!acoutnToggle);
        setProductToggle(false);
        setShopToggle(false);
    }
    const productTogglefun = ()=>{
        setProductToggle(!productToggle);
        setAcountToggle(false);
        setShopToggle(false);
    }
    const shoptogglefun = ()=>{
        setShopToggle(!shopToggle);
        setProductToggle(false);
        setAcountToggle(false);
    }

    return (
         <div className="w-[20vw] min-h-[50vh] bg-white py-2 px-2 flex flex-col gap-3 border-r-4">
                  

                  <div className="w-full min-h-6 cursor-pointer flex flex-col gap-3" onClick={acountTogglefun}>
                   <Link to='user/acount' className="font-bold text-lg">Your Acount</Link>
                   <div className={`${acoutnToggle ? '' : 'hidden'} shadow-lg p-5 flex flex-col drop-shadow-lg gap-2`}>
                       <Link className="font-bold capitalize text-md text-blue-600" to="user/update">update</Link>
                       <Link className="font-bold capitalize text-md text-blue-600" to="user/delete">delete</Link>
                    </div>  
                 </div>

                 <div className="w-full min-h-6 cursor-pointer flex flex-col" onClick={productTogglefun}>
                   <Link className="font-bold text-lg">Your Products</Link>
                   <div className={`${productToggle ? '' : 'hidden'} shadow-lg p-5 flex flex-col drop-shadow-lg gap-2`}>
                       <Link className="font-bold capitalize text-md text-blue-600" to="user/update">show your products</Link>
                       <Link className="font-bold capitalize text-md text-blue-600" to="user/delete">update Product</Link>
                       <Link className="font-bold capitalize text-md text-blue-600" to="user/delete">delete Product</Link>
                    </div>  
                   </div>
   
                   <div className="w-full min-h-6 cursor-pointer flex flex-col" onClick={shoptogglefun}>
                   <Link className="font-bold text-lg">Your shop</Link>
                   <div className={`${shopToggle ? '' : 'hidden'} shadow-lg p-5 flex flex-col drop-shadow-lg gap-2`}>
                       <Link className="font-bold capitalize text-md text-blue-600" to="user/update">buys</Link>
                       <Link className="font-bold capitalize text-md text-blue-600" to="user/delete">favourite</Link>
                    </div>  
                   </div>

            
         </div> 
    );
}


export default DashBoardNav;