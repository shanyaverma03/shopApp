import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminProductItem from "./AdminProductItem";
import classes from "./AdminProducts.module.css";
import AuthContext from "../../store/auth-context";

const AdminProducts = () => {
  const [adminProducts, setAdminProducts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("/products");
          console.log(response.data);
          setAdminProducts(response.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchProducts();
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.products}>
      {adminProducts &&
        adminProducts.length > 0 &&
        adminProducts.map((product) => (
          <AdminProductItem
            key={product._id}
            id={product._id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
          />
        ))}
    </div>
  );
};

export default AdminProducts;
