import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

import { Constructor } from "../api/types";
import { fetchConstructors_byId } from "../api/API";

export default function ConstructorPage() {
	const id: string = useParams().id ?? "";

	const [constructor, setConstructor] = useState<Constructor | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getConstructor = async () => {
			try {
				console.log("SONO IN GETCONSTRUCTOR");
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

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	return (
		<>
			<Header />
			<h1>CONSTRUCTOR {id}</h1>
			<pre>{JSON.stringify(constructor, null, 2)}</pre>
		</>
	);
}
