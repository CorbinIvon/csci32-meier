import { Prisma, PrismaClient } from '@prisma/client'
import { FastifyBaseLogger } from 'fastify'

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export const DEFAULT_TAKE = 15
export const DEFAULT_SKIP = 0

interface RecipeServiceProps {
  logger: FastifyBaseLogger
  prisma: PrismaClient
}

interface FindOneRecipeProps {
  recipe_id: string
}

interface FindManyRecipeProps {
  name?: string
  ingredients: string
  sortColumn?: string
  sortOrder?: SortOrder
  take?: number
  skip?: number
  user_id?: string
}

interface CreateIngredientMeasurementProps {
  ingredient_id?: string
  ingredient_name: string
  ingredient_description: string
  unit: string
  quantity: number
}

interface UpdateOneRecipeProps {
  recipe_id: string
  name: string
  description: string
  ingredient_measurements: CreateIngredientMeasurementProps[]
}

interface CreateOneRecipeProps {
  name: string
  description: string
  ingredient_measurements: CreateIngredientMeasurementProps[]
}

interface GetRecipeOrderByProps {
  sortColumn: string
  sortOrder: SortOrder
}

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
    const { user_id } = await this.getOrCreateFirstUser()
    const { recipe_id, ingredient_measurements, ...rest } = props
    const updatedRecipe = await this.prisma.recipe.update({
      where: {
        recipe_id,
      },
      data: {
        ...rest,
        User: {
          connect: { user_id: user_id },
        },
        ingredient_measurements: {
          upsert: ingredient_measurements.map(
            ({ ingredient_id, ingredient_name, ingredient_description, unit, quantity }) => ({
              where: {
                ingredient_id_recipe_id: {
                  ingredient_id: recipe_id || '',
                  recipe_id,
                },
              },
              update: {
                quantity,
                unit,
              },
              create: {
                ingredient: ingredient_id
                  ? {
                      connect: {
                        ingredient_id,
                      },
                    }
                  : {
                      create: {
                        name: ingredient_name,
                        description: ingredient_description,
                      },
                    },
                quantity,
                unit,
              },
            }),
          ),
        },
      },
    })
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
    const { user_id } = await this.getOrCreateFirstUser()
    const directions = '' //TODO: Implement directions.
    const recipe = await this.prisma.recipe.create({
      data: {
        User: {
          connect: {
            user_id: user_id,
          },
        },
        name,
        description,
        directions,
        ingredient_measurements: {
          create: ingredient_measurements.map(
            ({ ingredient_id, ingredient_name, ingredient_description, unit, quantity }) => ({
              ingredient: ingredient_id
                ? {
                    connect: {
                      ingredient_id,
                    },
                  }
                : {
                    create: {
                      name: ingredient_name,
                      description: ingredient_description,
                    },
                  },
              quantity,
              unit,
            }),
          ),
        },
      },
    })
    return recipe
  }
}
