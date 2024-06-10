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

export interface ImagePortraitProps {
	url: string;
}
