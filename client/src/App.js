import { RouterProvider, createBrowserRouter } from "react-router-dom"; //helps us to define the routes that we want to support in this app
import RootLayout from "./pages/RootLayout";
import AddProductPage from "./pages/AddProductPage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import EditProductPage from "./pages/EditProductPage";
import CartPage from "./pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <ShopPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/admin/add-product", element: <AddProductPage /> },
      { path: "/product/:productId", element: <ProductDetailsPage /> },
      { path: "/admin/products", element: <AdminProductsPage /> },
      { path: "/admin/edit-product/:productId", element: <EditProductPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

//call this function and pass the array of route definition objects
//path- define the path for which this route will be active
//the value passed to the router prop should be the router created by using the above function
