import React, { useState } from "react";
import { Driver, Circuit, Constructor, Race } from "../api/types";

import "./Table.css";

interface DriverTableInterface {
	drivers: Driver[];
}

const DriverTable: React.FC<DriverTableInterface> = ({ drivers }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 15;

	const nextPage = () => {
		if (currentPage < Math.ceil(drivers.length / itemsPerPage) - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const startIndex = currentPage * itemsPerPage;
	const selectedData = drivers.slice(startIndex, startIndex + itemsPerPage);
	const lastIndex = Math.min(startIndex + itemsPerPage, drivers.length);

	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Surname</th>
						<th scope="col">Nationality</th>
						<th scope="col"></th>
					</tr>
				</thead>

				<tbody>
					{selectedData.map((item, index) => (
						<tr key={item.driverId} className="Table">
							<th scope="row">{lastIndex <= 15 ? index : index + lastIndex}</th>
							<td>{item.forename}</td>
							<td>{item.surname}</td>
							<td>{item.nationality}</td>
							<td className="profile-page__button">
								<a href={"http://localhost:5173/drivers/" + item.driverId}>
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

export default DriverTable;
