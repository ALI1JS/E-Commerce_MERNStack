import {RiUploadCloudFill} from "react-icons/ri";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast";
import axios from "axios";
import {addProduct} from "../../statemangment/reducers/productstate";
import { useDispatch } from "react-redux";

const NewProduct = ()=>{
const dispatch = useDispatch();
const [image , setImage] = useState(null);
const [data , setData] = useState({
    title:"",
    catogery:"Fruit",
    image:"",
    price:"",
    amount:"",
    description:""
})


const uploadeImage = (ev)=>{
    const Reader =new FileReader();
    const file = ev.target.files[0];

    // convert image (file to url)
    
    Reader.onload = ()=>{
        setImage(Reader.result);
        setData((prev)=>{
            return (
               {
                ...prev,
                image:Reader.result
               }
            )
        })
    }
    Reader.readAsDataURL(file);
    // console.log(file)
}
// console.log(image);

const formDataHandler = (ev)=>{
  const { name , value} = ev.target;
      
  setData((prev)=>{
      return (
        {
            ...prev,
            [name] : value
        }
      )
  })

    
}

const validation = (ev)=>{
    const {title, price,amount, description, image} = data;
    const msg = {};
     
    if (title === "" ||price === "" ||amount === "" ||description === "" ||image === "")
    {
      msg.msg = "Please Fill the Empty Fields !";
    }

    return msg;
}


const sendDataToServer = (ev)=>{
// PREVENT THE FORM DEFAULT ACTION:
ev.preventDefault();
// BODY => DATA AND TOKEN
const info = {
    data,
    token:localStorage.getItem('token')
}

//     START TO VALIDATION THE DATA FROM THE FORM BEFOR REQUIEST THE SERVER
 const validate = validation();

 if (validate.msg)
 {
    toast(validate.msg);
 }
 else
 {
    axios.post("http://localhost:5000/api/addproduct",info)
    .then((res)=>{
       toast(res.data.msg)
    })
    .catch((err)=>{
         toast.error(err);
    })
 }

 
}

// SEND GET REQUEST FIR SEVER TO SEND ALL PRODUCTS TO STORE IT IN GLOBEL STORE (REDUX);

useEffect(()=>{
     (()=>{
        axios.get('http://localhost:5000/api/products')
       .then((res)=>{
           // store this data
           dispatch(addProduct(res.data));
           
       })
       .catch((err)=>{
          console.log(err.message);
       }) 
     })();
},[])

 return (
     <div className= "w-full h-full flex justify-center">
         <div className="mt-24 w-[35vw] p-3 min-h-full bg-white rounded-md drop-shadow-lg shadow-md">
              <form onSubmit={sendDataToServer} className="w-full h-full flex flex-col gap-2">
                 <div className="w-full">
                     <h3 className="font-medium text-lg capitalize text-center">Add new Product</h3>
                 </div>
                 <div className="w-full flex flex-col">
                     <label for="title">Name</label>
                     <input onChange={formDataHandler} type="text" id="title" name="title" className="bg-gray-300 outline-none px-1"/>
                 </div>
                 <div className="w-full flex flex-col">
                    <label className="" for="catogery">Catogery</label>
                    <select onChange={formDataHandler} name="catogery" className="bg-gray-300 hover:bg-gray-200 outline-none" id="catogery">
                        <option>Fruit</option>
                        <option>Vegeables</option>
                        <option>Rice</option>
                        <option>Sweet</option>
                        <option>Burger</option>
                        <option>Checken</option>
                    </select>
                 </div>

                 <div className="relative w-full flex flex-col">
                     <label for="image">Image</label>
                    <label for="image" className="w-full h-40 bg-gray-300">
    
                         <input onChange={uploadeImage} className="hidden" type="file" accept="image/*" id="image"/>
                        {
                            image ?<img className="w-full h-full" src={image} alt="product_image"/>
                            :
                            <RiUploadCloudFill className="absolute top-20 left-48 text-6xl cursor-pointer"/>
                        }
                    </label>
                    
                 </div>
                 <div className="flex flex-col">
                     <label for="price">Price</label>
                     <input onChange={formDataHandler} name="price" type="text" id="price" className="bg-gray-300 outline-none px-1"/>
                 </div>

                 <div className="flex flex-col">
                     <label for="amount">Amount</label>
                     <input onChange={formDataHandler} name="amount" type="text" id="amount" className="bg-gray-300 outline-none px-1"/>
                 </div>

                 <div className="flex flex-col">
                     <label for="description">Description</label>
                     <textarea onChange={formDataHandler} name="description" id="description" className="bg-gray-300 outline-none px-1 resize-none" rows={`3`}></textarea>
                 </div>
                <div className="flex justify-center">
                <input type= "submit" value="Add" className="rounded-sm bg-blue-500 hover:bg-blue-600 text-white text-center w-24 cursor-pointer px-2 py-1"/>
                </div>
              </form>
         </div>
     </div>
 )

}

export default NewProduct;