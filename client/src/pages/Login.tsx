import React from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

// components
import Nav from "../components/Nav";
import UserForm from "../components/UserForm";

// types
import { FormData } from "../components/UserForm";

// Home page component
function Login() {
  const { setAuth } = React.useContext(UserContext);

  const login = async (data: FormData) => {
    try {
      // send credentials to server
      const res = await axios.post("http://localhost:3001/login", data);

      // if valid credentials, set auth state
      setAuth({
        isAuth: true,
        username: res.data.username,
      });
      
      // save token to local storage
      localStorage.setItem("token", res.data.token);
      
      // toast login success
      toast.success('Logged in successfully', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
      // redirect to home page
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (err: any) {
      // toast error
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }
  };

  return (
    <div className="section-container">
      <Nav />
      <main className="section-container">
        <h2 className="text-4xl">Log in</h2>

        {/* Login Form */}
        <UserForm action={login} button="Log in" />
        
        {/* Sign up link */}
        <div className="mt-8">
          <span>Don't have an account? </span>
          <Link to="/signup" className="font-medium text-indigo-600">Create one now.</Link>
        </div>
      </main>
    </div>
  );
}

export default Login;
