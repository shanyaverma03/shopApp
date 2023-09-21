import axios from "axios";
import { useEffect } from "react";

const Cart = () => {
  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get("/cart");
        console.log(response.data.items);
      } catch (err) {
        console.log(err);
      }
    };

    getCart();
  }, []);

  return <h1>Cart</h1>;
};

export default Cart;
