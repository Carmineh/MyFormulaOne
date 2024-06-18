import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Pages.css";
import Header from "../components/Header";
import {
	fetchCircuits_byId,
	fetchFastestQTime_byIdRace,
	fetchFastestRTime_byIdRace,
	fetchLeaderboard_byIdRace,
	fetchRaces_byId,
} from "../api/API";

import {
	Circuit,
	FastestRoundQualRace,
	FastestRoundRace,
	Race,
	RaceLeaderboard,
} from "../api/types";

import ImagePortrait from "../components/ImagePortrait";
import LeaderboardTable from "../components/Race_LeaderboardTable";
import Loading from "../components/Loading";
import QualTable from "../components/Race_BestQualTable";
import LapsTable from "../components/Race_BestLapTable";

export default function RacePage() {
	const id: string = useParams().id ?? "";
	const [formattedDate, setFormattedDate] = useState<string>("");
	const [race, setRace] = useState<Race>();
	const [circuit, setCircuit] = useState<Circuit>();
	const [leaderboard, setLeaderboard] = useState<RaceLeaderboard[]>();
	const [fastestLapRace, setFastestLapRace] = useState<FastestRoundRace[]>();
	const [fastestLapQual, setFastestLapQual] =
		useState<FastestRoundQualRace[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	/*
	GARA: 
		Vincitore
		Giro veloce in gara
		Giro veloce in qualifica
		Classifica della gara (Posizioni piloti)
	 */
	useEffect(() => {
		const getRace = async () => {
			try {
				const result_race = await fetchRaces_byId(id);
				const result_circuit = await fetchCircuits_byId(
					result_race.circuitId + ""
				);
				setRace(result_race);
				setCircuit(result_circuit);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getLeaderboard = async () => {
			try {
				const result = await fetchLeaderboard_byIdRace(id);
				setLeaderboard(result);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getFastestLapRace = async () => {
			try {
				const result = await fetchFastestRTime_byIdRace(id);
				setFastestLapRace(result);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getFastestLapQual = async () => {
			try {
				setLoading(true);
				const result = await fetchFastestQTime_byIdRace(id);
				setFastestLapQual(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getFormattedDate = async () => {
			try {
				const result = await fetchRaces_byId(id);
				const [year, month, day] = result.date.split("T")[0].split("-");

				// Estrai l'ora e i minuti dalla stringa del tempo
				const [hours, minutes] = result.time.split(":");

				// Combina la data e l'ora nel formato desiderato
				setFormattedDate(`${day}/${month}/${year} ${hours}:${minutes}`);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getRace();
		getLeaderboard();
		getFastestLapQual();
		getFastestLapRace();
		getFormattedDate();

		setLoading(true);
	}, [id]);
	if (loading)
		return (
			<>
				<Header />
				<Loading />
			</>
		);
	// if (error) return <p>{error.message}</p>;
	return (
		<>
			<Header />
			{race && fastestLapRace && fastestLapQual && leaderboard && circuit ? (
				<>
					<div className="container">
						<h1 className="centered title">{race.name + " - " + race.year}</h1>

						<table className="centered">
							<td className="race-info_col">
								<ImagePortrait url={race.url} type="race" />
							</td>
							<td className="race-info_col">
								<div className="race-info">
									<div className="race-info__item">
										<img src="/assets/date-icon.png" alt="" className="icon" />
										<h3>{formattedDate} </h3>
									</div>
									<div className="race-info__item">
										<img
											src="/assets/circuit-icon.png"
											alt=""
											className="icon"
										/>
										<h3>
											<a
												href={"/circuits/" + circuit.circuitId}
												className="circuit-link"
											>
												{circuit.name}
											</a>
										</h3>
									</div>
									<div className="race-info__item">
										<img
											src="/assets/location-icon.png"
											alt=""
											className="icon"
										/>
										<h3>{circuit.location + ", " + circuit.country} </h3>
									</div>
								</div>
							</td>
						</table>

						<div className="page-container"></div>
						{leaderboard ? (
							<LeaderboardTable drivers={leaderboard} />
						) : (
							"No data"
						)}
						{fastestLapRace ? (
							<>
								<LapsTable drivers={fastestLapRace} />
							</>
						) : (
							"No data"
						)}
						{fastestLapRace ? (
							<QualTable drivers={fastestLapQual} />
						) : (
							"No data"
						)}
					</div>
				</>
			) : (
				<> {error} </>
			)}
		</>
	);
}
