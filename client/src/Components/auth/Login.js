import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Auth.module.css";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        enteredPassword: password,
      });
      console.log(response.data);
      if (response.data === true) {
        console.log("response data is true");
        sessionStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        navigate("/");
      }
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
          onChange={emailChangeHandler}
        ></input>

        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={passwordChangeHandler}
        ></input>

        <button>Login</button>
      </div>
    </form>
  );
};

export default Login;
