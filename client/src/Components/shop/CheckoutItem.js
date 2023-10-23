import classes from "./CartItem.module.css";

const CheckoutItem = (props) => {
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

export default CheckoutItem;
