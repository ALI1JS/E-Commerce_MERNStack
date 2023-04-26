import { Link } from "react-router-dom";
import { addToCart } from "../../statemangment/reducers/cartstate";
import { useDispatch } from "react-redux";

const FeaturCard = ({ name, price, catogery, image, id }) => {
  const dispatch = useDispatch();

  const addtocart = () => {
    dispatch(addToCart({id}));
  };
  return (
    <div className="max-w-[200px] min-h-18 flex flex-col gap-1 justify-between rounded py-2 px-6 w-full min-w-[230px] bg-white drop-shadow-lg hover:shadow-xl cursor-pointer">
      <Link to={`/api/details/${id}`} onClick={window.scrollTo({top:"0",behavior:"smooth"})}>
        <div className="flex flex-col gap-1">
          <img className="w-32 h-32" src={image} alt="product_image" />
          <p>{name}</p>
          <span>{catogery}</span>
          <span>{price}</span>
        </div>
      </Link>
      <button
        onClick={addtocart}
        className="bg-yellow-500 rounded w-44 px-6 py-1 capitalize font-bold text-center"
      >
        {" "}
        add to card
      </button>
    </div>
  );
};

export default FeaturCard;
