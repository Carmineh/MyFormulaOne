import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { fetchCircuits_byId } from "../api/API";
import { fetchCircuitWins_byIdCircuit } from "../api/API";
import { Circuit, HallOfFame } from "../api/types";
import ImagePortrait from "../components/ImagePortrait";
import HallOfFameTable from "../components/HallOfFameTable";
import Loading from "../components/Loading";

export default function CircuitPage() {
	const id: string = useParams().id ?? "";
	const name: string = useParams().name ?? "";

	const [circuit, setCircuit] = useState<Circuit | null>(null);
	const [HallOfFame, setHallOfFame] = useState<HallOfFame[]>();
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
		getHallOfFame();
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
			<h1>{circuit?.name}</h1>
			{circuit ? <ImagePortrait url={circuit.url} type={""} /> : " Driver not found"}
			<h2>Piloti con più vittore a {circuit?.location} </h2>
			{HallOfFame ? <HallOfFameTable HallOfFame={HallOfFame} /> : "Constructor not found"}
		</>
	);
}
