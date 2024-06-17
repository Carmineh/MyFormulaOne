import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/DriverTable";

import { Driver } from "../api/types";
import { fetchDrivers_all } from "../api/API";
import Loading from "../components/Loading";

export default function DriversPage() {
	const [drivers, setDrivers] = useState<Driver[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getDrivers = async () => {
			try {
				const result = await fetchDrivers_all();
				setDrivers(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getDrivers();
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
			<Table drivers={drivers} />
		</>
	);
}
