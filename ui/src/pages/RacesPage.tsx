import React, { useEffect } from "react";
import Header from "../components/Header";
import { fetchRaces_all } from "../api/API";
import { Race } from "../api/types";
import Table from "../components/RaceTable";
import { useState } from "react";
import Loading from "../components/Loading";

export default function RacesPage() {
	const [races, setRaces] = useState<Race[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getRaces = async () => {
			try {
				const result = await fetchRaces_all();
				setRaces(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};
		getRaces();
	});

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
			<Table races={races} />
		</>
	);
}
