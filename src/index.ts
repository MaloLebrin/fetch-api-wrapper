import type { ApiMethods, FetchMethods, FetchWrapperInit, HeadersInterface, State, WithoutId } from './type'
import type { UseFetchWrapperType } from './useFetchWrapper'
import { useFetchWrapper } from './useFetchWrapper'
import { useSubmission } from './useSubmission'
import type { UseSubmission } from './useSubmission'
import { FetchWrapper } from './FetchWrapper'

export type {
  State,
  FetchWrapperInit,
  HeadersInterface,
  FetchMethods,
  WithoutId,
  UseFetchWrapperType,
  UseSubmission,
  ApiMethods,
}

export {
  useFetchWrapper,
  useSubmission,
  FetchWrapper,
}
