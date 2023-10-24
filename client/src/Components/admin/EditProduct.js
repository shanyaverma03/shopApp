import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../store/auth-context";
import classes from "./Product.module.css";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const fetchProductDetailToEdit = async () => {
        try {
          const url = `/product/${productId}`;
          const token = localStorage.getItem("token");
          const response = await axios.get(url, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          console.log(response);
          const title = response.data.title;
          const description = response.data.description;
          const price = response.data.price;
          const image = response.data.image;

          setTitle(title);
          setDescription(description);
          setImage(image);
          setPrice(price);
        } catch (err) {
          window.alert("Not able to authenticate");
          console.log(err);
        }
      };

      fetchProductDetailToEdit();
    }
  }, [productId.isLoggedIn, isLoggedIn, navigate, productId]);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const imageChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log(title);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/product/${productId}`,
        {
          title,
          description,
          image,
          price,
          productId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response);
      if (response.data === "Product updated") {
        navigate("/admin/products");
      } else {
        window.alert(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} encType="multipart/form-data">
      <div className={classes.container}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={titleChangeHandler}
          name="title"
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={descriptionChangeHandler}
          name="description"
        />
        <label>Image:</label>
        <input type="file" onChange={imageChangeHandler} name="image" />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={priceChangeHandler}
          name="price"
        />
        <button type="Submit">Update Product</button>
      </div>
    </form>
  );
};

export default EditProduct;
