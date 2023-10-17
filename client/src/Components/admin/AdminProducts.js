import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import AdminProductItem from "./AdminProductItem";
import classes from "./AdminProducts.module.css";
import AuthContext from "../../store/auth-context";

const AdminProducts = () => {
  const [adminProducts, setAdminProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteProductHandler = async (id) => {
    try {
      const response = await axios.delete(`/product/${id}`);
      const updatedResponse = await axios.get("/products", {
        params: {
          page: currentPage,
        },
      });

      setAdminProducts(updatedResponse.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("/products", {
            params: {
              page: currentPage,
            },
          });
          console.log(response.data.products);
          setAdminProducts(response.data.products);
        } catch (err) {
          console.log(err);
        }
      };

      fetchProducts();
    }
  }, [isLoggedIn, currentPage, navigate, adminProducts]);

  return (
    <>
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
              deleteProductHandler={deleteProductHandler}
            />
          ))}
      </div>
      <section className={classes.pagination}>
        <Link
          to="?page=1"
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          1
        </Link>
        <Link
          to="?page=2"
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

export default AdminProducts;
