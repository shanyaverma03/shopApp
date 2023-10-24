import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import classes from "./ShopItem.module.css";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const ShopItem = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const redirectToProductPage = () => {
    console.log("in redirect", props.id);
    navigate(`/product/${props.id}`);
  };

  const addToCartHandler = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.post(
      "/cart",
      {
        productId: props.id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response);
    navigate("/cart");
  };

  return (
    <div className={classes.card}>
      <img src={props.image} alt={props.description}></img>
      <div className={classes.container}>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <div className={classes.actions}>
          {props.showDetailsButton && (
            <button onClick={redirectToProductPage}>Details</button>
          )}
          {isLoggedIn && (
            <button onClick={addToCartHandler}>Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
