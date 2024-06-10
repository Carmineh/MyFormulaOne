import React from "react";
import "./Header.css";

/*
	type: string => Definisce il comportamento della search-bar, in caso di valore null
					la search-bar non verrà visualizzata
*/
let type: string = "";
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
						{type === "" ? null : (
							<>
								<form className="d-flex search-bar" role="search">
									<input
										className="form-control me-2"
										type="search"
										placeholder="Search"
										aria-label="Search"
									/>
									<button className="btn btn-light" type="submit">
										Search
									</button>
								</form>
							</>
						)}
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
