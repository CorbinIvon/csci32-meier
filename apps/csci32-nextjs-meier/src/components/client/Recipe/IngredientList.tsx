import { Flex } from '@package/ui/flex'
import { Tag } from '@package/ui/tag'
import { useContext } from 'react'
import { RecipeContext } from '../../../app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'

export function IngredientList() {
  const { ingredients, removeIngredient } = useContext(RecipeContext)

  return (
    <Flex className="gap-4">
      {ingredients.map((ingredient) => (
        <Tag key={ingredient} onClickX={() => removeIngredient(ingredient)}>
          {ingredient}
        </Tag>
      ))}
    </Flex>
  )
}
