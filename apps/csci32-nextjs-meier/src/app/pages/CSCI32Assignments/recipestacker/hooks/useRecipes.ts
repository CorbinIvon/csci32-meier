import useSWR from 'swr'
import { CreateRecipeDTO, UpdateRecipeDTO, SearchRecipeDTO, ApiResponse } from '@package/recipestacker-types/src/types'

async function postHelper({ path, body }: { path: string; body: string }) {
  return fetch(`${process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL}${path}`, {
    method: 'POST',
    body,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
}

async function putHelper({ path, params }: { path: string; params: UpdateRecipeDTO }) {
  return fetch(`${process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL}${path}`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
}

export function deleteRecipe(recipe_id: string) {
  return putHelper({
    path: `/recipes/${recipe_id}`,
    params: {
      recipe_id, // Add the required recipe_id
      deleted: new Date().toISOString(),
    },
  })
}
export function createRecipe(params: CreateRecipeDTO) {
  return postHelper({ path: '/recipes', body: JSON.stringify(params) })
}

async function fetcher({ path, urlParams }: { path: string; urlParams?: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RECIPESTACKER_API_URL}${path}${urlParams ? `?${urlParams}` : ''}`,
    {
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
  )
  return res.json()
}

export function useRecipes(params?: SearchRecipeDTO) {
  const searchParams: Record<string, string> = {}
  if (params) {
    if (params.name) searchParams.name = params.name
    if (params.ingredients) searchParams.ingredients = params.ingredients
    if (params.sortColumn) searchParams.sortColumn = params.sortColumn
    if (params.sortOrder) searchParams.sortOrder = params.sortOrder
    if (params.take) searchParams.take = params.take.toString()
    if (params.skip) searchParams.skip = params.skip.toString()
    if (params.user_id) searchParams.user_id = params.user_id
  }

  const urlParams = new URLSearchParams(searchParams).toString()
  return useSWR(['/recipes', urlParams], ([path, urlParams]) => fetcher({ path, urlParams }))
}
