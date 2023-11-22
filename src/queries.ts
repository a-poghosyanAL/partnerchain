import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from './configs/request'

let headers = {
  'Content-Type': 'multipart/form-data',
  accept: 'application/json',
}

export function useFetch<T>(url: string, queryKey: string, onSuccess?: (data: T) => void,refetchInterval?:number) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => apiRequest(url, 'get', {}, headers),
    retry: true,
    onSuccess,
    refetchInterval
  })
}

export function useMutationQuery(
  method = 'post',
  url?: string,
  mail?: boolean,
  onSuccess?: (data?: string) => void,
  onError?: (data?: string) => void,
) {
  if (!mail) {
    headers = { 'Content-Type': 'application/json', accept: 'application/json' }
  } else {
    headers = {
      'Content-Type': 'multipart/form-data',
      accept: 'application/json',
    }
  }
  return {
    mutate: useMutation({
      mutationFn: (body?: object) => apiRequest(url, method, body, headers),
      onSuccess,
      onError,
    }),
  }
}

export function useMutationParams(
  method = 'get',
  onSuccess?: (data: []) => void,
  onError?: () => void,
) {
  return {
    mutate: useMutation({
      mutationFn: (url?: string) => apiRequest(url, method, headers),
      onSuccess: onSuccess,
      onError,
    }),
  }
}
