import axios from "axios";
import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("/orders");
        console.log(response.data);
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order) => (
        <OrderItem key={order._id} id={order._id} items={order.products} />
      ))}
    </div>
  );
};

export default Orders;
