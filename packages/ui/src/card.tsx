import React from 'react'

const API_URL = process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL

// types from: root/apps/csci32-nextjs-meier/src/app/pages/CSCI32Assignments/recipestacker/context/RecipeContext.tsx
type RecipeType = {
  recipe_id: string
  name: string
  description: string
  ingredient_measurements: IngredientMeasurement[]
}

type Ingredient = {
  ingredient_id?: string
  name: string
  description: string
}

type IngredientMeasurement = {
  ingredient: Ingredient
  unit: string
  quantity: string
}

async function deleteRecipe(recipeId: string) {
  const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    console.error('Failed to delete recipe')
    return false
  }
  return true
}

export function Card({
  recipe,
  onDelete,
  onEdit,
  className,
}: {
  recipe: RecipeType
  className?: string
  onDelete?: () => void
  onEdit?: (recipe: RecipeType) => void
}): JSX.Element {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedRecipe, setEditedRecipe] = React.useState<RecipeType>(recipe)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this recipe? This action can not be undone')) {
      if (recipe.recipe_id) {
        const success = await deleteRecipe(recipe.recipe_id)
        if (success && onDelete) {
          onDelete()
        }
      }
    }
  }

  const editContent = (
    <div className="relative">
      <div className="absolute top-0 right-0 -mt-3 -mr-3 inline-flex">
        <button
          type="button"
          onClick={() => {
            if (onEdit) onEdit(editedRecipe)
            setIsEditing(false)
          }}
          className="w-6 h-6 rounded-full mr-2
                   flex items-center justify-center
                   bg-white border border-gray-200
                   hover:bg-green-500 hover:border-green-500 hover:text-white
                   transition-colors duration-200
                   text-base leading-none"
          aria-label="Confirm edit"
        >
          ✓
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="w-6 h-6 rounded-full
                   flex items-center justify-center
                   bg-white border border-gray-200
                   hover:bg-red-500 hover:border-red-500 hover:text-white
                   transition-colors duration-200
                   text-xl font-bold leading-none"
          aria-label="Cancel edit"
        >
          ×
        </button>
      </div>

      <input
        type="text"
        value={editedRecipe.name}
        onChange={(e) => setEditedRecipe({ ...editedRecipe, name: e.target.value })}
        className="text-xl font-bold mb-3 w-full p-1 border rounded"
      />
      <textarea
        value={editedRecipe.description}
        onChange={(e) => setEditedRecipe({ ...editedRecipe, description: e.target.value })}
        className="w-full p-1 mb-4 border rounded"
      />
      {editedRecipe.ingredient_measurements.length > 0 && (
        <ul className="space-y-2 text-sm">
          {editedRecipe.ingredient_measurements.map((measurement, index) => (
            <li key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={measurement.ingredient.name}
                onChange={(e) => {
                  const newMeasurements = [...editedRecipe.ingredient_measurements]
                  if (newMeasurements && newMeasurements[index]) {
                    newMeasurements[index].ingredient.name = e.target.value
                    setEditedRecipe({ ...editedRecipe, ingredient_measurements: newMeasurements })
                  }
                }}
                className="flex-grow p-1 border rounded"
              />
              <input
                type="text"
                value={measurement.quantity}
                onChange={(e) => {
                  const newMeasurements = [...editedRecipe.ingredient_measurements]
                  if (newMeasurements && newMeasurements[index]) {
                    newMeasurements[index].quantity = e.target.value
                    setEditedRecipe({ ...editedRecipe, ingredient_measurements: newMeasurements })
                  }
                }}
                className="w-20 p-1 border rounded"
              />
              <input
                type="text"
                value={measurement.unit}
                onChange={(e) => {
                  const newMeasurements = [...editedRecipe.ingredient_measurements]
                  if (newMeasurements && newMeasurements[index]) {
                    newMeasurements[index].unit = e.target.value
                    setEditedRecipe({ ...editedRecipe, ingredient_measurements: newMeasurements })
                  }
                }}
                className="w-20 p-1 border rounded"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  const content = !isEditing ? (
    <form onSubmit={handleSubmit} className="relative">
      {(onDelete || onEdit) && recipe.recipe_id && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 inline-flex">
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setIsEditing(true)
              }}
              className="w-6 h-6 rounded-full mr-2
                     flex items-center justify-center
                     bg-white border border-gray-200
                     hover:bg-blue-500 hover:border-blue-500 hover:text-white
                     transition-colors duration-200
                     text-base leading-none"
              aria-label="Edit recipe"
            >
              ✎
            </button>
          )}
          {onDelete && (
            <button
              type="submit"
              className="w-6 h-6 rounded-full
                     flex items-center justify-center
                     bg-white border border-gray-200
                     hover:bg-red-500 hover:border-red-500 hover:text-white
                     transition-colors duration-200
                     text-xl font-bold leading-none"
              aria-label="Delete recipe"
            >
              ×
            </button>
          )}
        </div>
      )}

      <h2 className="text-xl font-bold mb-3 text-gray-800">{recipe.name}</h2>
      <div className="text-gray-600 mb-4">{recipe.description}</div>
      {recipe.ingredient_measurements.length > 0 && (
        <ul className="space-y-2 text-sm text-gray-600">
          {recipe.ingredient_measurements.map(({ quantity, unit, ingredient }, index) => (
            <li key={index} className="flex items-center">
              <span className="font-medium">{ingredient.name}</span>
              <span className="mx-2">-</span>
              <span>
                {quantity} {quantity && parseFloat(quantity) > 1 ? unit + 's' : unit}
              </span>
            </li>
          ))}
        </ul>
      )}
    </form>
  ) : (
    editContent
  )

  const cardClasses = `
    block p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200
    bg-white border border-gray-200
    min-w-[300px] max-w-sm m-4
    ${className || ''}
  `.trim()

  return <div className={cardClasses}>{content}</div>
}
