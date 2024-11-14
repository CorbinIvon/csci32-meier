import React, { createContext, ReactNode, useState } from 'react'

export type RecipeContextType = {
  showRecipeForm: boolean
  setShowRecipeForm: (showRecipeForm: boolean) => void
}

const RecipeContext = createContext<RecipeContextType>({
  showRecipeForm: true,
  setShowRecipeForm: () => {},
})

const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [showRecipeForm, setShowRecipeForm] = useState(true)

  return (
    <RecipeContext.Provider
      value={{
        showRecipeForm,
        setShowRecipeForm,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export { RecipeContext, RecipeProvider }
