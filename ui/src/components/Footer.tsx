import React from "react";
import "./Footer.css";

export default function Footer() {
	return (
		<>
			<footer className="site-footer">
				<div className="footer__container container">
					<div className="row">
						<div className="footer_left">
							<img src="./assets/logo.png" alt="" className="footer__logo" />
						</div>

						<div className="col-xs-6 col-md-3 footer_center">
							<h6>About</h6>
							<p className="text-justify">
								MyFormula One è una piattaforma per gli appassionati di Formula
								1 amanti delle statistiche. Designe by Carmine Calabrese e Rocco
								Fortunato
							</p>
						</div>

						<div className="col-xs-6 col-md-3 footer_right">
							<h6>Quick Links</h6>
							<ul className="footer-links">
								<li>
									<a href="/">Homepage</a>
								</li>
								<li>
									<a href="/drivers">Drivers</a>
								</li>
								<li>
									<a href="/circuits">Circuits</a>
								</li>
								<li>
									<a href="/races">Races</a>
								</li>
								<li>
									<a href="/halloffame">Hall of fame</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
