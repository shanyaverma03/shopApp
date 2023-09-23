import { RouterProvider, createBrowserRouter } from "react-router-dom"; //helps us to define the routes that we want to support in this app
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import RootLayout from "./pages/RootLayout";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import EditProductPage from "./pages/EditProductPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import AddProductPage from "./pages/AddProductPage";
import AuthContext from "./store/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <ShopPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/orders", element: <OrderPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/admin/add-product", element: <AddProductPage /> },
      { path: "/product/:productId", element: <ProductDetailsPage /> },
      { path: "/admin/products", element: <AdminProductsPage /> },
      { path: "/admin/edit-product/:productId", element: <EditProductPage /> },
    ],
  },
]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInCookie = Cookies.get("loggedIn");
    if (loggedInCookie) {
      setIsLoggedIn(true);
    }
    console.log(loggedInCookie);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <RouterProvider router={router} />;
    </AuthContext.Provider>
  );
}

export default App;

//call this function and pass the array of route definition objects
//path- define the path for which this route will be active
//the value passed to the router prop should be the router created by using the above function
