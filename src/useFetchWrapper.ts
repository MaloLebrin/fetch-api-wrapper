import type { RequestInit } from 'node-fetch'
import fetch, { Request } from 'node-fetch'
import { ref } from '@vue/reactivity'
import type { FetchWrapperInit, FetchWrapperResponse, State, WithoutId } from './type'
import { FetchMethods } from './type'

export default function useFetchWrapper(init: FetchWrapperInit) {
  const state: State = {
    isSubmitting: false,
    isSuccess: null,
    isRedirected: null,
    baseUrl: init.baseUrl,
    token: init.token,
    headers: init.headers,
    redirect: init.redirect,
    data: null,
  }

  const isSubmitting = ref(false)
  const isSuccess = ref(false)
  const submissionErrors = ref<string[]>([])

  function resetErrors() {
    submissionErrors.value = []
  }

  function resetState() {
    resetErrors()
    isSuccess.value = false
    isSubmitting.value = false
  }

  async function http<T>(url: string, config: RequestInit): Promise<FetchWrapperResponse<T>> {
    toggleIsSubmitting(true)
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
    isSuccess.value = response.ok

    if (!response.ok)
      submissionErrors.value.push(response.statusText)

    const data = await response.json().catch(() => ({})) as unknown as T
    toggleIsSubmitting(false)

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: config.method === FetchMethods.DELETE ? null : data,
    }
  }

  function getPath(path: string): string {
    return `${state.baseUrl}/${path}`
  }

  function toggleIsSubmitting(value?: boolean) {
    if (value === null || value === undefined)
      isSubmitting.value = !isSubmitting.value
    else
      isSubmitting.value = value
  }

  async function getApi<T>(path: string): Promise<FetchWrapperResponse<T>> {
    return http<T>(getPath(path), {
      method: FetchMethods.GET,
    })
  }

  async function postApi<T>(path: string, data?: WithoutId<T>): Promise<FetchWrapperResponse<T>> {
    return http<T>(getPath(path), {
      method: FetchMethods.POST,
      body: data,
    })
  }

  async function patchApi<T>(path: string, data: Partial<T>): Promise<FetchWrapperResponse<T>> {
    return http<T>(getPath(path), {
      method: FetchMethods.PATCH,
      body: data,
    })
  }

  async function putApi<T>(path: string, data: Partial<T>): Promise<FetchWrapperResponse<T>> {
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
    resetState,
    getApi,
    postApi,
    patchApi,
    putApi,
    deleteApi,
    setIsSubmitting: toggleIsSubmitting,
    isSubmitting,
    isSuccess,
    submissionErrors,
  }
}

export type UseFetchWrapper = typeof useFetchWrapper
