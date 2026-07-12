import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
const API_KEY = import.meta.env.VITE_APP_API_KEY

function RecipeDetail() {
    const { id } = useParams() // This matches the :id in main.jsx
    const [details, setDetails] = useState(null)

    useEffect(() => {
        const getRecipeDetail = async () => {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            )
            const data = await response.json()
            setDetails(data)
        }
        if (id) getRecipeDetail().catch(console.error)
    }, [id])

    if (!details) return <div>Loading...</div>

    return (
        <div>
            <h1>{details.title}</h1>
            <img src={details.image} alt={details.title} />
            <p>{details.summary.replace(/<[^>]*>?/gm, '')}</p>
            <table>
                <tbody>
                    <tr><th>Ready in Minutes</th><td>{details.readyInMinutes}</td></tr>
                    <tr><th>Health Score</th><td>{details.healthScore}</td></tr>
                    {/* Add other details here */}
                </tbody>
            </table>
        </div>
    )
}
export default RecipeDetail