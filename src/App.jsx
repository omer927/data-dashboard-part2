import { useState, useEffect } from 'react';
import RecipeInfo from './Components/RecipeInfo';
import SideBar from './Components/SideBar';
import './App.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState([]); 
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchAllRecipeData = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&fillIngredients=true&number=12`
      );
      const data = await response.json();
      if (data.results) {
        setList(data.results);
        setFilteredResults(data.results);
      }
    };
    fetchAllRecipeData().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    if (searchValue !== "") {
      const filteredData = list.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  const filterByPrice = (maxPrice) => {
    if (maxPrice === "all") {
      setFilteredResults(list);
    } else {
      const filtered = list.filter((recipe) => recipe.pricePerServing <= maxPrice);
      setFilteredResults(filtered);
    }
  };

  // Safe calculations: These now work because list is [] initially
  const totalRecipes = list.length;
  const avgPrice = list.length > 0 ? (list.reduce((acc, curr) => acc + curr.pricePerServing, 0) / list.length).toFixed(2) : 0;
  const mostExpensive = list.length > 0 ? Math.max(...list.map(r => r.pricePerServing)).toFixed(2) : 0;

  return (
    <div className="whole-page">
      <h1>Student Budget Gourmet</h1>
      
      <div className="stats-container">
        <p>Total Recipes: {totalRecipes}</p>
        <p>Avg Price: ${avgPrice}</p>
        <p>Max Price: ${mostExpensive}</p>
      </div>

      <input 
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => searchItems(e.target.value)}
      />

      <ul>
        {filteredResults.map((recipe) => (
          <RecipeInfo 
            key={recipe.id}
            image={recipe.image}
            title={recipe.title}
            price={recipe.pricePerServing}
          />
        ))}
      </ul>
      
      <SideBar filterByPrice={filterByPrice} />
    </div>
  );
}

export default App;