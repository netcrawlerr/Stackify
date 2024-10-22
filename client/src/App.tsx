import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import AddProduct from "./pages/AddProduct";
import ProductListing from "./pages/ProductListing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "edit",
        element: <ProductListing />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
