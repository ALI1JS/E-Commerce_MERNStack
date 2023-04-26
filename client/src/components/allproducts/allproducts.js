import {useRef, useState } from "react";
import {CiForkAndKnife} from "react-icons/ci";
import {GiForkKnifeSpoon} from "react-icons/gi"
import { useSelector} from "react-redux";
import FeaturCard from "../home/productFeaturecard";




const AllProducts = ({heading})=>{
    
    const AllproductRef=  useRef();
    const products = useSelector(state=>state.productState.products);
    const [filteredProduct, setfilterProducte] = useState(products);
    const listofCatogery =  [...new Set(products.map(ele=>ele.catogery))];

    const filterP = (filtered)=>{
        if (filtered === "ALL")
           setfilterProducte(products);
        else
          setfilterProducte(products.filter((item)=>item.catogery === filtered ));
    }
     
   const nextSlide = ()=>{
    AllproductRef.current.scrollTop +=840;
  } 

  const previousSlide = ()=>{
    AllproductRef.current.scrollTop -=840;
  }

    return (
        <div className="w-full min-h-full mt-20">
                    <div>
                        <h2 className="font-bold capitalize text-4xl ml-10"> {heading}</h2>
                    </div>

                    <div className="w-full flex justify-center gap-2 overflow-scroll scrollbar-none transition-all scroll-smooth">
                         {
                            listofCatogery.length>0 ?
                            <>
                               <div className="flex flex-col justify-center items-center gap-3 max-w-[100px]">
                                     <GiForkKnifeSpoon onClick={()=> filterP("ALL")} className="hover:shadow-lg text-xl bg-yellow-500 w-16 h-16 rounded-full px-3 cursor-pointer"/>
                                     <p className="font-bold">ALL</p>
                                  </div>
                                  
                               {
                               listofCatogery.map(item =>(
                                      <div className="flex flex-col justify-center items-center gap-3 max-w-[100px]">
                                     <GiForkKnifeSpoon onClick={()=> filterP(item)} className="hover:shadow-lg text-xl bg-yellow-500 w-16 h-16 rounded-full px-3 cursor-pointer"/>
                                     <p className="font-bold">{item}</p>
                                  </div>
                               ))
                                }
                               </>
                            :
                            <div className="flex flex-col gap-1">
                            <CiForkAndKnife class="bg-yellow-500 rounded-full p-4"/>
                            <p>no catogery</p>
                            </div>
                         }
                    </div>
                     
                     <div ref={AllproductRef} className="scroll-smooth transition-all w-full h-[840px] overflow-scroll scrollbar-none mt-16 flex flex-wrap justify-center items-center gap-5">

                        {
                           filteredProduct.map(ele=>(
                            <FeaturCard name={ele.title} image={ele.image} price={ele.price} catogery={ele.catogery} id={ele._id}/>
                           ))
                        }
                     </div>
                     <div className="flex justify-center gap-3 mt-10">

                        {
                            filteredProduct.length > 15 ?
                            <>
                                  <button onClick={previousSlide} className="bg-yellow-400 rounded hover:drop-shadow-lg px-5 py-2 text-center capitalize font-bold">previous</button>
                                  <button onClick={nextSlide} className="bg-yellow-400 px-5 rounded hover:drop-shadow-lg py-2 text-center capitalize font-bold">next</button>
                            </>
                            :
                            <>
                                 <button disabled onClick={previousSlide} className=" bg-gray-300 rounded px-5 py-2 text-center capitalize font-bold cursor-not-allowed">previous</button>
                                <button disabled onClick={nextSlide} className="bg-gray-300 px-5 rounded py-2 text-center capitalize font-bold cursor-not-allowed">next</button>
                            </>
                        }   

                              

                     </div>

              </div>
    )
}

export default AllProducts;