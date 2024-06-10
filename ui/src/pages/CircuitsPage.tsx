import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Table from "../components/CircuitTable";

import { Circuit } from "../api/types";
import { fetchCircuits_all } from "../api/API";
import { useResolvedPath } from "react-router-dom";

export default function CircuitsPage() {
	const [circuits, setCircuits] = useState<Circuit[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getCircuits = async () => {
			try {
				const result = await fetchCircuits_all();
				setCircuits(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getCircuits();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	return (
		<>
			<Header />
			<Table circuits={circuits} />
		</>
	);
}
