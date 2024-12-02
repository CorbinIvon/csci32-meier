import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { useRecipes } from '../hooks/useRecipes'
import { Recipe, RecipeContextType } from '@package/recipestacker-types/src/types'

const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  mutate: () => Promise.resolve(),
  recipeNameQuery: '',
  setRecipeNameQuery: () => {},
  ingredients: [],
  ingredientQuery: '',
  removeIngredient: () => {},
  setIngredients: () => {},
  setIngredientQuery: () => {},
  showRecipeForm: false,
  setShowRecipeForm: () => {},
  dbStatus: false,
  dbStatusMessage: undefined,
  editingRecipe: null,
  handleEdit: () => {},
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
  const [dbStatus, setDbStatus] = useState(false)
  const [dbStatusMessage, setDbStatusMessage] = useState<string>('')
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL}/`)
        const data = await response.json()
        console.log(data)
        setDbStatus(data.root)
        if (data.error) setDbStatusMessage(`Error: ${data.error.name}`)
      } catch (error) {
        setDbStatus(false)
        setDbStatusMessage(`Failed to connect to API: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    checkDatabase()
    const interval = setInterval(checkDatabase, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const { data: recipes, mutate } = useRecipes({ name: recipeNameQuery, ingredients: ingredients.join(',') })

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe)
    setShowRecipeForm(true)
  }

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
        dbStatus,
        dbStatusMessage,
        editingRecipe,
        handleEdit,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export { RecipeContext, RecipeProvider }
