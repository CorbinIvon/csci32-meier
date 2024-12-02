import { Button } from '@package/ui/src/button'
import { Flex } from '@package/ui/src/flex'
import { Header } from '@package/ui/src/header'
import { IngredientMeasurement } from '@package/recipestacker-types/src/types'

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
          <Button>Update</Button>
          <Button>Delete</Button>
        </Flex>
      </Flex>
      <div>
        <p>{description}</p>
        <ul>
          {ingredient_measurements?.map(({ quantity, unit, ingredient }, index) => (
            <li key={index}>
              {ingredient.name} - {quantity} {quantity && Number(quantity) > 1 ? unit + 's' : unit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
