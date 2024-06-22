import React, { useState } from "react";
import { DriverPoles } from "../api/types";

import "./Table.css";

interface DriverPolesInterface {
	DriverPoles: DriverPoles[];
}

const DriverTable: React.FC<DriverPolesInterface> = ({ DriverPoles }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 15;

	const nextPage = () => {
		if (currentPage < Math.ceil(DriverPoles.length / itemsPerPage) - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const startIndex = currentPage * itemsPerPage;
	const selectedData = DriverPoles.slice(startIndex, startIndex + itemsPerPage);
	const lastIndex = Math.min(startIndex + itemsPerPage, DriverPoles.length);

	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nome gara</th>
						<th scope="col">Data gara</th>
						<th scope="col"></th>
					</tr>
				</thead>

				<tbody>
					{selectedData.map((item, index) => (
						<tr key={item.driverId} className="Table">
							<th scope="row">
								{lastIndex <= 15 ? index : startIndex + index}
							</th>
							<td>{item.raceName}</td>
							<td>{item.raceDate}</td>
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

export default DriverTable;
