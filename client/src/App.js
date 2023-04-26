import {createBrowserRouter,RouterProvider} from "react-router-dom";
import HomeP from "./pages/homepage";
import LoginP from "./pages/loginpage";
import RegisterP from "./pages/registerpage";
import toast, { Toaster } from 'react-hot-toast';
import DetailsPge from "./pages/detailspage";
import {store} from "./statemangment/store";
import { Provider } from "react-redux";
import DashBoard from "./pages/dashboardpage";
import Acount from "./components/userDashboard/acountcomp";
import { Children } from "react";
import NewProductP from "./pages/addproductP.js";
import CartP from "./pages/cartpage";


const routers = createBrowserRouter([
  {
    path:'/',
    element:<HomeP/>
  },
  {
    path:"/about",
    element:<h2>Details page</h2>
  },
  {
    path:"/contact",
    element:<h2>contact page</h2>
  },
  {
    path:'/login',
    element:<LoginP/>
  },
  {
    path:'/register',
    element:<RegisterP/>
  },
  {
    path:"/shop",
    element:<CartP/>
  },
  {
    path:"/api/details/:id",
    element:<DetailsPge/>
  },
  {
    path:"/menu",
    element:<h2> menu page</h2>
  },
  {
    path:"/dashboard",
    element:<DashBoard/>,
  },
  {
    path:"/user/newProduct",
    element:<NewProductP/>
  }
]);

function App() {

  return (
    <Provider store={store}>
       <Toaster/>
       <div className="App min-h-[calc(100vh)] min-w-[calc(100vw)]">
      <RouterProvider router={routers}/>
        </div>
    </Provider>
    
  );
}

export default App;
