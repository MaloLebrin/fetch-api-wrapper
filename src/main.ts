import useFetchWrapper from './useFetchWrapper'
import useSubmission from './useSubmission'

const { postApi } = useFetchWrapper({
  baseUrl: 'http://localhost:8000',
})

const test = async () => {
  await postApi('user/login', {
    email: process.env.email,
    password: process.env.password,
  })
}

const {
  onSubmit,
  isSuccess,
} = useSubmission(test)

const action = async () => {
  await onSubmit()
  console.warn(isSuccess.value, '<==== isSuccess.value')
}

action()

