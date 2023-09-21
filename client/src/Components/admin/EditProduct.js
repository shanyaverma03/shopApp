import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { productId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProductDetailToEdit = async () => {
      const url = `/product/${productId}`;
      const response = await axios.get(url);
      console.log(response);
      console.log(productId);
      const id = response.data._id;
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
  }, [productId]);

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

  const onSubmitHandler = () => {};

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
