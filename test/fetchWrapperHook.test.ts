import { beforeAll, describe, expect, it } from 'vitest'
import { nanoid } from 'nanoid'
import { hasOwnProperty, noNull } from '@antfu/utils'
import { useFetchWrapper } from '../src/useFetchWrapper'
import type { User } from '../utils'
import { isArray, isObjectEmpty, isUser } from '../utils'

describe('fetch wrapper hook', () => {
  const apiOptions = {
    baseUrl: 'https://gorest.co.in/public/v2',
    token: '',
  }

  let userCreated: null | User = null

  beforeAll(() => {
    apiOptions.token = import.meta.env.VITE_PRIMARY_TOKEN
  })

  it('setIsSubmitting fucntion should set isSubmitting reactive constant', () => {
    const { isSubmitting, setIsSubmitting } = useFetchWrapper(apiOptions)

    expect(isSubmitting.value).toBeFalsy()

    setIsSubmitting()

    expect(isSubmitting.value).toBeTruthy()

    setIsSubmitting()

    expect(isSubmitting.value).toBeFalsy()
  })

  it('get function should fetch data and expose it', async () => {
    const { getApi } = useFetchWrapper(apiOptions)

    const { data } = await getApi<User[]>('users')

    if (data && isArray(data)) {
      expect(data?.length).toBeGreaterThanOrEqual(1)
      expect(data?.every(item => isUser(item))).toBeTruthy()
    }
  })

  it('post function should send data and expose it', async () => {
    const { postApi, isSuccess } = useFetchWrapper(apiOptions)

    const payload = {
      name: 'John',
      email: `johndoe${nanoid()}@test.com`,
      gender: 'male',
      status: 'active',

    }
    const { data } = await postApi<User>('users', payload)
    userCreated = data

    expect(isSuccess.value).toBeTruthy()
    expect(isObjectEmpty(data)).toBeFalsy()
    expect(isUser(data)).toBeTruthy()
  })

  it('patch function send data to update item in db, and expose it', async () => {
    if (userCreated) {
      const { patchApi, isSuccess } = useFetchWrapper(apiOptions)
      expect(userCreated.name).toEqual('John')

      const { data } = await patchApi<User>(`users/${userCreated.id}`, {
        name: 'Jane',
      })

      userCreated = data

      expect(isSuccess.value).toBeTruthy()
      expect(isObjectEmpty(data)).toBeFalsy()
      expect(isUser(data)).toBeTruthy()
      expect(userCreated?.name).toEqual('Jane')
    }
  })

  it('put function send data to update item in db, and expose it', async () => {
    if (userCreated) {
      const { putApi, isSuccess } = useFetchWrapper(apiOptions)

      expect(userCreated.name).toEqual('Jane')

      const { data } = await putApi<User>(`users/${userCreated.id}`, {
        name: 'John',
      })

      userCreated = data

      expect(isSuccess.value).toBeTruthy()
      expect(isObjectEmpty(data)).toBeFalsy()
      expect(isUser(data)).toBeTruthy()
      expect(userCreated?.name).toEqual('John')
    }
  })

  it('delete function shoud delete data in db and return response', async () => {
    if (userCreated) {
      const { deleteApi, getApi, isSuccess, submissionErrors } = useFetchWrapper(apiOptions)

      expect(isObjectEmpty(userCreated)).toBeFalsy()
      expect(isUser(userCreated)).toBeTruthy()

      const { data, status } = await deleteApi(`users/${userCreated.id}`)

      expect(!noNull(data)).toBeTruthy()
      expect(status).toEqual(204)
      expect(isSuccess.value).toBeTruthy()

      if (status === 204) {
        const { status, statusText, data: newData } = await getApi<User>(`users/${userCreated.id}`)

        expect(hasOwnProperty(newData, 'message')).toBeTruthy()
        expect(statusText).toEqual('Not Found')
        expect(submissionErrors.value).toContain('Not Found')
        expect(status).toEqual(404)
      }
    }
  })
})
