import { useContext, useState } from 'react'
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
  const [editedRecipe, setEditedRecipe] = useState(initialData || ({} as Recipe))
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
    return (
      <Wrapper>
        <Header variant="h1">Edit Recipe</Header>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleEdit({
              recipe_id: editedRecipe.recipe_id,
              name: editedRecipe.name,
              description: editedRecipe.description,
              directions: editedRecipe.directions,
              ingredient_measurements: editedRecipe.ingredient_measurements.map((im) => ({
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
                value={editedRecipe.name}
                onChange={(value) => {
                  setEditedRecipe({ ...editedRecipe, name: value })
                }}
              />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={editedRecipe.description}
                onChange={(value) => {
                  setEditedRecipe({ ...editedRecipe, description: value })
                }}
              />
            </Field>
            <Field>
              <Label>Ingredients</Label>
              {editedRecipe.ingredient_measurements.map((measurement, index) => (
                <Flex key={index}>
                  <Input
                    id={`ingredient-name-${index}`}
                    name={`ingredient-name-${index}`}
                    value={measurement.ingredient.name}
                    onChange={(value) => {
                      const newMeasurements = [...editedRecipe.ingredient_measurements]
                      newMeasurements[index] = {
                        ...newMeasurements[index],
                        ingredient: {
                          ...newMeasurements[index].ingredient,
                          name: value,
                        },
                      }
                      setEditedRecipe({
                        ...editedRecipe,
                        ingredient_measurements: newMeasurements,
                      })
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
                  <Button
                    type="button"
                    className="px-2"
                    onClick={() => {
                      const newMeasurements = editedRecipe.ingredient_measurements.filter((_, i) => i !== index)
                      setEditedRecipe({
                        ...editedRecipe,
                        ingredient_measurements: newMeasurements,
                      })
                    }}
                  >
                    ✕
                  </Button>
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
                <Button
                  type="button"
                  className="px-2"
                  onClick={() => {
                    const measurements = newRecipe.ingredient_measurements.filter((_, i) => i !== index)
                    setNewRecipe({ ...newRecipe, ingredient_measurements: measurements })
                  }}
                >
                  ✕
                </Button>
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
