import { hasOwnProperty } from '@antfu/utils'

export interface WithId {
  id: number
}

export interface UserEntity {
  name: string
  email: string
  gender: string
  status: string
}

export interface User extends UserEntity, WithId { }

export function isUser(object: any) {
  return hasOwnProperty(object, 'name')
    && hasOwnProperty(object, 'email')
    && hasOwnProperty(object, 'gender')
    && hasOwnProperty(object, 'status')
}

export function isObjectEmpty(obj: any) {
  return obj
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype
}

export function isArray<T>(array: T[]): array is T[] {
  return Array.isArray(array)
}
