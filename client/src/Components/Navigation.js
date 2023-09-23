import { Link } from "react-router-dom";
import { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../store/auth-context";

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
    <header className={classes.navigation}>
      <div className={classes.pages}>
        <Link to="/">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        {ctx.isLoggedIn && <Link to="/admin/add-product">Add Product</Link>}
        {ctx.isLoggedIn && <Link to="/admin/products">Admin Products</Link>}
      </div>

      <Link to="/login">Login</Link>
    </header>
  );
};

export default Navigation;
