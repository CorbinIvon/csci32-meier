import { RecipeContext } from '@/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import { Card } from '@package/ui/src/card'
import { Flex } from '@package/ui/src/flex'
import { useContext } from 'react'

export default function RecipeResults() {
  const { recipes, dbStatus, dbStatusMessage, mutate } = useContext(RecipeContext)
  return dbStatus ? (
    <>
      <h1>Saved Recipes</h1>
      <Flex className="flex-wrap">
        {recipes?.map((recipe) => (
          <Card
            key={recipe.recipe_id}
            recipeId={recipe.recipe_id}
            title={recipe.name}
            ingredients={recipe.ingredient_measurements}
            onDelete={() => mutate()}
          />
        ))}
      </Flex>
    </>
  ) : (
    <></>
  )
}
