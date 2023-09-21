import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./Shop.module.css";
import ShopItem from "./ShopItem";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("/products");
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className={classes.products}>
      {products &&
        products.map((product) => (
          <ShopItem
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

export default Products;
