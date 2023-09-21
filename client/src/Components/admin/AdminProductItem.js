import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./AdminProductItem.module.css";

const AdminProductItem = (props) => {
  const navigate = useNavigate();

  const navToEditProductPage = () => {
    navigate(`/admin/edit-product/${props.id}`);
  };

  const deleteProductHandler = async () => {
    try {
      const response = await axios.delete(`/product/${props.id}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.card}>
      <img src={props.image} alt={props.description}></img>
      <div className={classes.container}>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <div className={classes.actions}>
          <button onClick={navToEditProductPage}>Edit</button>
          <button onClick={deleteProductHandler}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductItem;
