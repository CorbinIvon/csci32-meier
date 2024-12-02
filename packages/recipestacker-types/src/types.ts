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
  ingredient: BaseIngredient // Keep this as BaseIngredient
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
  ingredient_measurements: {
    unit: string
    quantity: number
    ingredient: Ingredient // This is the key change - we explicitly use Ingredient here
  }[]
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
  directions?: string
  deleted?: string | null
  ingredient_measurements?: {
    unit: string
    quantity: number
    ingredient_name: string
    ingredient_description: string
    ingredient_id?: string
  }[]
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
  mutate: (data?: Recipe[]) => Promise<any>
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

// Type Conversion Utilities
export const convertToUpdateRecipeDTO = (recipe: Recipe): UpdateRecipeDTO => ({
  recipe_id: recipe.recipe_id,
  name: recipe.name,
  description: recipe.description,
  ingredient_measurements: recipe.ingredient_measurements.map(
    (im): IngredientMeasurementDTO => ({
      unit: im.unit,
      quantity: im.quantity,
      ingredient_name: im.ingredient.name,
      ingredient_description: im.ingredient.description || '',
      ingredient_id: im.ingredient.ingredient_id,
    }),
  ),
})

// TypeBox Type Definitions
import { Type } from '@sinclair/typebox'

export const UpsertIngredientMeasurementTypeboxType = Type.Object({
  unit: Type.String(),
  quantity: Type.Number(),
  ingredient_id: Type.Optional(Type.String()),
  ingredient_name: Type.String(),
  ingredient_description: Type.String(),
})

export const UpdateRecipeTypeboxType = Type.Object({
  name: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  directions: Type.Optional(Type.String()),
  deleted: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  ingredient_measurements: Type.Optional(
    Type.Array(
      Type.Object({
        unit: Type.String(),
        quantity: Type.Number(),
        ingredient_name: Type.String(),
        ingredient_description: Type.String(),
        ingredient_id: Type.Optional(Type.String()),
      }),
    ),
  ),
})

export const CreateRecipeTypeboxType = Type.Object({
  name: Type.String(),
  description: Type.String(),
  ingredient_measurements: Type.Array(UpsertIngredientMeasurementTypeboxType),
})

export const IngredientMeasurementTypeboxType = Type.Object({
  unit: Type.String(),
  quantity: Type.Number(),
  ingredient: Type.Object({
    ingredient_id: Type.String(),
    name: Type.Union([Type.String(), Type.Null()]),
    description: Type.Union([Type.String(), Type.Null()]),
    image: Type.Union([Type.String(), Type.Null()]),
  }),
})

export const RecipeTypeboxType = Type.Object({
  recipe_id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  directions: Type.String(),
  image: Type.Union([Type.String(), Type.Null()]),
  ingredient_measurements: Type.Array(IngredientMeasurementTypeboxType),
})

export const RecipeNotFoundTypeboxType = Type.Object({
  statusCode: Type.Literal(404),
  message: Type.String(),
  error: Type.Literal('Not Found'),
})
