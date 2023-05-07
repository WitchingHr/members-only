import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "../axios";
import Nav from "../components/Nav";
import MessageBoard from "../components/MessageBoard";
import { Link } from "react-router-dom";

// Home page component
function App() {
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const { auth, setAuth } = useContext(UserContext);

	// set page title and verify token on mount
	useEffect(() => {
		// set page title
		document.title = "Message Board | MembersOnly";

		// verify token function
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

	// open message modal
	const openMessageModal = () => {
		setModalOpen(true);
	};

	return (
		<div className="section-container">
			<Nav />
			<main className="section-container relative">
				<div className="flex justify-between items-center flex-wrap gap-4">
					<div>
						<h2 className="text-4xl">Message Board</h2>
						{auth.isAuth && (
							<p className="text-2xl">Welcome back, {auth.username}</p>
						)}
					</div>
					{auth.isAuth ? (
						<button
							className="text-indigo-600 dark:text-indigo-500 font-medium"
							onClick={openMessageModal}
						>
							Post a New Message
						</button>
					) : (
						<Link
							to="/login"
							className="text-xl text-indigo-600 dark:text-indigo-500"
						>
							Log in to post a message
						</Link>
					)}
				</div>
				<MessageBoard modalOpen={modalOpen} setModalOpen={setModalOpen} />
			</main>
		</div>
	);
}

export default App;
