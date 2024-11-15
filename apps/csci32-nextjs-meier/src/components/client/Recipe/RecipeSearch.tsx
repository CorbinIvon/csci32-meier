import { Field } from '@package/ui/src/field'
import { Flex } from '@package/ui/src/flex'
import { Header } from '@package/ui/src/header'
import { Input } from '@package/ui/src/input'
import { Label } from '@package/ui/src/label'
import { IngredientList } from './IngredientList'
import { RecipeContext } from '@/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import { useContext } from 'react'

export default function RecipeSearch() {
  const { setIngredientQuery, ingredientQuery, recipeNameQuery, setIngredients, setRecipeNameQuery, ingredients } =
    useContext(RecipeContext)
  return (
    <>
      <Header className="justify-between">Search Recipes</Header>
      <Flex className="flex-col">
        <Field>
          <Label>Ingredients</Label>
          <Input
            name="ingredient-search"
            id="ingredient-search"
            value={ingredientQuery}
            onChange={(newIngredientsQuery) => setIngredientQuery(newIngredientsQuery)}
            onEnter={(newIngredient) => {
              setIngredients([...ingredients, newIngredient])
              setIngredientQuery('')
            }}
          />
        </Field>
        <IngredientList />
        <Field>
          <Label>Recipe name</Label>
          <Input
            name="recipe-name-search"
            id="recipe-name-search"
            value={recipeNameQuery}
            onChange={(newRecipeQuery) => setRecipeNameQuery(newRecipeQuery)}
            onEnter={(recipeNameQuery) => setRecipeNameQuery(recipeNameQuery)}
          />
        </Field>
      </Flex>
    </>
  )
}
