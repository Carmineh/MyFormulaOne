import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

import { Constructor } from "../api/types";
import { fetchConstructors_byId } from "../api/API";
import Loading from "../components/Loading";
import FlagDisplay from "../components/Flag";

export default function ConstructorPage() {
	const id: string = useParams().id ?? "";

	const [constructor, setConstructor] = useState<Constructor | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getConstructor = async () => {
			try {
				const result = await fetchConstructors_byId(id);
				setConstructor(result);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		};

		getConstructor();
	}, [id]);

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
			<h1>CONSTRUCTOR {id}</h1>
			{constructor ? (
				<FlagDisplay nationality={constructor?.nationality} />
			) : (
				"NO FLAG"
			)}
		</>
	);
}
