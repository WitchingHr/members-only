import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// components
import Nav from "../components/Nav";
import UserForm from "../components/UserForm";

// types
import { FormData } from "../components/UserForm";

// Home page component
function Login() {

  const login = (data: FormData) => {
    axios.post("/login", data);
  };

  return (
    <div className="section-container">
      <Nav />
      <main className="section-container">
        <h2 className="text-4xl">Log in</h2>
        <UserForm action={login} />
        <div className="mt-8">
          <span>Don't have an account? </span>
          <Link to="/signup" className="font-medium text-indigo-600">Create one now.</Link>
        </div>
      </main>
    </div>
  );
}

export default Login;
