import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { fetchCircuits_byId } from "../api/API";
import { fetchCircuitWins_byIdCircuit, fetchFastestQTimeEver_byIdCircuit, fetchFastestRTimeEver_byIdCircuit } from "../api/API";
import { Circuit, HallOfFame, FastestRoundQualCircuit, FastestRoundCircuit } from "../api/types";
import ImagePortrait from "../components/ImagePortrait";
import HallOfFameTable from "../components/HallOfFameTable";
import Loading from "../components/Loading";
import "./Pages.css";
import "../components/Footer";
import Footer from "../components/Footer";

export default function CircuitPage() {
	const id: string = useParams().id ?? "";
	const name: string = useParams().name ?? "";

	const [circuit, setCircuit] = useState<Circuit | null>(null);
	const [HallOfFame, setHallOfFame] = useState<HallOfFame[]>();
	const [fastestLapRace, setFastestLapRace] = useState<FastestRoundCircuit>();
	const [fastestLapQual, setFastestLapQual] = useState<FastestRoundQualCircuit>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getCircuit = async () => {
			try {
				const result = await fetchCircuits_byId(id);
				setCircuit(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getHallOfFame = async () => {
			try {
				const result = await fetchCircuitWins_byIdCircuit(id);
				setHallOfFame(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getFastestLapRace = async () => {
			try {
				const result = await fetchFastestRTimeEver_byIdCircuit(id);
				setFastestLapRace(result);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getFastestLapQual = async () => {
			try {
				setLoading(true);
				const result = await fetchFastestQTimeEver_byIdCircuit(id);
				setFastestLapQual(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};
		getHallOfFame();
		getCircuit();
		getFastestLapQual();
		getFastestLapRace();
	}, [id]);

	if (loading)
		return (
			<>
				<Header />
				<Loading />
			</>
		);
	return (
		<>
			<Header />
			<div className="container">
				<h1 className="centered title">{circuit?.name}</h1>
				<table className="centered">
					<td className="race-info_col">
						{circuit ? (
							<ImagePortrait url={circuit.url} type={""} />
						) : (
							" Driver not found"
						)}
					</td>
					<td className="race-info_col">
						<div className="race-info">
							<div className="race-info__item">
								<img src="/assets/location-icon.png" alt="" className="icon" />
								<h3>
									{circuit
										? circuit.location + ", " + circuit.country
										: "Nessun dato disponibile"}{" "}
								</h3>
							</div>
							<div className="race-info__item">
								<img src="/assets/pole-position.png" alt="" className="icon" />
								<h3>{fastestLapQual ? fastestLapQual.fastestQualifyingTime + " Giro veloce in qualifica" : "Nessun dato disponibile"}</h3>
							</div>
							<div className="race-info__item">
								<img src="/assets/lap-time.png" alt="" className="icon" />
								<h3>{fastestLapRace ? fastestLapRace.fastestLapTime + " Giro veloce in gara" : "Nessun dato disponibile"}</h3>
							</div>
						</div>
					</td>
				</table>

				<div className="page-container">
					<h2>Piloti con più vittore a {circuit?.location} </h2>
					{HallOfFame ? (
						<HallOfFameTable HallOfFame={HallOfFame} />
					) : (
						"Constructor not found"
					)}
				</div>
			</div>

			<Footer />
		</>
	);
}
