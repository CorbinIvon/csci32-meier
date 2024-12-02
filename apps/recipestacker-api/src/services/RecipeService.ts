import { Prisma, PrismaClient } from '@prisma/client'
import { FastifyBaseLogger } from 'fastify'
import {
  SortOrder,
  Recipe,
  FindOneRecipeProps,
  FindManyRecipeProps,
  CreateOneRecipeProps,
  UpdateOneRecipeProps,
  DeleteOneRecipeProps,
  GetRecipeOrderByProps,
  ApiResponse,
  IngredientMeasurementDTO,
} from '@package/recipestacker-types/src/types'

export interface RecipeServiceProps {
  logger: FastifyBaseLogger
  prisma: PrismaClient
}

export const DEFAULT_TAKE = 15
export const DEFAULT_SKIP = 0

export class RecipeService {
  logger: FastifyBaseLogger
  prisma: PrismaClient

  constructor({ logger, prisma }: RecipeServiceProps) {
    this.logger = logger
    this.prisma = prisma
  }

  getRecipeOrderBy({ sortOrder, sortColumn }: GetRecipeOrderByProps) {
    return {
      [sortColumn]: sortOrder,
    }
  }

  async getOrCreateFirstUser() {
    const user = await this.prisma.user.findFirst()
    if (!user) {
      console.log('DEVELOPER METHOD: Creating user')
      const newUser = await this.prisma.user.create({
        data: {
          name: 'John Doe',
        },
      })
      return newUser
    }
    return user
  }

  async findOneRecipe(props: FindOneRecipeProps) {
    this.logger.info({ props }, 'findOneRecipe')
    const { recipe_id } = props
    return this.prisma.recipe.findFirst({
      where: {
        recipe_id,
        deleted: null,
      },
      include: {
        ingredient_measurements: {
          include: {
            ingredient: true,
          },
        },
      },
    })
  }

  async updateOneRecipe(props: UpdateOneRecipeProps) {
    this.logger.info({ props }, 'updateOneRecipe')
    const { recipe_id, ingredient_measurements, ...rest } = props

    try {
      // First, delete existing measurements
      await this.prisma.ingredientMeasurement.deleteMany({
        where: { recipe_id },
      })

      // Then update the recipe with new measurements
      const updatedRecipe = await this.prisma.recipe.update({
        where: { recipe_id },
        data: {
          ...rest,
          ingredient_measurements: {
            create: ingredient_measurements?.map((m) => ({
              quantity: m.quantity,
              unit: m.unit,
              ingredient: {
                connectOrCreate: {
                  where: {
                    ingredient_id: m.ingredient_id || 'new-' + Math.random(),
                  },
                  create: {
                    name: m.ingredient_name,
                    description: m.ingredient_description || '',
                  },
                },
              },
            })),
          },
        },
        include: {
          ingredient_measurements: {
            include: {
              ingredient: true,
            },
          },
        },
      })

      return updatedRecipe
    } catch (error) {
      this.logger.error(error, 'Failed to update recipe')
      throw error
    }
  }

  async findManyRecipes(props: FindManyRecipeProps) {
    this.logger.info({ props }, 'findManyRecipes')
    const {
      name,
      ingredients,
      sortColumn = 'name',
      sortOrder = SortOrder.ASC,
      take = DEFAULT_TAKE,
      skip = DEFAULT_SKIP,
    } = props
    const ingredientsArray = ingredients ? ingredients.split(',') : []
    const orderBy = this.getRecipeOrderBy({ sortColumn, sortOrder })
    return await this.prisma.recipe.findMany({
      where: {
        name: {
          contains: name,
        },
        deleted: null,
        AND: ingredientsArray.map((ingredient) => ({
          ingredient_measurements: {
            some: {
              ingredient: {
                name: {
                  contains: ingredient,
                },
              },
            },
          },
        })),
      },
      orderBy,
      take,
      skip,
      include: {
        ingredient_measurements: {
          include: {
            ingredient: true,
          },
        },
        User: true,
      },
    })
  }

  async createOneRecipe(props: CreateOneRecipeProps) {
    const { name, description, ingredient_measurements } = props
    const directions = '' // TODO: Implement directions.
    const recipe = await this.prisma.recipe.create({
      data: {
        name,
        description,
        directions,
        ingredient_measurements: {
          create: ingredient_measurements.map((measurement: IngredientMeasurementDTO) => ({
            ingredient: measurement.ingredient_id
              ? {
                  connect: {
                    ingredient_id: measurement.ingredient_id,
                  },
                }
              : {
                  create: {
                    name: measurement.ingredient_name,
                    description: measurement.ingredient_description,
                  },
                },
            quantity: measurement.quantity,
            unit: measurement.unit,
          })),
        },
      },
      include: {
        ingredient_measurements: {
          include: {
            ingredient: true,
          },
        },
      },
    })
    return recipe
  }

  async deleteOneRecipe(props: DeleteOneRecipeProps): Promise<boolean> {
    try {
      this.logger.info({ props }, 'deleteOneRecipe')

      // First delete all related ingredient measurements
      await this.prisma.ingredientMeasurement.deleteMany({
        where: {
          recipe_id: props.recipe_id,
        },
      })

      // Then delete the recipe
      await this.prisma.recipe.delete({
        where: {
          recipe_id: props.recipe_id,
        },
      })

      return true
    } catch (error) {
      this.logger.error(error, 'Failed to delete recipe')
      return false
    }
  }
}
