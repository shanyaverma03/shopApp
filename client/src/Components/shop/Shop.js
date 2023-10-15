import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Shop.module.css";
import ShopItem from "./ShopItem";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("/products", {
          params: {
            page: currentPage,
          },
        });
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProducts();
  }, [currentPage]);

  return (
    <>
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
              showDetailsButton={true}
            />
          ))}
      </div>
      <section className={classes.pagination}>
        <Link
          to="/?page=1"
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          1
        </Link>
        <Link
          to="/?page=2"
          onClick={() => {
            setCurrentPage(2);
          }}
        >
          2
        </Link>
      </section>
    </>
  );
};

export default Products;
