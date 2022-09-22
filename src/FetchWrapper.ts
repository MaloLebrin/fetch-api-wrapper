import type { Headers, RequestInit, RequestRedirect } from 'node-fetch'
import fetch, { Request } from 'node-fetch'
import type { ApiMethods, FetchWrapperInit, WithoutId } from './type'
import { FetchMethods } from './type'

export default class FetchWrapper implements ApiMethods {
  private baseUrl: string
  private headers?: Headers
  private redirect?: RequestRedirect = 'follow'
  public token?: string

  constructor(init: FetchWrapperInit) {
    this.baseUrl = init.baseUrl
    this.token = init.token
    this.headers = init.headers
    this.redirect = init.redirect
  }

  private async http<T>(url: string, config: RequestInit): Promise<T> {
    const request = new Request(url, {
      ...config,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${this.token ? this.token : ''}`,
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : null,
    })
    const response = await fetch(request)
    return await response.json() as unknown as T
  }

  private getPath(path: string): string {
    return `${this.baseUrl}/${path}`
  }

  async get<T>(path: string): Promise<T> {
    return this.http<T>(this.getPath(path), {
      method: FetchMethods.GET,
    })
  }

  async post<T extends WithoutId<T>>(path: string, data?: T): Promise<T> {
    const a = this.http<T>(this.getPath(path), {
      method: FetchMethods.POST,
      body: data,
    })
    return a
  }

  async patch<T>(path: string, data: Partial<T>): Promise<T> {
    return this.http<T>(this.getPath(path), {
      method: FetchMethods.PATCH,
      body: data,
    })
  }

  async put<T>(path: string, data: Partial<T>): Promise<T> {
    return this.http<T>(this.getPath(path), {
      method: FetchMethods.PUT,
      body: data,
    })
  }

  async delete(path: string) {
    return this.http(this.getPath(path), {
      method: FetchMethods.DELETE,
    })
  }
}
