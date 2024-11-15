import { RecipeForm } from './RecipeForm'
import { RecipeContext } from '../../../app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import { Wrapper } from '@package/ui/wrapper'
import { Flex } from '@package/ui/flex'
import { useContext } from 'react'
import { Button } from '@package/ui/button'
import { Variant } from '@package/ui/variant'
import { Header } from '@package/ui/header'
import RecipeSearch from './RecipeSearch'
import RecipeResults from './RecipeResults'

export default function RecipeHome() {
  const { showRecipeForm, setShowRecipeForm } = useContext(RecipeContext)
  return (
    <Wrapper>
      <Flex className=" items-center w-full justify-between">
        <Header variant="h1">Welcome to RecipeStacker</Header>
        <Button
          variant={Variant.TERTIARY}
          onClick={() => {
            setShowRecipeForm(!showRecipeForm)
          }}
        >
          {showRecipeForm ? 'Search Recipes' : 'Create Recipe'}
        </Button>
      </Flex>

      <Flex className="flex-col gap-y-8 mt-8">
        {showRecipeForm ? (
          <RecipeForm />
        ) : (
          <>
            <RecipeSearch />
            <RecipeResults />
          </>
        )}
      </Flex>
    </Wrapper>
  )
}
