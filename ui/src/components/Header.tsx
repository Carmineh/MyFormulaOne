import React from "react";
import "./Header.css";

export default function Header() {
	return (
		<>
			<div className="">
				<nav className="navbar bg-body-tertiary header-up">
					<div className="container-fluid">
						<a className="navbar-brand" href="/">
							<img
								src="https://i.imgur.com/nb7HkeT.png"
								alt="logo"
								width="260"
								height="45"
							/>
						</a>
					</div>
				</nav>

				<nav className="navbar navbar-expand-lg bg-body-tertiary justify-content-center header-bottom">
					<ul className="nav justify-content-center">
						<li className="nav-item">
							<a className="nav-link" aria-current="page" href="/drivers">
								DRIVERS
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/circuits">
								CIRCUITS
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/constructors">
								CONSTRUCTORS
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/races">
								RACES
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
}
