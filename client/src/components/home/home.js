import {GiDutchBike} from "react-icons/gi";
import { Link } from "react-router-dom";
import ProductCard from "./productcard";
import {useSelector} from 'react-redux';
import {GrPrevious, GrNext} from "react-icons/gr";
import FeaturCard from "./productFeaturecard";
import AllProducts from "../allproducts/allproducts";
import { useRef } from "react";

const Home = () =>{
    const products = useSelector(state=>state.productState.products);
    const fruitsP = products.filter((item)=>item.catogery === "Fruit");
    const lastProducts = products.slice(-4);
    const featureRef =  useRef();

   const nextProduct = ()=>{
       featureRef.current.scrollLeft -= 230;
   } 

   const previousProduct = ()=>{
    featureRef.current.scrollLeft += 250;
   } 

    return (
        <div className="w-full h-full px-5">

            {/* HOME SECTION IN HOME PAGE */}
             <div className="pt-10 flex flex-col sm:flex-row md:flex-row lg:flex-row w-full min-h-[30vh] gap-5 mt-24">
                  <div className="flex flex-col gap-2 xl:w-[45%]">
                      <div className="font-bold bg-teal-600 flex justify-center items-center gap-3 w-40 p-1 rounded-md">
                         <span className=" text-white capitalize">delivery bike</span>
                         <GiDutchBike class="text-3xl"/>
                      </div>

                      <div className="md:text-lg font-bold capitalize ">
                         <h2 className="text-5xl">the fasted delivery in
                          <span className="text-red-600"> your home</span></h2>
                      </div>
                      <div>
                         <p className="font-bold">
                         A food ecommerce website is an online platform that allows customers to purchase food products and have them delivered to their doorstep. The website typically features a wide range of food products, including fresh produce, packaged goods, snacks,
                         </p>
                      </div>
                      <Link className="w-32 bg-red-500 text-white text-center p-2 rounded-md " to="/order">Order now</Link>
                  </div>
                 <div className="flex flex-wrap gap-5 justify-center min-h-[30vh] xl:w-[45%]">
                    {
                        lastProducts.map(item => (
                           <>
                               <ProductCard catogery={item.catogery} name={item.title} image={item.image} price={item.price} />
                           </>
                        ))
                    }
                   
                 </div>
             </div>
              {/* 
                  feature section
             */}
             <div className="w-full flex flex-col mt-16 gap-4">
                 <div className="flex justify-between">
                  <h2 className="capitalize font-bold">fresh Fruits</h2>    
                  <div className="bg-slate-200 p-3 flex gap-2">
                      <button  className="text-xl" onClick={previousProduct}><GrPrevious/></button>
                      <button className="text-xl" onClick={nextProduct}><GrNext/></button>
                  </div>
                </div>    
                <div ref={featureRef} className="w-full flex gap-3 overflow-scroll scrollbar-none scroll-smooth transition-all">
                    {
                        fruitsP.map(item=>(
                            <FeaturCard id={item._id} name={item.title} price={item.price} image={item.image} catogery={item.catogery}/> 
                        ))
                    }
                 </div> 
              </div>

              {/* ALL PRODUCTS  */}
                
              <AllProducts heading="Your Products"/>
        </div>  
    );
}

export default Home;

