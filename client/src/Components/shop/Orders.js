import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrderItem from "./OrderItem";
import AuthContext from "../../store/auth-context";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const getOrders = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("/orders", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          console.log(response.data);
          setOrders(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      getOrders();
    }
  }, [isLoggedIn]);

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
