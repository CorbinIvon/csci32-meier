import { FastifyPluginAsync } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import {
  RecipeTypeboxType,
  CreateRecipeTypeboxType,
  UpdateRecipeTypeboxType,
  RecipeNotFoundTypeboxType,
  Recipe,
  IngredientMeasurement,
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
        const mappedRecipes = recipes
          ? recipes.map((recipe) => ({
              recipe_id: recipe.recipe_id,
              name: recipe.name,
              description: recipe.description ?? '',
              directions: recipe.directions,
              image: recipe.image,
              ingredient_measurements: recipe.ingredient_measurements,
            }))
          : []
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
        // TODO: Fix me!
        const updatedRecipe = await fastify.recipeService.updateOneRecipe({
          recipe_id: request.params.id,
          name: request.body.name,
          description: request.body.description,
          directions: request.body.directions,
          ingredient_measurements: request.body.ingredient_measurements?.map((im: IngredientMeasurement) => ({
            unit: im.unit,
            quantity: im.quantity,
            ingredient_name: im.ingredient.name,
            ingredient_description: im.ingredient.description || '',
            ingredient_id: im.ingredient_id,
          })),
        })

        return reply.send({
          ...updatedRecipe,
          description: updatedRecipe.description ?? '',
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
        response: {
          200: Type.Object({ message: Type.String() }),
          404: RecipeNotFoundTypeboxType,
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
