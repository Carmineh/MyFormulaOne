import React, { useState } from "react";
import { Driver, Circuit, Constructor, Race } from "../api/types";

import "./Table.css";

interface CircuitTableInterface {
	circuits: Circuit[];
}

const CircuitTable: React.FC<CircuitTableInterface> = ({ circuits }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 15;

	const nextPage = () => {
		if (currentPage < Math.ceil(circuits.length / itemsPerPage) - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const startIndex = currentPage * itemsPerPage;
	const selectedData = circuits.slice(startIndex, startIndex + itemsPerPage);
	const lastIndex = Math.min(startIndex + itemsPerPage, circuits.length);

	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Country</th>
						<th scope="col">Location</th>
						<th scope="col"></th>
					</tr>
				</thead>

				<tbody>
					{selectedData.map((item, index) => (
						<tr key={item.circuitId} className="Table">
							<th scope="row">{lastIndex <= 15 ? index : index + lastIndex}</th>
							<td>{item.name}</td>
							<td>{item.country}</td>
							<td>{item.location}</td>
							<td className="profile-page__button">
								<a href={"http://localhost:5173/circuits/" + item.circuitId}>
									INFO
								</a>
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

export default CircuitTable;
