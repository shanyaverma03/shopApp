import { Link, useNavigate } from "react-router-dom";

import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  const navigate = useNavigate();
  const getInvoiceHandler = async () => {
    try {
      navigate(`/orders/${props.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <div>Order= # {props.id}</div>
        {props.items.map((product) => (
          <div key={product._id}>
            {product.product.title} ({product.quantity})
          </div>
        ))}
        <Link onClick={getInvoiceHandler}>Invoice</Link>
      </div>
    </div>
  );
};

export default OrderItem;
