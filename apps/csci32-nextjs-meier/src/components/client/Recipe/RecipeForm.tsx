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

const { setShowRecipeForm, mutate } = useContext(RecipeContext)

type CreateRecipeProps = {
  name: string
  description: string
  ingredient_measurements: {
    ingredient_name: string
    quantity: string
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

export function RecipeForm() {
  const [recipeFormData, setRecipeFormData] = useState({ name: '', description: '' })
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string; unit: string }[]>([])

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
        const quantity = data.get(`ingredient-quantity-${index}`) as string
        if (!ingredient_name || !unit || !quantity) {
          console.error('Incomplete ingredient data')
          return
        }
        ingredient_measurements.push({
          ingredient_name,
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
    await createRecipe(recipeData)
    setRecipeFormData({ name: '', description: '' })
    setIngredients([])
    mutate()
  }

  return (
    <Wrapper>
      <Header variant="h1">Recipe Form</Header>
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
