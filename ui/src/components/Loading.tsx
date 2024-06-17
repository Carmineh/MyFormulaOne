import React from "react";

export default function Loading() {
	return (
		<div>
			<img
				src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2Viajd5bmZ5YTQ4aWhlZmZ5dm54OGtwZ3cwMGk2azQwdHRvcmhvdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/AEDD6xjlOxNMgFsUmA/giphy.webp"
				alt="Loading..."
				style={{
					width: "200px",
					height: "100px",
					margin: "auto",
					marginTop: "200px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			/>
			<h4 style={{ textAlign: "center" }}>Loading...</h4>
		</div>
	);
}
