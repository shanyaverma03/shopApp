import axios from "axios";

import classes from "./Login.module.css";

const Login = () => {
  return (
    <form>
      <div className={classes.container}>
        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          required
        ></input>

        <label for="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        ></input>

        <button>Login</button>
      </div>
    </form>
  );
};

export default Login;
