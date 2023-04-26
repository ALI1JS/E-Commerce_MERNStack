import card1 from "../../assets/apple.jfif";


const ProductCard = (props)=>{
    return (
        <div className=" capitalize w-40 drop-shadow-md shadow-md bg-white rounded-md flex flex-col gap-1">
           <img className="w-full h-2/4" src={props.image} alt="apple_image"/>
           <h3 className="px-2 font-bold">{props.name}</h3>
           <div className="px-2 font-bold flex justify-between">
              <span>{props.catogery}</span>
              <span>{props.price}</span>
           </div>
        </div>
    )
}

export default ProductCard;