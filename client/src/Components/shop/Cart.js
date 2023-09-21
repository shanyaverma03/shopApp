import axios from "axios";
import { useEffect, useState } from "react";

import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get("/cart");
        console.log(response.data);
        setCart(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getCart();
  }, []);

  return (
    <div>
      {cart.map((product) => (
        <CartItem
          key={product._id}
          title={product.title}
          quantity={product.quantity}
        />
      ))}
      <button>Order Now!</button>
    </div>
  );
};

export default Cart;
