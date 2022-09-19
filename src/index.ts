import { FetchWrapper } from './fetchWrapper'
import { baseAPIUrl } from './utils'

const api = new FetchWrapper({
  baseUrl: baseAPIUrl,
})

const test = async () => {
  await api.get('Characters')
}

test()
