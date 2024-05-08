import React, { useState, useEffect } from "react";
// import Card from "./Card";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

function TopCreators() {
	const [creators, setCreators] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URL}/users/creator/top-creators`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				const users = data.data.allTopCreators;
				setCreators(users);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	}, []);

	console.log(creators);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<section className="section top-creator__section">
			<div className="section__container">
				<h3 className="heading__tetariary">Top creators</h3>
				<div
					className="top-creators__cards"
					style={{
						gridTemplateColumns: `repeat(${creators.length || 0}, 1fr)`,
					}}
				>
					{Array.isArray(creators) && creators.length > 0 && (
						creators.map((creator) => {
							return (
								<Link to={`/${creator.username}/blogs`}>
									<figure className="card__figure">
										{creator.image ? (
											<img
												className="card__figure--image"
												src={creator.image}
											/>
										) : (
											<div className="card__figure--image">
												
											</div>
										)}

										<p className="card__figure--title">{creator.username}</p>
									</figure>
								</Link>
							);
						})
					)}
				</div>
			</div>
		</section>
	);
}

export default TopCreators;
