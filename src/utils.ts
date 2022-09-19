import type { State } from './type'

export function useFetchWrapper() {
  const state: State = {
    isSubmitting: false,
    isSuccess: null,
  }

  // async function http<T>(request: RequestInfo): Promise<T> {
  //   const response = await fetch(request)
  //   return await response.json() as unknown as T
  // }

  return {
    isSubmitting: state.isSubmitting,
    isSuccess: state.isSuccess,
  }
}

export const baseAPIUrl = 'https://thronesapi.com/api/v2'
