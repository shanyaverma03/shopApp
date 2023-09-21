import axios from "axios";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const deleteItemFromCartHandler = async () => {
    try {
      const response = await axios.post("/delete-cart-item", {
        productId: props.id,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <p>{props.title}</p>
        <p>Quantity: {props.quantity}</p>
        <button onClick={deleteItemFromCartHandler}>Delete</button>
      </div>
    </div>
  );
};

export default CartItem;
