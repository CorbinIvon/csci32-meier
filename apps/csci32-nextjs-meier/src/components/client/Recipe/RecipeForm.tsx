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
import { CreateRecipeDTO, Recipe, UpdateRecipeDTO, RecipeContextType } from '@package/recipestacker-types/src/types'
import React from 'react'

const API_URL = process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL

async function createRecipe(recipeData: CreateRecipeDTO): Promise<Recipe> {
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
  const { setShowRecipeForm, mutate } = useContext<RecipeContextType>(RecipeContext)

  const handleEdit = async (updatedRecipe: UpdateRecipeDTO) => {
    try {
      const response = await fetch(`${API_URL}/recipes/${updatedRecipe.recipe_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      })
      if (!response.ok) throw new Error('Failed to update recipe')
      setShowRecipeForm(false)
      mutate()
    } catch (error) {
      console.error('Failed to update recipe:', error)
    }
  }

  const handleCreate = async (recipe: CreateRecipeDTO) => {
    try {
      await createRecipe({
        name: recipe.name,
        description: recipe.description,
        ingredient_measurements: recipe.ingredient_measurements.map((im) => ({
          unit: im.unit,
          quantity: im.quantity,
          ingredient_name: im.ingredient_name,
          ingredient_description: im.ingredient_description || '',
          ingredient_id: im.ingredient_id,
        })),
      })
      setShowRecipeForm(false)
      mutate()
    } catch (error) {
      console.error('Failed to create recipe:', error)
    }
  }

  if (editMode && initialData) {
    const recipe = initialData
    return (
      <Wrapper>
        <Header variant="h1">Edit Recipe</Header>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleEdit({
              recipe_id: recipe.recipe_id,
              name: recipe.name,
              description: recipe.description,
              directions: recipe.directions,
              ingredient_measurements: recipe.ingredient_measurements.map((im) => ({
                unit: im.unit,
                quantity: im.quantity,
                ingredient_name: im.ingredient.name,
                ingredient_description: im.ingredient.description || '',
                ingredient_id: im.ingredient.ingredient_id,
              })),
            })
          }}
        >
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Recipe Name</Label>
              <Input
                id="name"
                name="name"
                value={recipe.name}
                onChange={(value) => {
                  recipe.name = value
                }}
              />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={recipe.description}
                onChange={(value) => {
                  recipe.description = value
                }}
              />
            </Field>
            <Field>
              <Label>Ingredients</Label>
              {recipe.ingredient_measurements.map((measurement, index) => (
                <Flex key={index}>
                  <Input
                    id={`ingredient-name-${index}`}
                    name={`ingredient-name-${index}`}
                    value={measurement.ingredient.name}
                    onChange={(value) => {
                      measurement.ingredient.name = value
                    }}
                    placeholder="Ingredient name"
                  />
                  <Input
                    id={`ingredient-quantity-${index}`}
                    name={`ingredient-quantity-${index}`}
                    type="number"
                    value={measurement.quantity}
                    onChange={(value) => {
                      measurement.quantity = Number(value)
                    }}
                    placeholder="Quantity"
                  />
                  <Input
                    id={`ingredient-unit-${index}`}
                    name={`ingredient-unit-${index}`}
                    value={measurement.unit}
                    onChange={(value) => {
                      measurement.unit = value
                    }}
                    placeholder="Unit"
                  />
                </Flex>
              ))}
            </Field>
          </FieldGroup>
          <Flex className="mt-4">
            <Button type="submit">Save Changes</Button>
          </Flex>
        </form>
      </Wrapper>
    )
  }

  // New Recipe Form
  const [newRecipe, setNewRecipe] = React.useState<CreateRecipeDTO>({
    name: '',
    description: '',
    ingredient_measurements: [
      {
        unit: '',
        quantity: 0,
        ingredient_name: '',
        ingredient_description: '',
      },
    ],
  })

  return (
    <Wrapper>
      <Header variant="h1">New Recipe</Header>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleCreate(newRecipe)
        }}
      >
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Recipe Name</Label>
            <Input
              id="name"
              name="name"
              value={newRecipe.name}
              onChange={(value) => setNewRecipe({ ...newRecipe, name: value })}
            />
          </Field>
          <Field>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={newRecipe.description}
              onChange={(value) => setNewRecipe({ ...newRecipe, description: value })}
            />
          </Field>
          <Field>
            <Label>Ingredients</Label>
            {newRecipe.ingredient_measurements.map((measurement, index) => (
              <Flex key={index}>
                <Input
                  id={`new-ingredient-name-${index}`}
                  name={`new-ingredient-name-${index}`}
                  value={measurement.ingredient_name}
                  onChange={(value) => {
                    const measurements = [...newRecipe.ingredient_measurements]
                    measurements[index] = { ...measurements[index], ingredient_name: value }
                    setNewRecipe({ ...newRecipe, ingredient_measurements: measurements })
                  }}
                  placeholder="Ingredient name"
                />
                <Input
                  id={`new-ingredient-quantity-${index}`}
                  name={`new-ingredient-quantity-${index}`}
                  type="number"
                  value={measurement.quantity}
                  onChange={(value) => {
                    const measurements = [...newRecipe.ingredient_measurements]
                    measurements[index] = { ...measurements[index], quantity: Number(value) }
                    setNewRecipe({ ...newRecipe, ingredient_measurements: measurements })
                  }}
                  placeholder="Quantity"
                />
                <Input
                  id={`new-ingredient-unit-${index}`}
                  name={`new-ingredient-unit-${index}`}
                  value={measurement.unit}
                  onChange={(value) => {
                    const measurements = [...newRecipe.ingredient_measurements]
                    measurements[index] = { ...measurements[index], unit: value }
                    setNewRecipe({ ...newRecipe, ingredient_measurements: measurements })
                  }}
                  placeholder="Unit"
                />
              </Flex>
            ))}
            <Button
              type="button"
              onClick={() => {
                setNewRecipe({
                  ...newRecipe,
                  ingredient_measurements: [
                    ...newRecipe.ingredient_measurements,
                    { unit: '', quantity: 0, ingredient_name: '', ingredient_description: '' },
                  ],
                })
              }}
            >
              Add Ingredient
            </Button>
          </Field>
        </FieldGroup>
        <Flex className="mt-4">
          <Button type="submit">Create Recipe</Button>
        </Flex>
      </form>
    </Wrapper>
  )
}
