import { beforeAll, describe, expect, it } from 'vitest'
import { nanoid } from 'nanoid'
import { hasOwnProperty, noNull } from '@antfu/utils'
import { FetchWrapper } from '../src/FetchWrapper'
import type { User } from '../utils'
import { isArray, isObjectEmpty, isUser } from '../utils'

describe('fetch wrapper class', () => {
  // https://gorest.co.in/

  const apiOptions = {
    baseUrl: 'https://gorest.co.in/public/v2',
    token: '',
  }

  let userCreated: null | User = null

  let api: FetchWrapper

  beforeAll(() => {
    apiOptions.token = import.meta.env.VITE_PRIMARY_TOKEN
    api = new FetchWrapper(apiOptions)
  })

  it('get function should fetch data and expose it', async () => {
    const { data } = await api.get<User[]>('users')

    if (data && isArray(data)) {
      expect(data?.length).toBeGreaterThanOrEqual(1)
      expect(data?.every(item => isUser(item))).toBeTruthy()
    }
  })

  it('post function should send data and expose it', async () => {
    const payload = {
      name: 'John',
      email: `johndoe${nanoid()}@test.com`,
      gender: 'male',
      status: 'active',

    }
    const { data } = await api.post<User>('users', payload)
    userCreated = data

    expect(isObjectEmpty(data)).toBeFalsy()
    expect(isUser(data)).toBeTruthy()
  })

  it('patch function send data to update item in db, and expose it', async () => {
    if (userCreated) {
      expect(userCreated.name).toEqual('John')

      const { data } = await api.patch<User>(`users/${userCreated.id}`, {
        name: 'Jane',
      })
      userCreated = data
      expect(isObjectEmpty(data)).toBeFalsy()
      expect(isUser(data)).toBeTruthy()
      expect(userCreated?.name).toEqual('Jane')
    }
  })

  it('put function send data to update item in db, and expose it', async () => {
    if (userCreated) {
      expect(userCreated.name).toEqual('Jane')

      const { data } = await api.put<User>(`users/${userCreated.id}`, {
        name: 'John',
      })
      userCreated = data
      expect(isObjectEmpty(data)).toBeFalsy()
      expect(isUser(data)).toBeTruthy()
      expect(userCreated?.name).toEqual('John')
    }
  })

  it('delete function shoud delete data in db and return response', async () => {
    if (userCreated) {
      expect(isObjectEmpty(userCreated)).toBeFalsy()
      expect(isUser(userCreated)).toBeTruthy()

      const { data, status } = await api.delete(`users/${userCreated.id}`)

      expect(!noNull(data)).toBeTruthy()
      expect(status).toEqual(204)

      if (status === 204) {
        const { status, statusText, data: newData } = await api.get<User>(`users/${userCreated.id}`)

        expect(hasOwnProperty(newData, 'message')).toBeTruthy()
        expect(statusText).toEqual('Not Found')
        expect(status).toEqual(404)
      }
    }
  })
})
