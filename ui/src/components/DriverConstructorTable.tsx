import React, { useState } from "react";
import { ConstructorsForDriver } from "../api/types";

import "./Table.css";

interface ConstructorTableInterface {
	constructors: ConstructorsForDriver[];
}

const DriverTable: React.FC<ConstructorTableInterface> = ({ constructors }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 15;

	const nextPage = () => {
		if (currentPage < Math.ceil(constructors.length / itemsPerPage) - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const startIndex = currentPage * itemsPerPage;
	const selectedData = constructors.slice(
		startIndex,
		startIndex + itemsPerPage
	);
	const lastIndex = Math.min(startIndex + itemsPerPage, constructors.length);

	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Constructor</th>
						<th scope="col">Nationality</th>
						<th scope="col"></th>
					</tr>
				</thead>

				<tbody>
					{selectedData.map((item, index) => (
						<tr key={item.constructorId} className="Table">
							<th scope="row">
								{lastIndex <= 15 ? index : startIndex + index}
							</th>
							<td>{item.constructorName}</td>
							<td>{item.constructorNationality}</td>
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
