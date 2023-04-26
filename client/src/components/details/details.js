import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../statemangment/reducers/cartstate";
import {AiOutlineDollar} from "react-icons/ai";
import AllProducts from "../allproducts/allproducts";
import { addProduct } from "../../statemangment/reducers/productstate";

const Details = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const products = useSelector((state) => state.productState.products);

  const productDetails = products.filter((item) => item._id === id);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: token,
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/details", { headers })
      .then((res) => {
        if (!res.data.isAuth) {
          redirect("/login");
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  const dispatch = useDispatch();

  const addtocart = () => {
    dispatch(addToCart({id}));
  };
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center pb-10">
      <div className="mt-24 w-[80vw] h-[80vh] flex flex-col md:flex-row lg:flex-row gap-2 justify-between rounded py-2 px-6  min-w-[230px] bg-white drop-shadow-lg hover:shadow-xl cursor-pointer">
      <div className="overflow-hidden md:w-[60%] lg:w-[60%] xl:w-[60%] w-[100%]">
      <img
            className=" h-full w-full hover:scale-125 transition-all"
            src={productDetails[0].image}
            alt="product_image"
            draggable="false"
          />
      </div>
        <div className="flex flex-col gap-2 md:w-[35%] lg:w-[35%] xl:w-[35%] w-[100%]">
          
          <p className="font-bold">{productDetails[0].title}</p>
          <span className="font-bold">{productDetails[0].catogery}</span>
          <span className="flex items-center"> {productDetails[0].price} <AiOutlineDollar className="text-lg"/></span>

         <div className="flex gap-1">
         <button
          onClick={addtocart}
          className="bg-yellow-500 rounded w-44 px-6 py-1 capitalize font-bold text-center"
        >
          {" "}
          add to card
        </button>
        <button
          className="bg-yellow-500 rounded w-44 px-6 py-1 capitalize font-bold text-center"
        >
          {" "}
          Buy
        </button>
         </div>
         <p> Description:{productDetails[0].description}</p>
        </div>
        
      </div>

      {/* RELATED PRODUCTS */}
      <AllProducts heading="Related products"/>
    </div>
  );
};

export default Details;
