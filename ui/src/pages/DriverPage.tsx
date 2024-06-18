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
	const [showRace, setShowRace] = useState(true); // Lo setto a true perchè di default voglio le gare

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
				const formattedResult = result.map((race: any) => {
					const [year, month, day] = race.raceDate.split("T")[0].split("-");
					return { ...race, raceDate: `${day}/${month}/${year}` };
				});
				setPole(formattedResult);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		const getDriverWins = async () => {
			try {
				const result = await fetchRacesWin_byIdDriver(id);
				const formattedResult = result.map((race: any) => {
					const [year, month, day] = race.date.split("T")[0].split("-");
					return { ...race, date: `${day}/${month}/${year}` };
				});
				setWins(formattedResult);
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
			<div className="container">
			
				<h1 className="centered title">
					{driver?.forename} {driver?.surname}
				</h1>

				<table className="centered">
					<td className="race-info_col">
						{driver ? (<ImagePortrait url={driver.url} type="driver" />) : (" Driver not found")}
					</td>
				
					<td className="race-info_col">
						<div className="race-info">
							<div className="race-info__item">
								<img src="/assets/vittoria.png" alt="" className="icon" />
								<h3> {numberWins ? numberWins.winCount + " Vittorie": "Nessun dato disponibile"}</h3>
							</div>
							<div className="race-info__item">
								<img src="/assets/pole-position.png" alt="" className="icon" />
								<h3>{pole && pole.length > 0 ? pole[0].totalPoles + " PolePosition" : "Nessun dato disponibile"}</h3>
							</div>
						</div>
					</td>
				</table>

				<div className="page-container">
					<h2>Scuderie per cui ha corso</h2>
					{constructor ? (
						<Table constructors={constructor} />
					) : (
						"Sto caricando"
					)}

					<div className="results-toggle">
						<button onClick={() => setShowRace(true)} className={showRace ? "active" : ""}>
							Mostra Risultati Gara
						</button>
						<button onClick={() => setShowRace(false)} className={!showRace ? "active" : ""}>
							Mostra Tabella Qualifica
						</button>
					</div>

					{showRace ? (
						<>
							<h2>Gare vinte</h2>
							{wins ? <Race RaceWinsForDriver={wins} /> : "Sto caricando"}
						</>
					) : (
						<>
							<h2>Pole Position</h2>
							{pole ? <Pole DriverPoles={pole} /> : "Sto caricando"}
						</>
					)}
				</div>
			</div>
		</>
	);
}
