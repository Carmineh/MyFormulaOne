import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { fetchDrivers_byId } from "../api/API";
import { fetchConstructorForDriver_byId } from "../api/API";
import { fetchPolePosition_byId } from "../api/API";
import { fetchRacesWin_byIdDriver} from "../api/API";
import { fetchNumberRacesWin_byIdDriver} from "../api/API";
import { ConstructorsForDriver, Driver, DriverPoles, RaceWinsForDriver, totalNumberWinsForDriver } from "../api/types";
import ImagePortrait from "../components/ImagePortrait";
import Table from "../components/DriverConstructorTable";
import Pole from "../components/DriverPolePositionTable";
import Race from "../components/DriverRaceWinsTable";
import Loading from "../components/Loading";
import "./Pages.css";

export default function DriverPage() {
	const id: string = useParams().id ?? "";

	const [driver, setDriver] = useState<Driver>();
	const [constructor, setConstructor] = useState<ConstructorsForDriver[]>();
	const [pole, setPole] = useState<DriverPoles[]>();
	const [wins, setWins] = useState<RaceWinsForDriver[]>();
	const [numberWins, setNumberWins] = useState<totalNumberWinsForDriver[]>();
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

		const getDriverWins = async () => {
			try {
				const result = await fetchRacesWin_byIdDriver(id);
				setWins(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getNumberWins = async () => {
			try {
				const result = await fetchNumberRacesWin_byIdDriver(id);
				setNumberWins(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getDriver();
		getDriverConstructor();
		getDriverPole();
		getDriverWins();
		getNumberWins();
	}, [id]);

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
			<h1>
				{driver?.forename} {driver?.surname}
			</h1>
			{driver ? (
				<ImagePortrait url={driver.url} type="driver" />
			) : (
				" Driver not found"
			)}

			<h2>Vittorie totali</h2>

            <pre>{JSON.stringify(numberWins, null, 2)}</pre>

			<h2>Scuderie per cui ha corso</h2>
			{constructor ? (
				<Table constructors={constructor} />
			) : (
				"Sto caricando"
			)}

			<h2>Numero di Pole Position totali</h2>
			{pole ? <Pole DriverPoles={pole} /> : "Sto caricando"}
			
			<h2>Gare vinte</h2>
			{wins ? <Race RaceWinsForDriver={wins} /> : "Sto caricando"}
		</>
	);
}
