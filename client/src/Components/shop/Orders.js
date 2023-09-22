import axios from "axios";
import { useEffect } from "react";

const Orders = () => {
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("/orders");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
    </div>
  );
};

export default Orders;
