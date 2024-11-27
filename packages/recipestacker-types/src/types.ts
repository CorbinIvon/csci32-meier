// Domain Models (core business logic)
export interface BaseIngredient {
  name: string
  description: string
}

export interface BaseRecipe {
  name: string
  description: string
  ingredient_measurements: BaseIngredientMeasurement[]
}

export interface BaseIngredientMeasurement {
  unit: string
  quantity: number
  ingredient: BaseIngredient
}

// Database Models (persistence layer)
export interface Ingredient extends BaseIngredient {
  ingredient_id: string
  image?: string | null
  recipes?: Recipe[]
}

export interface Recipe extends BaseRecipe {
  recipe_id: string
  deleted?: string | null
  directions: string
  image?: string | null
  User?: User[]
}

export interface IngredientMeasurement extends BaseIngredientMeasurement {
  ingredient_id: string
  recipe_id: string
}

export interface User {
  user_id: string
  name: string
  email?: string
  savedRecipes?: Recipe[]
}

// DTOs (Data Transfer Object) (API layer)
export interface IngredientMeasurementDTO {
  unit: string
  quantity: number
  ingredient_id?: string
  ingredient_name: string
  ingredient_description: string
}

export interface RecipeDTO {
  name: string
  description: string
  ingredient_measurements: IngredientMeasurementDTO[]
}

export interface CreateRecipeDTO extends RecipeDTO {
  user_id?: string
}

export interface UpdateRecipeDTO {
  recipe_id: string
  name?: string
  description?: string
  deleted?: Date | string | null
  ingredient_measurements?: IngredientMeasurementDTO[]
}

export interface CreateIngredientDTO extends BaseIngredient {}

export interface SearchRecipeDTO {
  name?: string
  ingredients?: string
  sortColumn?: string
  sortOrder?: SortOrder
  take?: number
  skip?: number
  user_id?: string
}

// Context Types
export interface RecipeContextType {
  recipes: Recipe[]
  mutate: () => void
  recipeNameQuery: string
  setRecipeNameQuery: (query: string) => void
  ingredients: string[]
  ingredientQuery: string
  removeIngredient: (index: string) => void
  setIngredients: (ingredients: string[]) => void
  setIngredientQuery: (query: string) => void
  showRecipeForm: boolean
  setShowRecipeForm: (showRecipeForm: boolean) => void
  dbStatus: boolean
  dbStatusMessage?: string
  editingRecipe: Recipe | null
  handleEdit: (recipe: Recipe) => void
}

// Enums and Constants
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum RecipeStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum UnitType {
  GRAMS = 'g',
  KILOGRAMS = 'kg',
  MILLILITERS = 'ml',
  LITERS = 'l',
  CUPS = 'cups',
  TABLESPOONS = 'tbsp',
  TEASPOONS = 'tsp',
}

export interface ApiResponse<T> {
  data?: T
  error?: {
    code: number
    message: string
  }
}

export const RECIPE_CONSTRAINTS = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  MAX_INGREDIENTS: 50,
} as const

// Service Types
export interface GetRecipeOrderByProps {
  sortColumn: string
  sortOrder: SortOrder
}

export interface FindOneRecipeProps {
  recipe_id: string
}

export interface FindManyRecipeProps {
  name?: string
  ingredients: string
  sortColumn?: string
  sortOrder?: SortOrder
  take?: number
  skip?: number
  user_id?: string
}

export interface CreateOneRecipeProps extends CreateRecipeDTO {
  // Additional service-specific fields if needed
}

export interface DeleteOneRecipeProps {
  recipe_id: string
}

export interface UpdateOneRecipeProps extends UpdateRecipeDTO {
  // Additional service-specific fields if needed
}
