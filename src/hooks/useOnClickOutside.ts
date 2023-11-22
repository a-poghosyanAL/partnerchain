import { MutableRefObject, RefObject, useEffect } from 'react'

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: MutableRefObject<T> | MutableRefObject<RefObject<HTMLElement>[]>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!Array.isArray(ref.current)) {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return
        }
        handler(event)
      } else {
        const innerClicked = ref.current?.some(({ current: curr }) => {
          if (curr?.contains(event.target as Node)) {
            return true
          }
          return false
        })

        if (!innerClicked) {
          handler(event)
        } else {
          return
        }
      }
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default useOnClickOutside
