import { Link } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={classes.navigation}>
      <Link to="/products">Products</Link>
      <Link to="/admin/add-product">Add Product</Link>
    </header>
  );
};

export default Navigation;
