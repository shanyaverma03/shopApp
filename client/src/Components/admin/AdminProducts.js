import { useEffect, useState } from "react";
import axios from "axios";

import AdminProductItem from "./AdminProductItem";
import classes from "./AdminProducts.module.css";

const AdminProducts = () => {
  const [adminProducts, setAdminProducts] = useState([]);

  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const response = await axios.get("/admin/products");
        console.log(response.data);
        setAdminProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAdminProducts();
  }, []);

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
