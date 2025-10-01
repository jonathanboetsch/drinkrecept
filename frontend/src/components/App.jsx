import './App.css'
import Recipe from './Recipe.jsx'

function App() {
  const recipes = [
 {
    "_id": "68dcfa838a8cd70776c0ef8e",
    "title": "Toast skagen",
    "description": "Gott till champagne",
    "imageUrl": "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_223427/cf_259/korvstroganoff_med_ris.jpg",
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
        "_id": "68dcfa838a8cd70776c0ef8f"
      },
      {
        "name": "Peppar",
        "amount": 1,
        "unit": "tsk",
        "_id": "68dcfa838a8cd70776c0ef90"
      },
      {
        "name": "Smör",
        "amount": 100,
        "unit": "gram",
        "_id": "68dcfa838a8cd70776c0ef91"
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

  return (
    <>
    { recipes.map( (r, i) => (<Recipe key={i} recipe={r}/>))}
  </>
  );
}
export default App;
