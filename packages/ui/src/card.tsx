import { type ReactElement, useState } from 'react'
import { Recipe, UpdateRecipeDTO, Ingredient } from '@package/recipestacker-types/src/types'
import { Input } from './input'

// Use a type-safe way to handle the API URL
const API_URL = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL || '' : ''

export function Card({
  recipe,
  onDelete,
  onEdit,
  className,
}: {
  recipe: Recipe
  className?: string
  onDelete?: () => void
  onEdit?: (recipe: Recipe) => void
}): ReactElement {
  const [isEditing, setIsEditing] = useState(false)
  const [editedRecipe, setEditedRecipe] = useState<Recipe>(recipe)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this recipe? This action can not be undone')) {
      try {
        const response = await fetch(`${API_URL}/recipes/${editedRecipe.recipe_id}`, {
          method: 'DELETE',
        })
        if (response.ok && onDelete) {
          onDelete()
        }
      } catch (error) {
        console.error('Failed to delete recipe:', error)
      }
    }
  }

  const handleEdit = async () => {
    if (onEdit && editedRecipe.recipe_id) {
      const updateDTO: UpdateRecipeDTO = {
        recipe_id: editedRecipe.recipe_id,
        name: editedRecipe.name,
        description: editedRecipe.description,
        directions: editedRecipe.directions,
        ingredient_measurements: editedRecipe.ingredient_measurements.map((im) => ({
          unit: im.unit,
          quantity: im.quantity,
          ingredient_name: im.ingredient.name,
          ingredient_description: im.ingredient.description || '',
          ingredient_id: im.ingredient.ingredient_id,
        })),
      }

      try {
        const response = await fetch(`${API_URL}/recipes/${editedRecipe.recipe_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateDTO),
        })

        if (response.ok) {
          const updatedRecipe = await response.json()
          onEdit(updatedRecipe) // Pass the server response instead of editedRecipe
          setIsEditing(false)
        } else {
          console.error('Failed to update recipe:', await response.text())
        }
      } catch (error) {
        console.error('Error updating recipe:', error)
      }
    }
  }

  const editContent = (
    <div className="relative">
      <div className="absolute top-0 right-0 -mt-3 -mr-3 inline-flex">
        <button
          type="button"
          onClick={handleEdit}
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

      <Input
        id="recipe-name"
        name="recipe-name"
        value={editedRecipe.name}
        onChange={(value) => setEditedRecipe({ ...editedRecipe, name: value })}
        className="text-xl font-bold mb-3 w-full"
        placeholder="Recipe name"
      />

      <textarea
        value={editedRecipe.description}
        onChange={(e) => setEditedRecipe({ ...editedRecipe, description: e.target.value })}
        className="w-full p-1 mb-4 border rounded"
        placeholder="Recipe description"
      />

      {editedRecipe.ingredient_measurements.length > 0 && (
        <ul className="space-y-2 text-sm">
          {editedRecipe.ingredient_measurements.map((measurement, index) => (
            <li key={index} className="flex items-center gap-2">
              <Input
                id={`ingredient-${index}`}
                name={`ingredient-${index}`}
                value={measurement.ingredient?.name || ''}
                onChange={(value) => {
                  const newMeasurements = [...editedRecipe.ingredient_measurements]
                  newMeasurements[index] = {
                    ...newMeasurements[index],
                    ingredient: {
                      ...measurement.ingredient,
                      name: value,
                      ingredient_id: measurement.ingredient.ingredient_id || '',
                      description: measurement.ingredient.description || '',
                    } as Ingredient,
                    unit: measurement.unit || '',
                    quantity: measurement.quantity || 0,
                  }
                  setEditedRecipe({ ...editedRecipe, ingredient_measurements: newMeasurements })
                }}
                className="flex-grow"
                placeholder="Ingredient name"
              />
              <Input
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                type="number"
                value={measurement.quantity || 0}
                onChange={(value) => {
                  const newMeasurements = [...editedRecipe.ingredient_measurements]
                  newMeasurements[index] = {
                    ...newMeasurements[index],
                    quantity: Number(value),
                    unit: measurement.unit || '',
                    ingredient: {
                      ...measurement.ingredient,
                      ingredient_id: measurement.ingredient.ingredient_id || '',
                      description: measurement.ingredient.description || '',
                    } as Ingredient,
                  }
                  setEditedRecipe({ ...editedRecipe, ingredient_measurements: newMeasurements })
                }}
                className="w-20"
              />
              <Input
                id={`unit-${index}`}
                name={`unit-${index}`}
                value={measurement.unit}
                onChange={(value) => {
                  const newMeasurements = [...editedRecipe.ingredient_measurements]
                  newMeasurements[index] = {
                    ...newMeasurements[index],
                    unit: value,
                    quantity: measurement.quantity || 0,
                    ingredient: {
                      ...measurement.ingredient,
                      ingredient_id: measurement.ingredient.ingredient_id || '',
                      description: measurement.ingredient.description || '',
                    } as Ingredient,
                  }
                  setEditedRecipe({ ...editedRecipe, ingredient_measurements: newMeasurements })
                }}
                className="w-20"
                placeholder="Unit"
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
                {quantity} {quantity && Number(quantity) > 1 ? unit + 's' : unit}
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
