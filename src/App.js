import { RouterProvider, createBrowserRouter } from "react-router-dom"; //helps us to define the routes that we want to support in this app

import HomePage from "./pages/HomePage";

const router = createBrowserRouter([{ path: "/", element: <HomePage /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

//call this function and pass the array of route definition objects
//path- define the path for which this route will be active
//the value passed to the router prop should be the router created by using the above function
