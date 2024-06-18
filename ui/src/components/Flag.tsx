import React, { useState, ChangeEvent } from "react";
import "country-flag-icons/react/3x2";

const nationalityToCountryCode: { [key: string]: string } = {
	British: "GB",
	German: "DE",
	French: "FR",
	Italian: "IT",
	Japanese: "JP",
	Austrian: "AT",
	Indian: "IN",
	Dutch: "NL",
	Russian: "RU",
	Swiss: "CH",
	Irish: "IE",
	"Hong Kong": "HK",
	Brazilian: "BR",
	Canadian: "CA",
	Mexican: "MX",
	American: "US",
	Australian: "AU",
	"New Zealander": "NZ",
	"South African": "ZA",
	Rhodesian: "ZW",
	Belgian: "BE",
	Spanish: "ES",
	Malaysian: "MY",
};

interface FlagInterface {
	nationality: string;
}

const FlagDisplay: React.FC<FlagInterface> = ({ nationality }) => {
	const [countryCode, setCountryCode] = useState<string>("");
	const code = nationalityToCountryCode[nationality];

	return (
		<img
			alt={nationality}
			src={
				"http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
				code +
				".svg"
			}
			style={{ width: "100px", height: "9	0px" }}
		/>
	);
};

export default FlagDisplay;
