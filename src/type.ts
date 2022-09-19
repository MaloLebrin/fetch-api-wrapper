import type { Headers, RequestRedirect } from 'node-fetch'

export interface State {
  isSubmitting: boolean
  isSuccess: boolean | null
}

export interface RequestBody {
  userId: Id
  title: string
  body: string
}

export type ResponseBody = RequestBody & {
  id: Id
}

export type Id = string | number

export interface ApiMethods {
  // setToken: (token: string) => void
  // getToken: () => string | null
  get: <T>(path: string) => Promise<T>
  post: <T extends WithoutId<T>>(path: string, data?: T) => Promise<T>
  patch: <T>(path: string, data: Partial<T>) => Promise<T>
  delete: <T>(path: string, data?: T) => Promise<any>
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

