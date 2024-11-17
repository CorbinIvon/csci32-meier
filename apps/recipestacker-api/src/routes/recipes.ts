import Fastify, { FastifyPluginAsync } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
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
  ingredient_measurements: Type.Optional(UpsertIngredientMeasurementTypeboxType),
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

export const RecipeType = Type.Object({
  recipe_id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  directions: Type.String(),
  image: Type.Union([Type.String(), Type.Null()]),
  ingredient_measurements: Type.Array(IngredientMeasurementTypeboxType),
})

export const RecipeNotFoundType = Type.Object({
  statusCode: Type.Literal(404),
  message: Type.String(),
  error: Type.Literal('Not Found'),
})

const recipe: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/recipes',
    {
      schema: {
        tags: ['Endpoint: Get all recipes'],
        description: 'Endpoint: Get all recipes',
        response: {
          200: Type.Array(RecipeType),
          404: RecipeNotFoundType,
        },
      },
    },

    async function (request: any, reply) {
      const recipes = await fastify.recipeService.findManyRecipes({
        name: request.query.name,
        ingredients: request.query.ingredients,
        sortColumn: request.query.sortColumn,
        sortOrder: request.query.sortOrder,
        take: request.query.take,
        skip: request.query.skip,
        user_id: request.query.user_id,
      })
      if (recipes) {
        const mappedRecipes = recipes?.map((recipe) => ({
          recipe_id: recipe.recipe_id,
          name: recipe.name,
          description: recipe.description ?? '',
          directions: recipe.directions,
          image: recipe.image,
          ingredient_measurements: recipe.ingredient_measurements,
        }))
        return reply.send(mappedRecipes)
      } else {
        return reply.notFound()
      }
    },
  )

  fastify.withTypeProvider<TypeBoxTypeProvider>().put(
    '/recipes/:id',
    {
      schema: {
        tags: ['Endpoint: Update a recipe'],
        description: 'Endpoint to update a recipe',
        body: UpdateRecipeTypeboxType,
        response: {
          200: Type.Object({ recipe_id: Type.String() }),
          400: Type.Object({ message: Type.String() }),
        },
      },
    },
    async function (request: any, reply) {
      return fastify.recipeService.updateOneRecipe({
        recipe_id: request.params.id,
        name: request.body.name,
        description: request.body.description,
        ingredient_measurements: request.body.ingredient_measurements,
      })
    },
  )

  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/recipes/:id',
    {
      schema: {
        tags: ['Endpoint: Get one recipe'],
        description: 'Endpoint to get one recipe',
        response: {
          200: RecipeType,
          404: RecipeNotFoundType,
        },
      },
    },
    async function (request: any, reply) {
      const recipe = await fastify.recipeService.findOneRecipe({
        recipe_id: request.params.id,
      })
      if (!recipe) {
        return reply.notFound()
      }
      return {
        recipe_id: recipe.recipe_id,
        name: recipe.name,
        description: recipe.description ?? '',
        directions: recipe.directions,
        image: recipe.image,
        ingredient_measurements: recipe.ingredient_measurements,
      }
    },
  )

  fastify.withTypeProvider<TypeBoxTypeProvider>().post(
    '/recipes',
    {
      schema: {
        tags: ['Endpoint: Create a recipe'],
        description: 'Endpoint to create a recipe',
        body: CreateRecipeTypeboxType,
        response: {
          200: Type.Object({ recipe_id: Type.String() }),
          400: Type.Object({ message: Type.String() }),
        },
      },
    },
    async function (request, reply) {
      return fastify.recipeService.createOneRecipe({
        name: request.body.name,
        description: request.body.description,
        ingredient_measurements: request.body.ingredient_measurements,
      })
    },
  )

  fastify.withTypeProvider<TypeBoxTypeProvider>().delete(
    '/recipes/:id',
    {
      schema: {
        tags: ['Endpoint: Delete a recipe'],
        description: 'Endpoint to delete a recipe',
        response: {
          200: Type.Object({ message: Type.String() }),
          404: RecipeNotFoundType,
        },
      },
    },
    async function (request: any, reply) {
      const success = await fastify.recipeService.deleteOneRecipe({
        recipe_id: request.params.id,
      })

      if (!success) {
        return reply.notFound()
      }

      return { message: 'Recipe deleted successfully' }
    },
  )
}

export default recipe
