import { useState } from "react";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submitted");
    setTitle("");
    setDescription("");
    setImage("");
    setPrice(0);
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
      <button type="Submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
