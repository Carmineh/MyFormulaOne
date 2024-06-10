import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { fetchRaces_byId } from "../api/API";
import { useParams } from "react-router-dom";
import { Race } from "../api/types";
import ImagePortrait from "../components/ImagePortrait";

export default function RacePage() {
	const id: string = useParams().id ?? "";

	const [race, setRace] = useState<Race>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getRace = async () => {
			try {
				const result = await fetchRaces_byId(id);
				setRace(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getRace();
	}, [id]);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;
	return (
		<>
			<Header />
			<h1>RACE {id}</h1>
			<pre>{JSON.stringify(race, null, 2)}</pre>
			{race ? <ImagePortrait url={race.url} /> : " Race not found"}
		</>
	);
}
