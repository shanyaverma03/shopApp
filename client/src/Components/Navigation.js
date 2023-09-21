import { Link } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={classes.navigation}>
      <Link to="/">Shop</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/admin/add-product">Add Product</Link>
      <Link to="/admin/products">Admin Products</Link>
    </header>
  );
};

export default Navigation;
