import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {AppLayout} from "./Components/Layout/AppLayout";
import {Home} from "./Pages/Home";
import {About} from "./Pages/About";
import {Admin} from "./Pages/Admin";
import {Categories} from "./Pages/Categories";
import {Contact} from "./Pages/Contact";
import {Dashboard} from "./Pages/Dashboard";
import {Offers} from "./Pages/Offers";
import {Cart} from "./Components/UI/Cart";
import {QrCode} from "./Pages/QrCode"
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/qr",
        element: <QrCode />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;