import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../store/auth-context";
import CheckoutItem from "./CheckoutItem";

const Checkout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const getCart = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("/cart", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const items = response.data.cart.items;
          setCheckout(items);
          console.log("test");
          let total = 0;
          if (items) {
            items.forEach((item) => {
              console.log("inside for each");
              console.log(item.productId.price);
              console.log(item.quantity);
              total += item.productId.price * item.quantity;
            });
            setTotalAmount(total);
          }
        } catch (err) {
          console.log(err);
        }
      };

      getCart();
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {checkout.length > 0 ? (
        checkout.map((product) => (
          <CheckoutItem
            key={product._id}
            id={product.productId._id}
            title={product.productId.title}
            quantity={product.quantity}
            price={product.productId.price}
          />
        ))
      ) : (
        <h1>Nothing to checkout!</h1>
      )}
      <p>Total: {totalAmount}</p>
      <button>Cancel Checkout</button>
      <div>
        <button id="order-btn">Order</button>
      </div>
    </div>
  );
};

export default Checkout;

/*
Wanted to discuss the high level design of ... and the progress made. 
so we were able to establish connectivity with our service now instance by starting the connector. as u know... error.. whitelisting issue

steps :
this is the high level

impact:
event table-account setting. enable event table- there will be an imapct

put it in global- probably the right domain, not sure about the schema. 
impact on rbac- granbting privilegde, what role. issue- fde_dba is elevated and timed- use nonprd_fde_dba.

fde_snowconnector_poc: from share

diag- connection beween sf and servuice now. connewctivity is internet.

names to be changed. 


*/
