import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";

import classes from "./Navigation.module.css";
import AuthContext from "../store/auth-context";

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.post("/logout");
      console.log(response);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className={classes.navigation}>
      <div className={classes.pages}>
        <Link to="/">Shop</Link>
        {isLoggedIn && <Link to="/cart">Cart</Link>}
        {isLoggedIn && <Link to="/orders">Orders</Link>}
        {isLoggedIn && <Link to="/admin/add-product">Add Product</Link>}
        {isLoggedIn && <Link to="/admin/products">Admin Products</Link>}
      </div>

      {!isLoggedIn && <Link to="/login">Login</Link>}
      {!isLoggedIn && <Link to="/signup">Signup</Link>}
      {isLoggedIn && <Link onClick={logoutHandler}>Logout</Link>}
    </header>
  );
};

export default Navigation;
