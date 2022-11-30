# Fetch api wrapper

[![NPM version](https://img.shields.io/npm/v/fetch-api-wrapper?color=a1b858&label=)](https://www.npmjs.com/package/@malolebrin/fetch-api-wrapper)

A fully typed lightweight wrapper with more powerful and flexible features of [fetch api](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)

## Roadmap:

 * [x] Fully tested with [Vitest](https://vitest.dev/)
 * [ ] Create documentation with [Vitepress](https://vitepress.vuejs.org/)
 * [ ] Create offical release
 * [ ] Create automatic deploy new release on push tag

## Contributions:

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

### How Can I Contribute?

#### Pull Requests

The process described here has several goals:

- Maintain Fetch-api-wrapper's quality
- Fix problems that are important to users
- Enable a sustainable system for Fetch-api-wrapper's maintainers to review contributions

You can create PR as your wish to fix bug, and create features

## How to use It ?

✅ The features of Fetch api wrapper can be used without concern. They are tested and already used in some projects

### Install package

```
npm i @malolebrin/fetch-api-wrapper

// or

yarn add @malolebrin/fetch-api-wrapper

// or

pnpm i @malolebrin/fetch-api-wrapper
```

## Concepts and usage

Fetch api wrapper can be used in any javascript or typescript project (vanilla, react, vue, etc...)

This package was built to use the fetch api in a very simple way with a minimal configuration.

### Class or Hook

The package was built with two possible possibilities for the user.
You can use FetchApiWrapper class
```ts
import { FetchWrapper } from '@malolebrin/fetch-api-wrapper'

const api = new FetchWrapper({
  baseUrl: '<your url>',
  token: '<your token>',
  headers: '<your headers>',
})
```
Or useFetchWrapper hook.
```ts
import { useFetchWrapper } from '@malolebrin/fetch-api-wrapper'

const {
  deleteApi,
  postApi,
  patchApi,
  putApi,
  getApi,
  isSuccess,
  submissionErrors,
  setIsSubmitting,
} = useFetchWrapper({
  baseUrl: '<your url>',
  token: '<your token>',
  headers: '<your headers>',
})
```


It depends on your preference. Look at the documentation to understand how to use these two utilities

## Create the api instance with Class

```ts
import { FetchWrapper } from '@malolebrin/fetch-api-wrapper'

const api = new FetchWrapper({
  baseUrl: '<your url>',
  token: '<your token>',
  headers: '<your headers>',
})
```

You can now use the api constant with headers and tokens directly associated with it. 🚀

### Fetch data

```ts
const { data, success, status, statusText } = await api.get<TSInterface>('<my path>')

```
### Post data

```ts
const { data, success, status, statusText } = await api.post<TSInterface>('<my path>', body)

```
### Put data

```ts
const { data, success, status, statusText } = await api.put<TSInterface>('<my path>/:id', body)

```
### Patch data

```ts
const { data, success, status, statusText } = await api.patch<TSInterface>('<my path>/:id', body)

```
### Delete data

```ts
const { data, success, status, statusText } = await api.delete<TSInterface>('<my path>/:id')

```

## Create the api instance with Hook

```ts
import { useFetchWrapper } from '@malolebrin/fetch-api-wrapper'

const {
  deleteApi,
  postApi,
  patchApi,
  putApi,
  getApi,
  isSuccess,
  submissionErrors,
  setIsSubmitting,
} = useFetchWrapper({
  baseUrl: '<your url>',
  token: '<your token>',
  headers: '<your headers>',
})
```

You can now use the api constant with headers and tokens directly associated with it. 🚀

### Fetch data

```ts
const { data, success, status, statusText } = await getApi<TSInterface>('<my path>')

```
### Post data

```ts
const { data, success, status, statusText } = await postApi<TSInterface>('<my path>', body)

```
### Put data

```ts
const { data, success, status, statusText } = await putApi<TSInterface>('<my path>/:id', body)

```
### Patch data

```ts
const { data, success, status, statusText } = await patchApi<TSInterface>('<my path>/:id', body)

```
### Delete data

```ts
const { data, success, status, statusText } = await deleteApi<TSInterface>('<my path>/:id')

```


## License

[MIT](./LICENSE) License © 2022 [Malo Lebrin](https://github.com/MaloLebrin)
