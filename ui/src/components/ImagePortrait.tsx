import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImagePortraitProps } from "../api/types";
import "../components/ImagePortrait.css";

function ImagePortrait(props: ImagePortraitProps) {
	const { url } = props;
	const { type } = props;
	const [imageUrl, setImageUrl] = useState("");

	async function fetchImageUrl() {
		try {
			let titleParts = url.split("/");
			let title = titleParts[titleParts.length - 1];
			const response = await axios.get(
				`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
			);
			const imageUrl = response.data.thumbnail
				? response.data.thumbnail.source
				: "";
			setImageUrl(imageUrl);
		} catch (error) {
			console.error("Error fetching data from Wikipedia:", error);
		}
	}

	useEffect(() => {
		fetchImageUrl();
	}, []);

	return (
		<div className="App">
			{imageUrl && (
				<div>
					<img src={imageUrl} alt={imageUrl} className={props.type} />
				</div>
			)}
		</div>
	);
}

export default ImagePortrait;
