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

const RaceTable: React.FC<LeaderboardInterface> = ({ drivers }) => {
	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Position</th>
						<th scope="col">Driver</th>
					</tr>
				</thead>

				<tbody>
					{drivers.map((driver, position) => (
						<tr key={driver.driverId} className="Table">
							{driver.position <= 30 ? (
								<td>{driver.position}</td>
							) : (
								<td>RIT</td>
							)}
							<td className="profile-page__button">
								<a href={"/drivers/" + driver.driverId}>{driver.driverName}</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default RaceTable;
