import { useNavigate } from "react-router-dom";

import classes from "./ShopItem.module.css";

const ShopItem = (props) => {
  const navigate = useNavigate();

  const redirectToProductPage = () => {
    console.log("in redirect", props.id);
    navigate(`/product/${props.id}`);
  };

  return (
    <div className={classes.card}>
      <img src={props.image} alt={props.description}></img>
      <div className={classes.container}>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <div className={classes.actions}>
          <button onClick={redirectToProductPage}>Details</button>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
