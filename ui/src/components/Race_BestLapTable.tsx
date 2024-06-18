import React, { Component, useState } from "react";
import { FastestRoundQualRace, FastestRoundRace } from "../api/types";

import "./Table.css";

interface LeaderboardInterface {
	drivers: FastestRoundRace[];
}

const LapsTable: React.FC<LeaderboardInterface> = ({ drivers }) => {
	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Position</th>
						<th scope="col">Driver</th>
						<th scope="col">Car</th>
						<th scope="col">Lap</th>
						<th scope="col">Time</th>
						<th scope="col">Avg. Speed</th>
					</tr>
				</thead>
                
				<tbody>
					{drivers.map((driver, position) => (
						<tr key={driver.driverId} className="Table">
							<td>{position}</td>
							<td>{driver.driverName}</td>
							<td>{driver.car}</td>
							<td>{driver.fastestLap}</td>
							<td>{driver.bestLapTime}</td>
							<td>{driver.avgSpeed}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default LapsTable;
