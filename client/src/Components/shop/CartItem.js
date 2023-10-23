import axios from "axios";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const deleteItemFromCartHandler = async () => {
    try {
      const response = await axios.delete(`/cart/${props.id}`);
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
        <p>Total: {props.quantity * props.price}</p>
      </div>
    </div>
  );
};

export default CartItem;
