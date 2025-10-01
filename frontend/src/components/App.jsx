import './App.css'

function App() {
  const recipes = [
 {
   "title": "Toast skagen",
   "description": "Gott till champagne",
   "imageUrl": "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_223427…",
   "timeInMins": 15,
   "price": 150,
   "categories": [
     "Förrätt",
     "Skaldjur",
     "Smaskigt"
   ],
   "instructions": [
     "Stek brödet",
     "Lägg på röran",
     "Toppa med Dill"
   ],
   "ingredients": [
     {
       "name": "Salt",
       "amount": 1,
       "unit": "tsk",
     },
     {
       "name": "Peppar",
       "amount": 1,
       "unit": "tsk",
     },
     {
       "name": "Smör",
       "amount": 100,
       "unit": "gram",
     }
   ],
   "avgRating": null
 },
 {
   "title": "Pina colada",
   "description": "Gott till afterwork",
   "imageUrl": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyummy-marie.com%2Fwp-content%2Fuploads%2F2024%2F08%2Fpina-colada.jpeg",
   "timeInMins": 5,
   "price": 120,
   "categories": [
     "Cocktail",
     "Dryck",
   ],
   "instructions": [
    "Blanda och dryck!"
   ],
   "ingredients": [
     {
       "name": "kokosmjölk",
       "amount": 1,
       "unit": "dl",
     },
     {
       "name": "ananasjuice",
       "amount": 2,
       "unit": "dl",
     },
     {
       "name": "vit rom",
       "amount": 8,
       "unit": "dl",
     },
     {
       "name": "krossad is",
       "amount": 2,
       "unit": "dl",
     }
   ],
   "avgRating": null
 }
]
const recipe = recipes[1];

  return (
    <>
    <div className="recipe-card">
      <h1>{recipe.title}</h1>
      <p><strong>Beskrivning:</strong> {recipe.description}</p>

      <img src={recipe.imageUrl} alt={recipe.title} width="300" />

      <p><strong>Tillagningstid:</strong> {recipe.timeInMins} minuter</p>
      <p><strong>Pris:</strong> {recipe.price} kr</p>

      <h3>Kategorier</h3>
      <ul>
        {recipe.categories.map((cat, i) => (
          <li key={i}>{cat}</li>
        ))}
      </ul>

      <h3>Instruktioner</h3>
      <ol>
        {recipe.instructions.map((instr, i) => (
          <li key={i}>{instr}</li>
        ))}
      </ol>

      <h3>Ingredienser</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>
            {ing.amount} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>

      <p>
        <strong>Genomsnittligt betyg:</strong>{" "}
        {recipe.avgRating ? recipe.avgRating : "Ingen än"}
      </p>
    </div>
    </>
  )
}

export default App
