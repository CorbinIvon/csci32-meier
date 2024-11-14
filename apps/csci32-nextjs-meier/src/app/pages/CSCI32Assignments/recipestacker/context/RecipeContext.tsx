import React, { createContext, ReactNode, useState } from 'react'
import { useRecipes } from '../hooks/useRecipes'

export type RecipeContextType = {
  recipes: RecipeType[]
  mutate: () => void
  recipeNameQuery: string
  setRecipeNameQuery: (query: string) => void
  ingredients: string[]
  ingredientQuery: string
  removeIngredient: (index: string) => void
  setIngredients: (ingredients: string[]) => void
  setIngredientQuery: (query: string) => void
  showRecipeForm: boolean
  setShowRecipeForm: (showRecipeForm: boolean) => void
}

export type Ingredient = {
  ingredient_id?: string
  name: string
  description: string
}

export type IngredientMeasurement = {
  ingredient: Ingredient
  unit: string
  quantity: string
}

export type RecipeType = {
  recipe_id: string
  name: string
  description: string
  ingredient_measurements: IngredientMeasurement[]
}

const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  mutate: () => {},
  recipeNameQuery: '',
  setRecipeNameQuery: () => {},
  ingredients: [],
  ingredientQuery: '',
  removeIngredient: () => {},
  setIngredients: () => {},
  setIngredientQuery: () => {},
  showRecipeForm: false,
  setShowRecipeForm: () => {},
})

const RecipeProvider = ({ children }: { children: ReactNode }) => {
  function removeIngredient(name: string) {
    const newIngredients = ingredients.filter((ingredient) => ingredient !== name)
    console.log('ingredients', newIngredients)
    setIngredients(newIngredients)
  }

  const [showRecipeForm, setShowRecipeForm] = useState(false)
  const [recipeNameQuery, setRecipeNameQuery] = useState('')
  const [ingredientQuery, setIngredientQuery] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([])

  const { data: recipes, mutate } = useRecipes({ name: recipeNameQuery, ingredients: ingredients.join(',') })

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        mutate,
        recipeNameQuery,
        setRecipeNameQuery,
        ingredients,
        ingredientQuery,
        removeIngredient,
        setIngredients,
        setIngredientQuery,
        showRecipeForm,
        setShowRecipeForm,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export { RecipeContext, RecipeProvider }
