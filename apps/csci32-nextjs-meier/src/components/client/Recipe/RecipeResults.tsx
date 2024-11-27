import { RecipeContext } from '@/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import {
  Recipe,
  ApiResponse,
  UpdateRecipeDTO,
  IngredientMeasurementDTO,
  convertToUpdateRecipeDTO,
} from '@package/recipestacker-types/src/types'
import { Card } from '@package/ui/src/card'
import { Flex } from '@package/ui/src/flex'
import { useContext } from 'react'

export default function RecipeResults() {
  const { recipes, dbStatus, mutate } = useContext(RecipeContext)

  const handleEdit = async (recipe: Recipe) => {
    if (recipes) {
      // Update local state immediately with new data
      const updatedData = recipes.map((r) => (r.recipe_id === recipe.recipe_id ? recipe : r))
      await mutate(updatedData) // Update local data
    }
  }

  return dbStatus ? (
    <>
      <h1>Saved Recipes</h1>
      <Flex className="flex-wrap">
        {recipes?.map((recipe) => (
          <Card recipe={recipe} onEdit={handleEdit} onDelete={() => mutate()} key={recipe.recipe_id} />
        ))}
      </Flex>
    </>
  ) : (
    <></>
  )
}
