import React from "react";
import { Link } from "react-router-dom";

function PopularCoursesCards({ name, imagePath }) {
    return (
        <figure className="card__figure">
            <Link to="/coming-soon">
                <img src={imagePath} alt={name} />
                <span className="figure--details">
                    <p className="card__figure--title">{name}</p>
                </span>
            </Link>
        </figure>
    )
}

export default PopularCoursesCards;