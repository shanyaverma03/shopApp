import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../store/auth-context";
import classes from "./Auth.module.css";

const Signup = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/signup", {
        email,
        password,
        confirmPassword,
      });
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
          onChange={onEmailChangeHandler}
          value={email}
        ></input>

        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={onPasswordChangeHandler}
          value={password}
        ></input>
        <label>
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={onConfirmPasswordChangeHandler}
          value={confirmPassword}
        ></input>

        <button>Signup</button>
      </div>
    </form>
  );
};

export default Signup;
