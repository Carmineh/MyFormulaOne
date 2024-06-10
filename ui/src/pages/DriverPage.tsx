import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { fetchDrivers_byId } from "../api/API";
import { Driver } from "../api/types";
import ImagePortrait from "../components/ImagePortrait";

export default function DriverPage() {
	const id: string = useParams().id ?? "";

	const [driver, setDriver] = useState<Driver>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getDriver = async () => {
			try {
				const result = await fetchDrivers_byId(id);
				setDriver(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getDriver();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	console.log(driver?.url);
	return (
		<>
			<Header />
			<h1>{driver?.forename}</h1>

			<pre>{JSON.stringify(driver, null, 2)}</pre>
			{driver ? <ImagePortrait url={driver.url} /> : " Driver not found"}
		</>
	);
}
