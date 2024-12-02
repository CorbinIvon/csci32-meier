import { RecipeContext } from '@/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import {
  Recipe,
  RecipeContextType,
  ApiResponse,
  UpdateRecipeDTO,
  IngredientMeasurementDTO,
  convertToUpdateRecipeDTO,
} from '@package/recipestacker-types/src/types'
import { Card } from '@package/ui/src/card'
import { Flex } from '@package/ui/src/flex'
import { useContext } from 'react'

export default function RecipeResults() {
  const { recipes, dbStatus, mutate } = useContext<RecipeContextType>(RecipeContext)

  const handleEdit = async (recipe: Recipe) => {
    if (Array.isArray(recipes)) {
      const updatedData = recipes.map((r) => (r.recipe_id === recipe.recipe_id ? recipe : r))
      await mutate(updatedData)
    }
  }

  const savedRecipe = Array.isArray(recipes)
    ? recipes.map((recipe) => (
        <Card recipe={recipe} onEdit={handleEdit} onDelete={() => mutate()} key={recipe.recipe_id} />
      ))
    : []

  if (!dbStatus) return null

  return (
    <>
      <h1>Saved Recipes</h1>
      <Flex className="flex-wrap">{recipes?.length === 0 ? <p>No recipes found</p> : savedRecipe}</Flex>
    </>
  )
}
