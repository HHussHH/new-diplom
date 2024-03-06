import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Main";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./style.scss";
import FAQ from "./components/FAQ/FAQ";
import AddLink from "./components/AddLink/AddLink";
import OwnLinks from "./components/Links/AllLinks";
import AllLinksPage from "./pages/AllLinksPage";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/FAQ",
        element: <FAQ />,
      },
      {
        path: "/AddLink",
        element: <AddLink />,
      },
      {
        path: "/AllLinks",
        element: <AllLinksPage />,
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
