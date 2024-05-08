import React from "react";

import { CiClock2 } from "react-icons/ci";
import { Link } from "react-router-dom";
function FeaturedArticleFigure({ title, imagePath, text, time }) {
	return (
		<Link to={"/coming-soon"}>
			<div className="feature-article__figure">
				<h3 className="feature-article__title">{title}</h3>
				<span>
					<img src={imagePath} alt={title} className="feature-article__image" />
					<div className="feature-article__description">
						<p className="feature-article__text">{text}</p>
						<p className="feature-article__time">
							<CiClock2 />
							{time}
						</p>
					</div>
				</span>
			</div>
		</Link>
	);
}

export default FeaturedArticleFigure;
