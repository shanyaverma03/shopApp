import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get("/cart");
        console.log(response.data);
        setCart(response.data.cart.items);
      } catch (err) {
        console.log(err);
      }
    };

    getCart();
  }, []);

  const orderHandler = async () => {
    try {
      const response = await axios.post("/order");
      console.log(response);
      navigate("/orders");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {cart.length > 0 ? (
        cart.map((product) => (
          <CartItem
            key={product._id}
            id={product.productId._id}
            title={product.productId.title}
            quantity={product.quantity}
          />
        ))
      ) : (
        <h1>The cart is empty!</h1>
      )}
      <button onClick={orderHandler}>Order Now!</button>
    </div>
  );
};

export default Cart;
