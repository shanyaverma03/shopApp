import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login");
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
