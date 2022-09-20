import useFetchWrapper from './fetchWrapper'

// const api = new FetchWrapper({
//   baseUrl: 'http://localhost:8000',
// })

const { isSubmitting, isSuccess, getApi } = useFetchWrapper({
  baseUrl: 'http://localhost:8000',
})

const test = async () => {
  await getApi('user')
}

test()
