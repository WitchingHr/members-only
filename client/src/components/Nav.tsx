import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Navbar component
const Nav: FC = () => {
	const { auth, setAuth } = useContext(UserContext);

	const handleLogout = () => {
		// Remove token from local storage
		localStorage.removeItem("token");
		// Set auth to false
		setAuth({
			isAuth: false,
			username: null,
		});
	};

	return (
		<nav className="section-container">
			<div className="flex">
				<div className="mr-auto">
					<Link to="/">
						<h1 className="text-2xl">
							Members
							<span className="font-bold text-indigo-600 dark:text-indigo-500">
								Only
							</span>
						</h1>
					</Link>
				</div>
				<div>
					{auth.isAuth === false ? (
						// Login button
						<Link to="/login">
							<button className="button px-5">Log in</button>
						</Link>
					) : (
						// Logout button
						<button
							onClick={handleLogout}
							className="button px-5 hover:bg-indigo-800"
						>
							Log out
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
