import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { fetchCircuits_byId } from "../api/API";
import { Circuit } from "../api/types";
import Loading from "../components/Loading";

export default function CircuitPage() {
	const id: string = useParams().id ?? "";

	const [circuit, setCircuit] = useState<Circuit | null>(null);
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

		getCircuit();
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
			<h1>CIRCUIT {id}</h1>
			<pre>{JSON.stringify(circuit, null, 2)}</pre>
		</>
	);
}
