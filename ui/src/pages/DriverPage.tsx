import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { fetchDrivers_byId } from "../api/API";
import { fetchConstructorForDriver_byId } from "../api/API";
import { fetchPolePosition_byId } from "../api/API";
import { ConstructorsForDriver, Driver, DriverPoles} from "../api/types";
import ImagePortrait from "../components/ImagePortrait";
import Table from "../components/DriverConstructorTable";
import Pole from "../components/DriverPolePositionTable";

export default function DriverPage() {
	const id: string = useParams().id ?? "";

	const [driver, setDriver] = useState<Driver>();
	const [constructor, setConstructor] = useState<ConstructorsForDriver[]>();
	const [pole, setPole] = useState<DriverPoles[]>();
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
		const getDriverConstructor = async () => {
			try {
				const result = await fetchConstructorForDriver_byId(id);
				setConstructor(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getDriverPole = async () => {
			try {
				const result = await fetchPolePosition_byId(id);
				setPole(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getDriver();
		getDriverConstructor();
		getDriverPole();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	console.log(driver?.url);
	return (
		<>
			<Header />
			<h1>{driver?.forename} {driver?.surname}</h1>
			{driver ? <ImagePortrait url={driver.url} /> : " Driver not found"}
			
			<h2>Scuderie per cui ha corso</h2>
			{constructor ? <Table constructors={constructor} /> : "Constructor not found"}
			
			<h2>Numero di Pole Position totali</h2>
			{pole ? <Pole DriverPoles={pole} /> : "Constructor not found"}
		</>
	);
}
