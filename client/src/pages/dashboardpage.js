import Header from "../components/header/header";
import Acount from "../components/userDashboard/acountcomp";
import { Allproducts } from "../components/userDashboard/allproducts";
import DashBoardNav from "../components/userDashboard/controllcomp";
import { Outlet} from "react-router-dom";

const DashBoard = ()=>{
     
    return (
        <>
           <Header/>
          <div className="w-full h-full mt-[140px] flex flex-col gap-16 justify-center items-center rounded-md drop-shadow-lg">
              <h2 className="text-center capitalize font-bold text-lg">welcome my user 💝 in your DashBoard</h2>
              <div className="w-[90vw] flex bg-white p-5">
                   <DashBoardNav/> 
                <div className="w-[80vw] px-5 sm:w-[100]">
                       <h3>render your component here my dear 💗</h3>
                </div>
              </div>
           </div>
           <Outlet/>
        </>
    )
}

export default DashBoard;