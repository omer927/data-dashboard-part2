const RecipeInfo = ({ image, title, price }) => {
    return (
        <li className="main-list">
            <img className="icons" src={image} alt={title} width="100px" />
            <h3>{title}</h3>
            <p>Cost per serving: {price ? `$${(price / 100).toFixed(2)}` : 'N/A'}</p>
        </li>
    );
};
export default RecipeInfo;