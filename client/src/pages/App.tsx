import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "../axios";
import Nav from "../components/Nav";

// Home page component
function App() {
  const { auth, setAuth } = useContext(UserContext);

  useEffect(() => {
    const verify = async (token: string) => {
      try {
        // verify token
        const res = await axios.get("http://localhost:3001/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // if token is invalid, throw error
        if (res.status !== 200) {
          throw new Error("Token verification failed");
        }

        // get data from response
        const data = res.data;

        // aet auth state
        setAuth({
          isAuth: true,
          username: data.username,
        });

      } catch (err: any) {
        console.log(err);
        // if token is invalid, set auth state to false
        setAuth({
          isAuth: false,
          username: null,
        });
      }
    };

    // Get token from local storage
    const token = localStorage.getItem("token");

    // If token exists, verify it
    if (token) {
      verify(token);
    }
  }, []);
  
  return (
    <div className="section-container">
      <Nav />
      <main className="section-container relative">
        <h2 className="text-4xl">
          Message Board
        </h2>
        {auth.isAuth && (
          <p className="text-2xl">
            Welcome back, {auth.username}
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
