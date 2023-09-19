import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/shop">Shop</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/admin/add-product">Add Product</Link>
            <Link to="/admin-products">Admin Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
