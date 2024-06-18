import React, { Component, useState } from "react";
import {
	Driver,
	Circuit,
	Constructor,
	Race,
	RaceLeaderboard,
} from "../api/types";

import "./Table.css";

interface LeaderboardInterface {
	drivers: RaceLeaderboard[];
}

const LeaderboardTable: React.FC<LeaderboardInterface> = ({ drivers }) => {
	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Position</th>
						<th scope="col">Driver</th>
						<th scope="col">Car</th>
						<th scope="col">Laps</th>
						<th scope="col">Time</th>
					</tr>
				</thead>

				<tbody>
					{drivers.map((driver, position) => (
						<tr key={driver.driverId} className="Table">
							{driver.position <= 30 ? <td>{driver.position}</td> : <td>NC</td>}

							<td>{driver.driverName}</td>

							<td>{driver.car}</td>

							<td>{driver.laps}</td>

							{driver.time == "\\N" ? (
								driver.status.includes("Lap") ? (
									<td>{driver.status}</td>
								) : (
									<td>DNF</td>
								)
							) : (
								<td>{driver.time}</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default LeaderboardTable;
