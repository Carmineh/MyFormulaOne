import React, { Component, useState } from "react";
import { FastestRoundQualRace } from "../api/types";

import "./Table.css";

interface LeaderboardInterface {
	drivers: FastestRoundQualRace[];
}

const QualTable: React.FC<LeaderboardInterface> = ({ drivers }) => {
	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Position</th>
						<th scope="col">Driver</th>
						<th scope="col">Car</th>
						<th scope="col">Q1</th>
						<th scope="col">Q2</th>
						<th scope="col">Q3</th>
					</tr>
				</thead>

				<tbody>
					{drivers.map((driver, position) => (
						<tr key={driver.driver} className="Table">
							{driver.position <= 30 ? <td>{driver.position}</td> : <td>NC</td>}

							<td>{driver.driver}</td>
							<td>{driver.car}</td>
							<td>{driver.q1 != "\\N" ? driver.q1 : " "}</td>
							<td>{driver.q2 != "\\N" ? driver.q2 : " "}</td>
							<td>{driver.q3 != "\\N" ? driver.q3 : " "}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default QualTable;
