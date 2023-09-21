import classes from "./AdminProductItem.module.css";

const AdminProductItem = (props) => {
  return (
    <div className={classes.card}>
      <img src={props.image} alt={props.description}></img>
      <div className={classes.container}>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <div className={classes.actions}>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductItem;
