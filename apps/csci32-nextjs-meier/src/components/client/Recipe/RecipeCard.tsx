import { IngredientMeasurement } from '@/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import { Button } from '@package/ui/src/button'
import { Flex } from '@package/ui/src/flex'
import { Header } from '@package/ui/src/header'

export type RecipeCardProps = {
  recipe_id: string
  name: string | null
  description: string | null
  ingredient_measurements: IngredientMeasurement[] | null
}

export default function RecipeCard({ name, description, ingredient_measurements }: RecipeCardProps) {
  return (
    <div>
      <Flex>
        <Header className="justify-between">{name}</Header>
        <Flex>
          // onClick alert('Update not implemented')
          <Button>Update</Button>
          // onClick alert('Delete not implemented')
          <Button>Delete</Button>
        </Flex>
      </Flex>
      <div>
        <p>{description}</p>
        <ul>
          {ingredient_measurements?.map(({ quantity, unit, ingredient }, index) => (
            <li key={index}>
              {ingredient.name} - {quantity} {quantity && parseFloat(quantity) > 1 ? unit + 's' : unit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
