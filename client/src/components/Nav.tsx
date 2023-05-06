import React, { FC } from "react";
import { Link } from "react-router-dom";

// Navbar component
const Nav: FC = () => {
  return (
    <nav className="section-container">
      <div className="flex">
        <div className="flex-1">
          <Link to="/">
            <h1 className="text-2xl">Members<span className="font-bold text-indigo-600">Only</span></h1>
          </Link>
        </div>
        <div>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
