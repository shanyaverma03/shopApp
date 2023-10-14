import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./AddProduct.module.css";
import AuthContext from "../../store/auth-context";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("inside is logged in");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const imageChangeHandler = (event) => {
    setImage(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("submitted");
    try {
      const res = await axios.post("/product", {
        title,
        description,
        image,
        price,
      });
      console.log(res);
      if (res.data === "Product created") {
        setTitle("");
        setDescription("");
        setImage("");
        setPrice(0);
        navigate("/admin/products");
      } else {
        window.alert(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
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
        <input
          type="text"
          value={image}
          onChange={imageChangeHandler}
          name="image"
        />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={priceChangeHandler}
          name="price"
        />
        <button type="Submit">Add Product</button>
      </div>
    </form>
  );
};

export default AddProduct;
