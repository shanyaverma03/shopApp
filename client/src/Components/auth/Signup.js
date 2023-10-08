import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../store/auth-context";
import classes from "./Auth.module.css";

const Signup = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/signup");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={classes.container}>
        <label>
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          required
        ></input>

        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        ></input>
        <label>
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        ></input>

        <button>Signup</button>
      </div>
    </form>
  );
};

export default Signup;
