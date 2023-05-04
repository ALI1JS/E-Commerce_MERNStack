import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeProduct } from "../../statemangment/reducers/cartstate";
import { AiOutlinePlus } from "react-icons/ai";
import {toast} from "react-hot-toast"
import axios from "axios";

const Cart = () => {
  const products = useSelector((state) => state.productState.products);
  const shoppingCount = useSelector((state) => state.cart);
  const promoCodes = useSelector((state) => state.Codes);


  const [shoppingProduct, setShoppingProduct] = useState([]);
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const counterRef = useRef();
  const codeRef = useRef();
  const [total, setTotal] = useState(0);
  
  useEffect(()=>{
      (()=>{
        const newShoppingProduct = shoppingCount.products.map((item) => {
            const pro = products.filter((ele) => ele._id === item.id);
           return {product:pro[0],counter:item.counter};
          });
          setShoppingProduct(newShoppingProduct);
        })()
    },[shoppingCount]);

    const Total = ()=>{
      let total = 0
       shoppingProduct.map((ele)=>{
            total += ele.counter * ele.product.price;
       })
       return (total);
    }
    
    const checkout = ()=>
    {
      axios.post("api/payment")
    }

    const Remove = (id)=>
    {
      dispatch(removeProduct({id}));
    }

    const Increase = () =>{
        counterRef.current.value++;
    }

    const applyPromoCode = (code)=>{
        promoCodes.map((item)=>{
           if (item.name === code)
           {
             const discound = (item.percentage * Total()) / 100;
              setTotal(Total() - discound);
             toast.success("this Promo code has been applied");
            }
            else
            {
              setTotal(Total());
              toast.error("promo code is not available");
            }
             
        })
    }

    const Checkout = ()=>{
      alert("Do you need to checkout ??????");
       redirect('/checkout');
    }

  return (
    <div className=" pb-10 flex shadow-md w-full min-h-[80vh] container m-auto mt-28 flex-col md:flex-row lg:flex-row xl:flex-row justify-center">

      <div className=" w-full md:w-2/4 lg:w-3/4 xl:w-3/4 2xl:w-3/4 bg-white px-10 py-10 h-full">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">{shoppingCount.Allcount} Items</h2>
        </div>
        <div class="flex mt-10 mb-5">
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
            Product Details
          </h3>
          <h3 class="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
            Quantity
          </h3>
          <h3 class="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
            Price
          </h3>
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
            Total
          </h3>
        </div>

        {
          shoppingProduct === null ? 
          <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div class="flex w-2/5">
              <div class="w-20">
                <img
                  class="h-24"
                  src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                  alt=""
                />
              </div>
              <div class="flex flex-col justify-between ml-4 flex-grow">
                <span class="font-bold text-sm">Iphone 6S</span>
                <span class="text-red-500 text-xs">Apple</span>
                <a
                  href="#"
                  class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                >
                  Remove
                </a>
              </div>
            </div>
            <div class="flex justify-center w-1/5">
              <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>

              <input
                class="mx-2 border text-center w-8"
                type="text"
                value="1"
              />

              <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </div>
            <span class="text-center w-1/5 font-semibold text-sm">$400.00</span>
            <span class="text-center w-1/5 font-semibold text-sm">$400.00</span>
          </div>
           : 
           
            shoppingProduct.map((item)=>(
                <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div class="flex w-2/5">
                  <div class="w-20">
                    <img
                      class="h-24"
                      src={item.product.image}
                      alt="product_image"
                    />
                  </div>
                  <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm">{item.product.title}</span>
                    <span class="text-red-500 text-xs">{item.product.catogery}</span>
                    <a alt= "remove_product" onClick={()=>{Remove(item.product._id)}}
                      className="bg-red-500 p-1 rounded text-center text-sm text-white cursor-pointer"
                    >
                      Remove
                    </a>
                  </div>
                </div>
                <div class="flex justify-center w-1/5">
                  <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
    
                  <input ref={counterRef}
                    class="mx-2 border text-center w-8"
                    type="text"
                    value={item.counter}
                  />
    
                <div className="p-1 bg-blue-600 cursor-pointer" onClick={Increase}>
                <AiOutlinePlus className="text-sm text-while"/>
                </div>
                </div>
                <span class="text-center w-1/5 font-semibold text-sm">{item.product.price}</span>
                <span class="text-center w-1/5 font-semibold text-sm">{item.product.price}</span>
              </div>
            ))
        }

        <Link
          to="/"
          className="flex font-semibold text-indigo-600 text-sm mt-10"
        >
          <svg
            className="fill-current mr-2 text-indigo-600 w-4"
            viewBox="0 0 448 512"
          >
            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
          </svg>
          Continue Shopping
        </Link>
      </div>


      <div
        id="summary"
        className=" w-full md:w-2/4 lg:w-1/4 xl:w-1/4 px-8 py-10 h-full"
      >
        <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">{shoppingCount.Allcount} Items</span>
            <span class="font-semibold text-sm">{Total()} $</span>
        </div>
        <div>
          <label class="font-medium inline-block mb-3 text-sm uppercase">
            Shipping
          </label>
          <select class="block p-2 text-gray-600 w-full text-sm">
            <option> shipping - $10.00</option>
          </select>
        </div>
        <div class="pyStandard-10">
          <label
            for="promo"
            class="font-semibold inline-block mb-3 text-sm uppercase"
          >
            Promo Code
          </label>
          <input ref={codeRef}
            type="text"
            id="promo"
            placeholder="Enter your code"
            class="p-2 text-sm w-full"
          />
        </div>
        <button onClick = {()=>{applyPromoCode(codeRef.current.value)}} class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
          Apply
        </button>
        <div class="border-t mt-8">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>{total === 0 ? Total()+10: total + 10} $</span>
          </div>
          
          <form action="http://localhost:5000/api/payment" method="POST">
          <button class = "bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
            Checkout
          </button>
           </form>
        </div>
      </div>

    </div>
  );
};

export default Cart;
