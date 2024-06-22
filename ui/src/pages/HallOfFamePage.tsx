import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/HallOfFameTable";
import { Driver, HallOfFame } from "../api/types";
import { fetchAllVictory, fetchDrivers_all } from "../api/API";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

export default function HallOfFamePage() {
	const [hallOfFame, setHallOfFame] = useState<HallOfFame[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getHOF = async () => {
			try {
				const result = await fetchAllVictory();
				setHallOfFame(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getHOF();
	}, []);

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
			<Table HallOfFame={hallOfFame} />
			<Footer />
		</>
	);
}
