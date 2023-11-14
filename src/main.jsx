import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./views/App.jsx";
import "./assets/styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLink } from "./router/applink.js";
import Register from "./views/Register/index.jsx";
import ErrorPage from "./components/Erro.jsx";
import VerifyOtp from "./views/Register/VerifyOtp.jsx";
import ResendOtp from "./views/Register/ResendOtp.jsx";
import AddPassword from "./views/Register/AddPassword.jsx";
import DashBoard from "./views/dashboard/DashBoard.jsx";
import Login from "./views/Login/index.jsx";
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <div>
  //       <h1>Hello World</h1>
  //       <Link to="about">About Us</Link>
  //     </div>
  //   ),
  // },
  {
    path: "/",
    element: <div>Welcome to my app</div>,
    errorElement: <ErrorPage />,
  },

  {
    path: AppLink.signup.path,
    element: <Register />,
  },
  {
    path: AppLink.verify_otp.path,
    element: <VerifyOtp />,
  },
  {
    path: AppLink.resend_otp.path,
    element: <ResendOtp />,
  },
  {
    path: AppLink.add_password.path,
    element: <AddPassword />,
  },
  {
    path: AppLink.dashboard.path,
    element: <DashBoard />,
  },
  {
    path: AppLink.login.path,
    element: <Login />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
