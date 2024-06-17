import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import {
	fetchDrivers_byId,
	fetchFastestQTime_byIdRace,
	fetchFastestRTime_byIdRace,
	fetchLeaderboard_byIdRace,
	fetchRaces_byId,
} from "../api/API";

import {
	Driver,
	FastestRoundQualRace,
	FastestRoundRace,
	Race,
	RaceLeaderboard,
} from "../api/types";

import ImagePortrait from "../components/ImagePortrait";
import Table from "../components/LeaderboardTable";

export default function RacePage() {
	const id: string = useParams().id ?? "";

	const [race, setRace] = useState<Race>();
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
				setLoading(true);
				const result = await fetchRaces_byId(id);
				setRace(result);
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
	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;
	return (
		<>
			<Header />
			<h1>RACE {id}</h1>
			{race ? (
				<>
					<ImagePortrait url={race.url} /> <h2>Race Info</h2>
					<pre>{JSON.stringify(race, null, 2)}</pre>
				</>
			) : (
				" Race not found"
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
			{leaderboard ? <Table drivers={leaderboard} /> : "No data"}
		</>
	);
}
