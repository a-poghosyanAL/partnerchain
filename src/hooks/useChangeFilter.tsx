import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AllFilters, DataCategory, IFilters, SortFields } from '../redux/tableSlice/model'
import { filterData, searchData, sortData } from '../redux/tableSlice/TableSlice'
import { ArrayElement, IFilterValues } from '../utils/model'

interface IProps {
  category: DataCategory
}

export default function useChangeFilter({ category }: IProps) {
  const dispatch = useDispatch()

  const handleInputChange = useCallback(
    (e: IFilterValues, item: ArrayElement<AllFilters>) => {
      if (item?.isSort) {
        dispatch(
          sortData({
            key: item.sortKey as SortFields,
            dir: e.id === 2 ? 'asc' : 'desc',
          }),
        )
      } else {
        if (e.id === 0) {
          dispatch(
            filterData({
              key: item.sortKey as keyof IFilters,
              value: '',
              category,
            }),
          )
        } else {
          dispatch(
            filterData({
              key: item.sortKey as keyof IFilters,
              value: e.name,
              category,
            }),
          )
        }
      }
    },
    [category],
  )

  const search = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchData({ value: e.target.value, category }))
    },
    [category],
  )

  return { handleInputChange, search }
}
