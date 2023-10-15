import { RouterProvider, createBrowserRouter } from "react-router-dom"; //helps us to define the routes that we want to support in this app
import { useState, useEffect, useContext } from "react";
import AuthContext from "./store/auth-context";

import RootLayout from "./pages/RootLayout";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import EditProductPage from "./pages/EditProductPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import AddProductPage from "./pages/AddProductPage";
import SignupPage from "./pages/SignupPage";
import InvoicePage from "./pages/InvoicePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <ShopPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/orders", element: <OrderPage /> },
      { path: "/orders/:orderId", element: <InvoicePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
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
    const loggedInFromSession = sessionStorage.getItem("isLoggedIn");
    console.log(loggedInFromSession);
    if (loggedInFromSession === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <RouterProvider router={router} />;
    </AuthContext.Provider>
  );
}

export default App;

//call this function and pass the array of route definition objects
//path- define the path for which this route will be active
//the value passed to the router prop should be the router created by using the above function
