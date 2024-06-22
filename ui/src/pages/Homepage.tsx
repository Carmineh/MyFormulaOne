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
				<table className="homepage__buttons">
					<tr>
						<td className="homepage__buttons_col">
							<div className="homepage__buttons__div">CASELLA 1</div>
						</td>
						<td className="homepage__buttons_col">
							<div className="homepage__buttons__div">CASELLA 2</div>
						</td>
					</tr>
				</table>

				<table className="homepage__buttons">
					<tr>
						<td className="homepage__buttons_col">
							<div className="homepage__buttons__div">CASELLA 1</div>
						</td>
						<td className="homepage__buttons_col">
							<div className="homepage__buttons__div">CASELLA 2</div>
						</td>
					</tr>
				</table>
			</div>
			<Footer />
		</>
	);
}
