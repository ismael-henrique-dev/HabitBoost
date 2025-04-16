import { AxiosError } from 'axios'

export function getAxiosStatusCode(error: unknown) {
  const statusCode = error instanceof AxiosError ? error.response?.status : null
  return statusCode
}

