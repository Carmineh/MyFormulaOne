import React from "react";
import Header from "../components/Header";
import ImagePortrait from "../components/ImagePortrait";
import Footer from "../components/Footer";
import "./Pages.css";
// import "./assets/index.css";

export default function HomePage() {
	return (
		<>
			<Header />
			<div className="container">
				{/* <div className="homepage__hero-section"></div> */}

				<table className="homepage__buttons">
					<tr>
						<div className="homepage__buttons__div c1_1">
							<img src="./assets/drivers_button.png" alt="CASELLA 1" />
							<div className="text-overlay">DRIVERS</div>
						</div>

						<div className="homepage__buttons__div c2_1">
							<img src="./assets/drivers_button.png" alt="CASELLA 2" />
							<div className="text-overlay">RACES</div>
						</div>
					</tr>

					<tr className="prova">
						<div className="homepage__buttons__div c1_2">
							<img src="./assets/circuits_button.png" alt="Circuits" />
							<div className="text-overlay">CIRCUITS</div>
						</div>

						<div className="homepage__buttons__div c2_2">
							<img src="./assets/drivers_button.png" alt="CASELLA 4" />
							<div className="text-overlay">HALL OF FAME</div>
						</div>
					</tr>
				</table>
			</div>
			<Footer />
		</>
	);
}
