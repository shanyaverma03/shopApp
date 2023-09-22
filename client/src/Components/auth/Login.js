import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.get("/login");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    login();
  }, []);

  return (
    <>
      <h1>Login</h1>
    </>
  );
};

export default Login;
