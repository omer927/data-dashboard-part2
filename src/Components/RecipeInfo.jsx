import { Link } from "react-router"

const RecipeInfo = ({ id, image, title, price }) => {
    return (
        <li className="main-list">
            <Link to={`/recipe/${id}`}>
                <img className="icons" src={image} alt={title} width="100px" />
                <h3>{title}</h3>
                <p>Cost per serving: ${ (price/100).toFixed(2) }</p>
            </Link>
        </li>
    );
};

export default RecipeInfo