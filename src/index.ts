import { FetchWrapper } from './fetchWrapper'
import { baseAPIUrl } from './utils'

const api = new FetchWrapper({
  baseUrl: baseAPIUrl,
})

const test = async () => {
  const res = await api.get('Characters')
  // console.log(res, '<==== res')
}

test()
