import { RecipeContext } from '@/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import { Recipe, ApiResponse } from '@package/recipestacker-types/src/types'
import { Card } from '@package/ui/src/card'
import { Flex } from '@package/ui/src/flex'
import { useContext } from 'react'

export default function RecipeResults() {
  const { recipes, dbStatus, dbStatusMessage, mutate } = useContext(RecipeContext)

  const handleEdit = async (recipe: Recipe) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL}/recipes/${recipe.recipe_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })

    if (response.ok) {
      mutate()
    }
  }

  return dbStatus ? (
    <>
      <h1>Saved Recipes</h1>
      <Flex className="flex-wrap">
        {recipes?.map((recipe) => (
          <Card recipe={recipe} onEdit={() => handleEdit(recipe)} onDelete={() => mutate()} key={recipe.recipe_id} />
        ))}
      </Flex>
    </>
  ) : (
    <></>
  )
}
