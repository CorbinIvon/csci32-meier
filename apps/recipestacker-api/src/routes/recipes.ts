import { FastifyPluginAsync } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import {
  RecipeTypeboxType,
  CreateRecipeTypeboxType,
  UpdateRecipeTypeboxType,
  RecipeNotFoundTypeboxType,
  Recipe,
  IngredientMeasurement,
  IngredientMeasurementDTO,
} from '@package/recipestacker-types/src/types'
import { Type } from '@sinclair/typebox'

const recipe: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/recipes',
    {
      schema: {
        tags: ['Endpoint: Get all recipes'],
        description: 'Endpoint: Get all recipes',
        response: {
          200: Type.Array(RecipeTypeboxType),
          404: RecipeNotFoundTypeboxType,
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
        const mappedRecipes = recipes.map((recipe) => ({
          recipe_id: recipe.recipe_id,
          name: recipe.name,
          description: recipe.description || '', // Ensure string type
          directions: recipe.directions || '', // Ensure string type
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
        params: Type.Object({
          id: Type.String(),
        }),
        body: UpdateRecipeTypeboxType,
        response: {
          200: RecipeTypeboxType,
          400: Type.Object({ message: Type.String() }),
        },
      },
    },
    async function (request: any, reply) {
      try {
        const updatedRecipe = await fastify.recipeService.updateOneRecipe({
          recipe_id: request.params.id,
          name: request.body.name ?? '',
          description: request.body.description ?? '',
          directions: request.body.directions ?? '',
          deleted: request.body.deleted,
          ingredient_measurements: request.body.ingredient_measurements?.map((im: IngredientMeasurementDTO) => ({
            unit: im.unit,
            quantity: im.quantity,
            ingredient_name: im.ingredient_name,
            ingredient_description: im.ingredient_description || '',
            ingredient_id: im.ingredient_id,
          })),
        })

        if (!updatedRecipe || !updatedRecipe.ingredient_measurements) {
          throw new Error('Failed to update recipe')
        }

        return reply.send({
          recipe_id: updatedRecipe.recipe_id,
          name: updatedRecipe.name,
          description: updatedRecipe.description || '',
          directions: updatedRecipe.directions || '',
          image: updatedRecipe.image,
          ingredient_measurements: updatedRecipe.ingredient_measurements,
        })
      } catch (error) {
        fastify.log.error(error)
        reply.code(400).send({ message: 'Failed to update recipe' })
      }
    },
  )

  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/recipes/:id',
    {
      schema: {
        tags: ['Endpoint: Get one recipe'],
        description: 'Endpoint to get one recipe',
        response: {
          200: RecipeTypeboxType,
          404: RecipeNotFoundTypeboxType,
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
        params: Type.Object({
          id: Type.String(),
        }),
        // Remove body validation entirely
        response: {
          200: Type.Object({
            success: Type.Boolean(),
            message: Type.String(),
          }),
          404: RecipeNotFoundTypeboxType,
        },
      },
    },
    async function (request, reply) {
      const success = await fastify.recipeService.deleteOneRecipe({
        recipe_id: request.params.id,
      })

      if (!success) {
        return reply.notFound('Recipe not found')
      }

      return { success: true, message: 'Recipe deleted successfully' }
    },
  )
}

export default recipe
