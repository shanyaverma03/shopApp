import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import AuthContext from "../../store/auth-context";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const token = localStorage.getItem("token");
      const getCart = async () => {
        try {
          const response = await axios.get("/cart", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          console.log(response.data);
          setCart(response.data.cart.items);
        } catch (err) {
          console.log(err);
        }
      };

      getCart();
    }
  }, []);

  const orderHandler = () => {
    try {
      //const response = await axios.post("/order");
      //console.log(response);
      navigate("/checkout");
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
            price={product.productId.price}
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
