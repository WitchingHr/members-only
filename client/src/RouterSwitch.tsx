import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components to render as routes
import App from "./pages/App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// RouterSwitch component
const RouterSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSwitch;
