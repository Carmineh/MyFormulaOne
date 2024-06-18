import React, { Component, useState } from "react";
import { Driver, Circuit, Constructor, Race } from "../api/types";

import "./Table.css";

interface RaceTableInterface {
	races: Race[];
}

const RaceTable: React.FC<RaceTableInterface> = ({ races }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 15;

	races.sort((a, b) => b.year - a.year);

	const nextPage = () => {
		if (currentPage < Math.ceil(races.length / itemsPerPage) - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const startIndex = currentPage * itemsPerPage;
	const selectedData = races.slice(startIndex, startIndex + itemsPerPage);
	const lastIndex = Math.min(startIndex + itemsPerPage, races.length);

	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Year</th>
					</tr>
				</thead>

				<tbody>
					{selectedData.map((item, index) => (
						<tr key={item.raceId} className="Table">
							<th scope="row">{lastIndex <= 15 ? index : index + lastIndex}</th>
							<td>{item.name}</td>
							<td>{item.year}</td>
							<td className="profile-page__button">
								<a href={"http://localhost:5173/races/" + item.raceId}>INFO</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="centered-button">
				<a className="table_arrow" href="#" onClick={prevPage}>
					{"<<"}
				</a>

				<a className="table_arrow" href="#" onClick={nextPage}>
					{">>"}
				</a>
			</div>
		</>
	);
};

export default RaceTable;
