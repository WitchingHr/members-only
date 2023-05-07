import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-toastify";

// components
import Nav from "../components/Nav";
import UserForm from "../components/UserForm";

// types
import { FormData } from "../components/UserForm";

// Home page component
function Signup() {
	const [isSignedUp, setIsSignedUp] = useState(false);

	// set page title
	useEffect(() => {
		document.title = "Sign up | MembersOnly";
	}, []);

	// signup function
	const signup = async (data: FormData) => {
		try {
			// send credentials to server
			const res = await axios.post("http://localhost:3001/signup", data);

			// set isSignedUp state
			setIsSignedUp(true);

			// toast signup success
			toast.success(res.data.message, {
				position: "top-center",
				autoClose: 1500,
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
			}, 2000);
		} catch (err: any) {
			const message = err.response.data.message;
			// toast error
			toast.error(message, {
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
			<main className="section-container relative">
				<h2 className="text-4xl">
					{isSignedUp === false ? "Create an account" : "Welcome to the club!"}
				</h2>
				{isSignedUp === false ? (
					<>
						{/* Sign up form */}
						<UserForm action={signup} button="Sign up" />

						{/* Log in link */}
						<div className="mt-8">
							<span>Already have an account? </span>
							<Link to="/login" className="font-medium text-indigo-600">
								Log in now.
							</Link>
						</div>
					</>
				) : (
					// redirect to login page
					<p className="mt-16">Redirecting to login page...</p>
				)}
			</main>
		</div>
	);
}

export default Signup;
