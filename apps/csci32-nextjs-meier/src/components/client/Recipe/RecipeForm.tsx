import { useContext, useState } from 'react'
import { Button } from '@package/ui/button'
import { Card } from '@package/ui/card'
import { Code } from '@package/ui/code'
import { Field } from '@package/ui/field'
import { FieldGroup } from '@package/ui/fieldGroup'
import { Flex } from '@package/ui/flex'
import { Header } from '@package/ui/header'
import { Input } from '@package/ui/input'
import { Label } from '@package/ui/label'
import { Wrapper } from '@package/ui/wrapper'
import { RecipeContext } from '@/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'

const API_URL = process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL

type CreateRecipeProps = {
  name: string
  description: string
  ingredient_measurements: {
    ingredient_name: string
    ingredient_description: string
    quantity: number
    unit: string
  }[]
}

async function createRecipe(recipeData: CreateRecipeProps) {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  })
  if (!response.ok) {
    console.error('Failed to create recipe')
    return
  }
  const result = await response.json()
  console.log('Recipe created successfully:', result)
}

async function editRecipe(recipeId: string, recipeData: CreateRecipeProps) {
  const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  })
  if (!response.ok) {
    console.error('Failed to update recipe')
    return
  }
  const result = await response.json()
  console.log('Recipe updated successfully:', result)
}

type InitialDataType = {
  name: string
  description: string
  recipe_id?: string
  ingredient_measurements?: Array<{
    ingredient: { name: string }
    quantity: number
    unit: string
  }>
} | null

export function RecipeForm({
  editMode = false,
  initialData = null,
}: {
  editMode?: boolean
  initialData?: InitialDataType
}) {
  const { setShowRecipeForm, mutate } = useContext(RecipeContext)
  const [recipeFormData, setRecipeFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
  })
  const [ingredients, setIngredients] = useState(
    initialData?.ingredient_measurements?.map((im) => ({
      name: im.ingredient.name,
      quantity: String(im.quantity),
      unit: im.unit,
    })) || [],
  )

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = { ...newIngredients[index], [field]: value }
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const recipeName = data.get('name') as string
    const recipeDescription = data.get('description') as string
    const ingredient_measurements = []
    for (const key of data.keys()) {
      if (key.includes('ingredient-name')) {
        const index = key.split('-').pop()
        const ingredient_name = data.get(key) as string
        const unit = data.get(`ingredient-unit-${index}`) as string
        const quantity = Number(data.get(`ingredient-quantity-${index}`))
        if (!ingredient_name || !unit || isNaN(quantity)) {
          console.error('Incomplete or invalid ingredient data')
          return
        }
        ingredient_measurements.push({
          ingredient_name,
          ingredient_description: '', // Add empty description for new ingredients
          unit,
          quantity,
        })
      }
    }
    if (typeof recipeName !== 'string' || typeof recipeDescription !== 'string') {
      console.error('Invalid recipe name or description')
      return
    }
    if (ingredient_measurements.length === 0) {
      console.error('No ingredients provided')
      return
    }
    const recipeData: CreateRecipeProps = {
      name: recipeName,
      description: recipeDescription,
      ingredient_measurements,
    }

    if (editMode && initialData?.recipe_id) {
      await editRecipe(initialData.recipe_id, recipeData)
    } else {
      await createRecipe(recipeData)
    }

    setRecipeFormData({ name: '', description: '' })
    setIngredients([])
    setShowRecipeForm(false)
    mutate()
  }

  return (
    <Wrapper>
      <Header variant="h1">{editMode ? 'Edit Recipe' : 'New Recipe'}</Header>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <Label htmlFor="recipe-name">Recipe Name</Label>
            <Input
              id="recipe-name"
              name="name"
              value={recipeFormData.name}
              onChange={(e) => setRecipeFormData({ ...recipeFormData, name: e })}
              placeholder="Enter recipe name"
            />
          </Field>
          <Field>
            <Label htmlFor="recipe-description">Recipe Description</Label>
            <Input
              id="recipe-description"
              name="description"
              value={recipeFormData.description}
              onChange={(e) => setRecipeFormData({ ...recipeFormData, description: e })}
              placeholder="Enter recipe description"
            />
          </Field>
          {ingredients.map((ingredient, index) => (
            <FieldGroup key={index}>
              <Flex>
                <Label>Ingredient {index + 1}</Label>
                <Button onClick={() => removeIngredient(index)}>Remove</Button>
              </Flex>
              <Flex>
                <Input
                  id={`ingredient-name-${index}`}
                  name={`ingredient-name-${index}`}
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e)}
                />
                <Input
                  id={`ingredient-quantity-${index}`}
                  name={`ingredient-quantity-${index}`}
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e)}
                />
                <Input
                  id={`ingredient-unit-${index}`}
                  name={`ingredient-unit-${index}`}
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e)}
                />
              </Flex>
            </FieldGroup>
          ))}
          <Flex>
            <Button onClick={addIngredient}>Add Ingredient</Button>
            <Button type="submit">Submit</Button>
          </Flex>
        </FieldGroup>
      </form>
    </Wrapper>
  )
}
