/*  
    File where all the API call will be declared
        - Function structure: fetchCOLLECTION_byPARAM(PARAM) 

        EXAMPLE   
            fetchDrivers_byId(1)
*/
import axios from "axios";
import {
	Driver,
	Constructor,
	Race,
	Circuit,
	DriverPoles,
	ConstructorsForDriver,
	RaceLeaderboard,
} from "../api/types";

//DRIVERS API CALL
export const fetchDrivers_byId = async (id: string): Promise<Driver> => {
	const response = await axios.get(
		"http://localhost:3001/api/drivers/getById/" + id
	);
	return response.data[0];
};

export const fetchDrivers_all = async (): Promise<Driver[]> => {
	const response = await axios.get("http://localhost:3001/api/drivers/getAll");
	return response.data;
};

//CIRCUITS API CALL
export const fetchCircuits_all = async (): Promise<Circuit[]> => {
	const response = await axios.get("http://localhost:3001/api/circuits/getAll");
	return response.data;
};

export const fetchCircuits_byId = async (id: string): Promise<Circuit> => {
	const response = await axios.get(
		"http://localhost:3001/api/circuits/getById/" + id
	);
	return response.data[0];
};

//CONSTRUCTORS API CALL
export const fetchConstructors_all = async (): Promise<Constructor[]> => {
	const response = await axios.get(
		"http://localhost:3001/api/constructors/getAll"
	);
	return response.data;
};

export const fetchConstructors_byId = async (
	id: string
): Promise<Constructor> => {
	const response = await axios.get(
		"http://localhost:3001/api/constructors/getById/" + id
	);
	return response.data[0];
};

//RACES API CALL
export const fetchRaces_all = async (): Promise<Race[]> => {
	const response = await axios.get("http://localhost:3001/api/races/getAll");
	return response.data;
};

export const fetchRaces_byId = async (id: string): Promise<Race> => {
	const response = await axios.get(
		"http://localhost:3001/api/races/getById/" + id
	);
	return response.data[0];
};

//QUERY NEW
export const fetchPolePosition_byId = async (
	id: string
): Promise<DriverPoles> => {
	const response = await axios.get(
		"http://localhost:3001/api/results/poles/" + id
	);
	return response.data;
};

export const fetchConstructorForDriver_byId = async (
	id: string
): Promise<ConstructorsForDriver> => {
	const response = await axios.get(
		"http://localhost:3001/api/driver_standings/constructors/" + id
	);
	return response.data;
};

export const fetchLeaderboard_byIdRace = async (
	id: string
): Promise<RaceLeaderboard> => {
	const response = await axios.get(
		"http://localhost:3001/api/races/result/" + id
	);
	return response.data;
};

export const fetchFastestRTime_byIdRace = async (id: string): Promise<Race> => {
	const response = await axios.get(
		"http://localhost:3001/api/results/bestlaprace/" + id
	);
	return response.data[0];
};

export const fetchFastestQTime_byIdRace = async (id: string): Promise<Race> => {
	const response = await axios.get(
		"http://localhost:3001/api/qualifying/bestlap/" + id
	);
	return response.data[0];
};

export const fetchFastestQTimeEver_byIdCircuit = async (
	id: string
): Promise<Race> => {
	const response = await axios.get(
		"http://localhost:3001/api/circuits/bestlapq3ever/" + id
	);
	return response.data[0];
};

export const fetchFastestRTimeEver_byIdCircuit = async (
	id: string
): Promise<Race> => {
	const response = await axios.get(
		"http://localhost:3001/api/circuits/bestlapraseever/" + id
	);
	return response.data[0];
};

export const fetchAllVictory = async (): Promise<Race> => {
	const response = await axios.get(
		"http://localhost:3001/api/results/halloffame"
	);
	return response.data[0];
};
