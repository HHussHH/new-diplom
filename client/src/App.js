import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Main";
import Navbar from "./components/Navbar/Navbar";
import "./style.scss";
import FAQ from "./components/FAQ/FAQ";
import AddLink from "./components/AddLink/AddLink";
import AllLinksPage from "./pages/AllLinksPage";
import PageNotFound from "./pages/PageNotFound";
import ModalWindow from "./components/LastMessage/ModalWindow";
import LastMessage from "./components/LastMessage/LastMessage";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />

      {/* Модальные окна =====================*/}
      <ModalWindow>
        <LastMessage />
      </ModalWindow>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/MyLinks",
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
        path: "/",
        element: <AllLinksPage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
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
