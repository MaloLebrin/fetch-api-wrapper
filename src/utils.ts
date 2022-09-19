import type { State } from './type'

export function useFetchWrapper() {
  const state: State = {
    isSubmitting: false,
    isSuccess: null,
  }

  return {
    isSubmitting: state.isSubmitting,
    isSuccess: state.isSuccess,
  }
}
