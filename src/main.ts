import FetchWrapper from './fetchWrapper'

const api = new FetchWrapper({
  baseUrl: 'http://localhost:8000',
})

const test = async () => {
  await api.get('user')
}

test()
