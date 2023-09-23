import axios from "axios";

import classes from "./Login.module.css";

const Login = () => {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login");
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

        <button>Login</button>
      </div>
    </form>
  );
};

export default Login;
