import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../store/auth-context";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const fetchProductDetailToEdit = async () => {
        const url = `/product/${productId}`;
        const response = await axios.get(url);
        console.log(response);
        console.log(productId);
        const title = response.data.title;
        const description = response.data.description;
        const price = response.data.price;
        const image = response.data.image;

        setTitle(title);
        setDescription(description);
        setImage(image);
        setPrice(price);
      };

      fetchProductDetailToEdit();
    }
  }, [productId.isLoggedIn]);

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
    try {
      console.log(title);
      const response = await axios.put(`/product/${productId}`, {
        title,
        description,
        image,
        price,
        productId,
      });

      console.log(response);
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>
        Title:
        <input type="text" value={title} onChange={titleChangeHandler} />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={descriptionChangeHandler}
        />
      </label>
      <label>
        Image:
        <input type="text" value={image} onChange={imageChangeHandler} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={priceChangeHandler} />
      </label>
      <button type="Submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
