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

interface FindOneRecipeProps {}

interface FindManyRecipeProps {}

interface CreateIngredientMeasurementProps {}

interface UpdateOneRecipeProps {}

interface CreateOneRecipeProps {}

interface GetRecipeOrderByProps {}

export class RecipeService {
  logger: FastifyBaseLogger
  prisma: PrismaClient

  constructor({ logger, prisma }: RecipeServiceProps) {
    this.logger = logger
    this.prisma = prisma
  }

  getRecipeOrderBy({}: GetRecipeOrderByProps) /*: Prisma.RecipeOrderByWithRelationInput */ {}

  async findOneRecipe({}: FindOneRecipeProps) {}

  async updateOneRecipe(props: UpdateOneRecipeProps) {}

  async findManyRecipes(props: FindManyRecipeProps) {}

  async createOneRecipe(props: CreateOneRecipeProps) {}
}
