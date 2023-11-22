export interface IFilterValues {
  id: number | string
  name: string
}

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never