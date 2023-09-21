import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <p>{props.title}</p>
        <p>Quantity: {props.quantity}</p>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default CartItem;
