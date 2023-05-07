import React from "react";
import Nav from "../components/Nav";

// 404
function NotFound() {
	return (
		<div className="section-container">
			<Nav />
			<main className="section-container relative">
        <h1>404</h1>
        <p>Page not found</p>
			</main>
		</div>
	);
}

export default NotFound;
