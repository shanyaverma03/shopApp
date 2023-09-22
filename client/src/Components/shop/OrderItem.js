import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <div>Order= # {props.id}</div>
        {props.items.map((product) => (
          <div key={product._id}>
            {product.title} ({product.quantity})
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
