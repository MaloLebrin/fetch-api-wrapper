import type { ApiMethods, FetchMethods, FetchWrapperInit, HeadersInterface, State, WithoutId } from './type'
import type { UseFetchWrapper } from './useFetchWrapper'
import useFetchWrapper from './useFetchWrapper'
import useSubmission from './useSubmission'
import type { UseSubmission } from './useSubmission'
import FetchWrapper from './FetchWrapper'

export type {
  State,
  FetchWrapperInit,
  HeadersInterface,
  FetchMethods,
  WithoutId,
  UseFetchWrapper,
  UseSubmission,
  ApiMethods,
}

export {
  useFetchWrapper,
  useSubmission,
  FetchWrapper,
}
