import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Pages.css";
import Header from "../components/Header";
import {
	fetchCircuits_byId,
	fetchDrivers_byId,
	fetchFastestQTime_byIdRace,
	fetchFastestRTime_byIdRace,
	fetchLeaderboard_byIdRace,
	fetchRaces_byId,
} from "../api/API";

import {
	Circuit,
	Driver,
	FastestRoundQualRace,
	FastestRoundRace,
	Race,
	RaceLeaderboard,
} from "../api/types";

import ImagePortrait from "../components/ImagePortrait";
import Table from "../components/LeaderboardTable";
import Loading from "../components/Loading";

export default function RacePage() {
	const id: string = useParams().id ?? "";

	const [race, setRace] = useState<Race>();
	const [circuit, setCircuit] = useState<Circuit>();
	const [leaderboard, setLeaderboard] = useState<RaceLeaderboard[]>();
	const [fastestLapRace, setFastestLapRace] = useState<FastestRoundRace>();
	const [fastestLapQual, setFastestLapQual] = useState<FastestRoundQualRace>();
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
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getLeaderboard = async () => {
			try {
				setLoading(true);
				const result = await fetchLeaderboard_byIdRace(id);
				setLeaderboard(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getFastestLapRace = async () => {
			try {
				setLoading(true);
				const result = await fetchFastestRTime_byIdRace(id);
				setFastestLapRace(result);
				setLoading(false);
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

		getRace();
		getLeaderboard();
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
	if (error) return <p>{error.message}</p>;
	return (
		<>
			<Header />
			{race && fastestLapRace && fastestLapQual && leaderboard && circuit ? (
				<>
					<div className="container">
						<h1 className="centered title">{race.name + " " + race.year}</h1>

						<table className="centered">
							<td className="race-info_col">
								<ImagePortrait url={race.url} type="race" />
							</td>
							<td className="race-info_col">
								<div className="race-info">
									<div className="race-info__item">
										<img src="/assets/date-icon.png" alt="" className="icon" />
										<h3>{race.date + " " + race.time} </h3>
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
										<h3>{circuit.location + "," + circuit.country} </h3>
									</div>
								</div>
							</td>
						</table>

						<div className="page-container"></div>
						{leaderboard ? <Table drivers={leaderboard} /> : "No data"}
					</div>
				</>
			) : (
				<> error</>
			)}
			{race ? (
				<>
					<pre>{JSON.stringify(race, null, 2)}</pre>
				</>
			) : (
				" Race not found"
			)}
			{circuit ? (
				<>
					<h2>Circuit</h2>
					<pre>{JSON.stringify(circuit, null, 2)}</pre>
				</>
			) : (
				"No data"
			)}
			{fastestLapQual ? (
				<>
					<h2>Fastest Lap Qualification</h2>
					<pre>{JSON.stringify(fastestLapQual, null, 2)}</pre>
				</>
			) : (
				"No data"
			)}
			{fastestLapRace ? (
				<>
					<h2>Fastest Lap Race</h2>
					<pre>{JSON.stringify(fastestLapRace, null, 2)}</pre>
				</>
			) : (
				"No data"
			)}
			<h2>Leaderboard</h2>
		</>
	);
}
