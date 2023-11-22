import axios, { AxiosError } from 'axios'

export const apiRequest = async (url?: string, method = 'GET', body?: object, headers?: object) => {
  try {
    const { data } = await axios({
      method,
      url: url,
      data: body,
      headers,
    })

    return data
  } catch (e: unknown) {
    const error = e as AxiosError
    throw new Error(error?.message || 'Something went wrong')
  }
}
