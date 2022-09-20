import type { RequestInit } from 'node-fetch'
import fetch, { Request } from 'node-fetch'
import type { FetchWrapperInit, State, WithoutId } from './type'
import { FetchMethods } from './type'

export default function useFetchWrapper(init: FetchWrapperInit) {
  const state: State = {
    isSubmitting: false,
    isSuccess: null,
    baseUrl: init.baseUrl,
    token: init.token,
    headers: init.headers,
    redirect: init.redirect,
  }

  async function http<T>(url: string, config: RequestInit): Promise<T> {
    const request = new Request(url, {
      ...config,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${state.token || ''}`,
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : null,
    })
    const response = await fetch(request)
    return await response.json() as unknown as T
  }

  function getPath(path: string): string {
    return `${state.baseUrl}/${path}`
  }

  async function getApi<T>(path: string): Promise<T> {
    return http<T>(getPath(path), {
      method: FetchMethods.GET,
    })
  }

  async function postApi<T extends WithoutId<T>>(path: string, data?: T): Promise<T> {
    const a = http<T>(getPath(path), {
      method: FetchMethods.POST,
      body: data,
    })
    return a
  }

  async function patchApi<T>(path: string, data: Partial<T>): Promise<T> {
    return http<T>(getPath(path), {
      method: FetchMethods.PATCH,
      body: data,
    })
  }

  async function putApi<T>(path: string, data: Partial<T>): Promise<T> {
    return http<T>(getPath(path), {
      method: FetchMethods.PUT,
      body: data,
    })
  }

  async function deleteApi(path: string) {
    return http(getPath(path), {
      method: FetchMethods.DELETE,
    })
  }

  return {
    getApi,
    postApi,
    patchApi,
    putApi,
    deleteApi,
    isSubmitting: state.isSubmitting,
    isSuccess: state.isSuccess,
  }
}

export type UseFetchWrapper = typeof useFetchWrapper
