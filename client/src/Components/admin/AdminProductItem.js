import { useNavigate } from "react-router-dom";

import classes from "./AdminProductItem.module.css";

const AdminProductItem = (props) => {
  const navigate = useNavigate();

  const navToEditProductPage = () => {
    navigate(`/admin/edit-product/${props.id}`);
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
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductItem;
