export interface Driver {
	driverId: number;
	driverRef: string;
	number: string;
	code: string;
	forename: string;
	surname: string;
	dob: Date;
	nationality: string;
	url: string;
}

export interface Constructor {
	constructorId: number;
	constructorRef: string;
	name: string;
	nationality: string;
	url: string;
}

export interface Race {
	raceId: number;
	year: number;
	round: number;
	circuitId: number;
	name: string;
	date: string; //String in format "2009-07-12T00:00:00.000Z" => //!Need to be converted or worked with this format
	time: string;
	url: string;
}

export interface Circuit {
	circuitId: number;
	circuitRef: string;
	name: string;
	location: string;
	country: string;
	lat: number;
	lng: number;
	alt: number;
	url: string;
}

export interface DriverPoles {
	driverId: number;
	driverName: string;
	totalPoles: number;
	circuitId: number;
	raceName: string;
	raceDate: string;
}

export interface ConstructorsForDriver {
	constructorId: number;
	constructorName: string;
	constructorNationality: string;
}

export interface RaceLeaderboard {
	driverId: number;
	driverName: string;
	car: string;
	grandPrix: string;
	IdGranPrix: number;
	position: number;
	time: string;
	status: string;
	laps: number;
}

export interface FastestRoundRace {
	raceId: number;
	position: number;
	driver: string;
	car: string;
	q1: string;
	q2: string;
	q3: string;
	raceName: string;
	data: Date;
}

export interface FastestRoundQualRace {
	raceId: number;
	fastestTime: string;
	driverName: string;
	raceName: string;
	data: Date;
}

export interface FastestRoundCircuit {
	circuitName: string;
	raceName: string;
	date: Date;
	fastestLapTime: string;
	driverName: string;
}

export interface FastestRoundQualCircuit {
	circuitId: number;
	circuitName: string;
	fastestQualifyingTime: string;
	driverName: string;
	raceName: string;
	data: Date;
}

export interface HallOfFame {
	driverId: number;
	winCount: number;
	driverName: string;
}

export interface ImagePortraitProps {
	url: string;
	type: string;
}

export interface CircuitsHallOfFame {
	driverId: number;
	winCount: number;
	driverName: string;
}

export interface totalNumberWinsForDriver {
	driverId: number;
	winCount: number;
	driverName: string;
}

export interface RaceWinsForDriver {
	driverId: number;
	driverName: string;
	granPrix: string;
	data: string;
	IdGranPrix: number;
	position: number;
}
