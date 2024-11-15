import { RecipeContext } from '@/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import { Flex } from '@package/ui/src/flex'
import { useContext } from 'react'

export default function RecipeResults() {
  const { recipes } = useContext(RecipeContext)
  return (
    <>
      <h1>Recipe Results</h1>
      <Flex className="flex-wrap">
        {recipes?.map((recipe) => (
          <div key={recipe.recipe_id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <ul>
              {recipe.ingredient_measurements.map(({ quantity, unit, ingredient }, index) => (
                <li key={index}>
                  {ingredient.name} - {quantity} {quantity && parseFloat(quantity) > 1 ? unit + 's' : unit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Flex>
    </>
  )
}
