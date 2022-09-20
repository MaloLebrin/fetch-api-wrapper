import type { FetchMethods, FetchWrapperInit, HeadersInterface, State, WithoutId } from './type'
import type { UseFetchWrapper } from './useFetchWrapper'
import useFetchWrapper from './useFetchWrapper'
import useSubmission from './useSubmission'
import type { UseSubmission } from './useSubmission'

export type {
  State,
  FetchWrapperInit,
  HeadersInterface,
  FetchMethods,
  WithoutId,
  UseFetchWrapper,
  UseSubmission,
}

export {
  useFetchWrapper,
  useSubmission,
}
