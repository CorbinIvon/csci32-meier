import { useContext } from 'react'
import { Button } from '@package/ui/button'
import { Card } from '@package/ui/src/card'
import { Field } from '@package/ui/field'
import { FieldGroup } from '@package/ui/fieldGroup'
import { Flex } from '@package/ui/flex'
import { Header } from '@package/ui/header'
import { Input } from '@package/ui/input'
import { Label } from '@package/ui/label'
import { Wrapper } from '@package/ui/wrapper'
import { RecipeContext } from '@/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import { CreateRecipeDTO, Recipe, IngredientMeasurementDTO } from '@package/recipestacker-types/src/types'

const API_URL = process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL

async function createRecipe(recipeData: CreateRecipeDTO) {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  })
  if (!response.ok) {
    throw new Error('Failed to create recipe')
  }
  return response.json()
}

type InitialDataType = Recipe | null

export function RecipeForm({
  editMode = false,
  initialData = null,
}: {
  editMode?: boolean
  initialData?: InitialDataType
}) {
  const { setShowRecipeForm, mutate } = useContext(RecipeContext)

  const handleEdit = async (updatedRecipe: Recipe) => {
    try {
      await fetch(`${API_URL}/recipes/${updatedRecipe.recipe_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      })
      setShowRecipeForm(false)
      mutate()
    } catch (error) {
      console.error('Failed to update recipe:', error)
    }
  }

  const handleCreate = async (recipe: CreateRecipeDTO) => {
    try {
      await createRecipe(recipe)
      setShowRecipeForm(false)
      mutate()
    } catch (error) {
      console.error('Failed to create recipe:', error)
    }
  }

  if (editMode && initialData) {
    return (
      <Wrapper>
        <Header variant="h1">Edit Recipe</Header>
        <Card
          recipe={initialData}
          onEdit={handleEdit}
          onDelete={() => {
            setShowRecipeForm(false)
            mutate()
          }}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Header variant="h1">New Recipe</Header>
      <Card
        recipe={{
          recipe_id: '',
          name: '',
          description: '',
          directions: '',
          ingredient_measurements: [],
        }}
        onEdit={(recipe) =>
          handleCreate({
            name: recipe.name,
            description: recipe.description || '',
            ingredient_measurements: recipe.ingredient_measurements.map((im) => ({
              unit: im.unit,
              quantity: im.quantity,
              ingredient_name: im.ingredient.name,
              ingredient_description: im.ingredient.description || '',
            })),
          })
        }
      />
    </Wrapper>
  )
}
