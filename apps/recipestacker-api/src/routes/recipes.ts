import Fastify, { FastifyPluginAsync } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'

export const IngredientMeasurementTypeboxType = Type.Object({
  unit: Type.String(),
  quantity: Type.Number(),
  ingredient_id: Type.Optional(Type.String()),
  ingredient_name: Type.String(),
  ingredient_description: Type.String(),
})

export const CreateRecipeTypeboxType = Type.Object({
  name: Type.String(),
  description: Type.String(),
  ingredient_measurements: Type.Array(IngredientMeasurementTypeboxType),
})

const recipe: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
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
}
export default recipe
