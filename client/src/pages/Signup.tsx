import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// components
import Nav from "../components/Nav";
import UserForm from "../components/UserForm";

// types
import { FormData } from "../components/UserForm";

// Home page component
function Signup() {

  const [isSignedUp, setIsSignedUp] = useState(false);

  const signup = async (data: FormData) => {
    try {
      const res = await axios.post("http://localhost:3001/signup", data);
      // if successful
      setIsSignedUp(true);
      // toastify
      toast.success('Account created, please log in', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
      // redirect to login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

    } catch (err: any) {
      // if unsuccessful
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 3000,
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
      <main className="section-container relative">
        <h2 className="text-4xl">
          {isSignedUp === false ? "Create an account" : "Welcome to the club!"}
        </h2>
        {isSignedUp === false ? (
          <>
            <UserForm action={signup} />
            <div className="mt-8">
              <span>Already have an account? </span>
              <Link to="/login" className="font-medium text-indigo-600">Log in now.</Link>
            </div>
          </>
        ) : (  
          <p className="mt-16">Redirecting to login page...</p>
        )}
      </main>
    </div>
  );
}

export default Signup;
