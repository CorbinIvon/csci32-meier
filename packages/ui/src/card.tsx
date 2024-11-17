const API_URL = process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL

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
  className,
  title,
  children,
  href,
  recipeId,
  ingredients = [],
  onDelete,
}: {
  className?: string
  title: string
  children?: React.ReactNode
  href?: string
  recipeId?: string
  ingredients?: Array<{
    quantity: string
    unit: string
    ingredient: { name: string }
  }>
  onDelete?: () => void
}): JSX.Element {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this recipe? This action can not be undone')) {
      if (recipeId) {
        const success = await deleteRecipe(recipeId)
        if (success && onDelete) {
          onDelete()
        }
      }
    }
  }

  const content = (
    <form onSubmit={handleSubmit} className="relative">
      {onDelete && recipeId && (
        <button
          type="submit"
          className="absolute top-0 right-0 -mt-3 -mr-3 w-6 h-6 rounded-full 
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
      <h2 className="text-xl font-bold mb-3 text-gray-800">{title}</h2>
      <div className="text-gray-600 mb-4">{children}</div>
      {ingredients.length > 0 && (
        <ul className="space-y-2 text-sm text-gray-600">
          {ingredients.map(({ quantity, unit, ingredient }, index) => (
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
  )

  const cardClasses = `
    block p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200
    bg-white border border-gray-200
    min-w-[300px] max-w-sm m-4
    ${className || ''}
  `.trim()

  return href ? (
    <a
      className={cardClasses}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {content}
    </a>
  ) : (
    <div className={cardClasses}>{content}</div>
  )
}
