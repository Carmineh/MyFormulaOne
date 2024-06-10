/*  
    File where all the API call will be declared
        - Function structure: fetchCOLLECTION_byPARAM(PARAM) 

        EXAMPLE   
            fetchDrivers_byId(1)
*/
import axios from "axios";
import { Driver, Constructor, Race, Circuit } from "../api/types";

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
