import { RecipeForm } from './RecipeForm'
import { RecipeContext } from '../../../app/pages/CSCI32Assignments/recipestacker/context/RecipeContext'
import { Wrapper } from '@package/ui/wrapper'
import { Flex } from '@package/ui/flex'
import { useContext, useEffect, useState } from 'react'
import { Button } from '@package/ui/button'
import { Variant } from '@package/ui/variant'
import { Header } from '@package/ui/header'
import RecipeSearch from './RecipeSearch'
import RecipeResults from './RecipeResults'
import { Popup, PopupType } from '@package/ui/src/popup'

export default function RecipeHome() {
  const { showRecipeForm, setShowRecipeForm, dbStatus, dbStatusMessage } = useContext(RecipeContext)
  const [showDbError, setShowDbError] = useState(false)

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL}/`)
        if (!response.ok) {
          setShowDbError(true)
          console.warn('Database connection error:', response.statusText)
        } else {
          setShowDbError(false)
          console.warn(
            `Database connection successful: ${process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL}`,
            response.statusText,
          )
        }
      } catch (error) {
        setShowDbError(true)
      }
    }

    checkDatabase()
  }, [])
  const popup = showDbError ? (
    <Popup message={`Database connection error. Please try again later. ${dbStatusMessage}`} type={PopupType.ERROR} />
  ) : null
  return (
    <Wrapper>
      <Flex className=" items-center w-full justify-between">
        <Header variant="h1">RecipeStacker</Header>
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
        {dbStatus ? (
          showRecipeForm ? (
            <RecipeForm />
          ) : (
            <>
              <RecipeSearch />
              <RecipeResults />
            </>
          )
        ) : (
          <>
            {popup}
            <Flex className="w-full h-screen items-center justify-center flex-col gap-4">
              <p>Loading Recipes...</p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </Flex>
          </>
        )}
      </Flex>
    </Wrapper>
  )
}
