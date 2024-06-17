import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/ConstructorTable";

import { Constructor } from "../api/types";
import { fetchConstructors_all } from "../api/API";
import Loading from "../components/Loading";

export default function ConstructorsPage() {
	const [constructors, setConstructors] = useState<Constructor[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getConstructors = async () => {
			try {
				const result = await fetchConstructors_all();
				setConstructors(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getConstructors();
	}, []);

	if (loading)
		return (
			<>
				<Header />
				<Loading />
			</>
		);
	if (error) return <p>{error.message}</p>;

	return (
		<>
			<Header />
			<Table constructors={constructors} />
		</>
	);
}
