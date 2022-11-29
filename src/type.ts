import type { Headers, RequestRedirect } from 'node-fetch'

export interface State {
  isSubmitting: boolean
  isSuccess: boolean | null
  isRedirected: boolean | null
  baseUrl: string
  token: string | undefined
  headers?: HeadersInterface
  redirect?: RequestRedirect
  data: null | any
}

export interface FetchWrapperInit {
  baseUrl: string
  headers?: HeadersInterface
  token?: string
  redirect?: RequestRedirect
}

export interface HeadersInterface extends Headers { }

export enum FetchMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export type WithoutId<T> = Omit<T, 'id'>

export interface ApiMethods {
  get: <T>(path: string) => Promise<FetchWrapperResponse<T>>
  post: <T extends WithoutId<T>>(path: string, data?: T) => Promise<FetchWrapperResponse<T>>
  patch: <T>(path: string, data: Partial<T>) => Promise<FetchWrapperResponse<T>>
  put: <T>(path: string, data: Partial<T>) => Promise<FetchWrapperResponse<T>>
  delete: <T>(path: string, data?: T) => Promise<FetchWrapperResponse<T>>
}

export interface FetchWrapperResponse<T> {
  success: boolean
  status: number
  data: T | null
  statusText: string
}
