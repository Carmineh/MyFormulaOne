import React, { useState } from "react";
import { HallOfFame } from "../api/types";

import "./Table.css";

interface AllVictories {
	HallOfFame: HallOfFame[];
}

const CircuitTable: React.FC<AllVictories> = ({ HallOfFame }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 15;

	const nextPage = () => {
		if (currentPage < Math.ceil(HallOfFame.length / itemsPerPage) - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const startIndex = currentPage * itemsPerPage;
	const selectedData = HallOfFame.slice(startIndex, startIndex + itemsPerPage);
	const lastIndex = Math.min(startIndex + itemsPerPage, HallOfFame.length);

	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Position</th>
						<th scope="col">Vittorie</th>
						<th scope="col">Nome Pilota</th>
					</tr>
				</thead>

				<tbody>
					{selectedData.map((item, index) => (
						<tr key={item.driverId} className="Table">
							<th scope="row">
								{lastIndex <= 15 ? index : index + startIndex}
							</th>
							<td>{item.winCount}</td>
							<td>{item.driverName}</td>
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

export default CircuitTable;
