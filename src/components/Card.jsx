import { Link } from "react-router-dom";

function Card({ name, imagePath, type }) {

    return (
        <Link to={`/category/${name}`}>
            <figure className="card__figure">
                <img className="" src={type === 'blog-cat' ? `${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${imagePath}` : imagePath} alt={name} />
                <span className="figure--details">
                    <p className="card__figure--title">{name}</p>
                </span>
            </figure>
        </Link>
    );
}

export default Card;
