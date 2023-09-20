import axios from "axios";
import { useEffect } from "react";

const Products = () => {
  useEffect(() => {
    const fetchAllProducts = async () => {
      const products = await axios.get("/products");
      console.log(products);
    };

    fetchAllProducts();
  }, []);

  return <h1>These are my products</h1>;
};

export default Products;
