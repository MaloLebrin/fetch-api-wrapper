import { ref } from '@vue/reactivity'

export default function useSubmission(submit: () => Promise<void>) {
  const submissionErrors = ref<string[]>([])

  const isSubmitting = ref(false)

  const isSuccess = ref(false)

  function resetErrors() {
    submissionErrors.value = []
  }

  function resetState() {
    resetErrors()
    isSuccess.value = false
    isSubmitting.value = false
  }

  async function onSubmit() {
    isSubmitting.value = true
    resetErrors()
    try {
      await submit()
      isSuccess.value = true
    }
    catch (error: any) {
      if (error?.response) {
        submissionErrors.value.push(error.response.data.message)
        return
      }

      submissionErrors.value.push(error.message)
    }
    finally {
      isSubmitting.value = false
    }
  }

  return {
    submissionErrors,
    onSubmit,
    isSuccess,
    isSubmitting,
    resetState,
  }
}
export type UseSubmission = typeof useSubmission
