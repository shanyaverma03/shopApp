import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./AddProduct.module.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

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

      setTitle("");
      setDescription("");
      setImage("");
      setPrice(0);
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className={classes.container}>
        <label>Title:</label>
        <input type="text" value={title} onChange={titleChangeHandler} />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={descriptionChangeHandler}
        />
        <label>Image:</label>
        <input type="text" value={image} onChange={imageChangeHandler} />
        <label>Price:</label>
        <input type="number" value={price} onChange={priceChangeHandler} />
        <button type="Submit">Add Product</button>
      </div>
    </form>
  );
};

export default AddProduct;
