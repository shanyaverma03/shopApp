import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";

const RootLayout = () => {
  return (
    <>
      <Navigation />
      <h1>Layout</h1>
      <Outlet />
    </>
  );
};

export default RootLayout;

//Outlet marks the place where the child router elements will be rendered to
