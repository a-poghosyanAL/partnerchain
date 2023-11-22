import { createSlice } from '@reduxjs/toolkit'
import { getFilters } from './getFilters'
import {
  DataCategory,
  IaccountData,
  IFilters,
  ISearchFields,
  ITable,
  SortDir,
  SortFields,
} from './model'
const initialState: ITable = {
  accountData: { isLoading: false, data: [] },
  driveData: { isLoading: false, data: [] },
  accountDetailInfo: {
    isLoading: false,
    data: [],
  },
  filteredData: { isLoading: false, data: [] },
  sort: { key: '', dir: 'desc' },
  filters: [],
  selectedFilters: {},
  searchValue: '',
  boxData: [],
  entries: 10,
  page: 1
}
const searchingValues: ISearchFields[] = [
  'account_owner',
  'partner_account_owner',
  'partner_account_name',
  'partner_company',
  'shared_accounts',
]
const filterWithSelectedValues = (state: ITable, category: DataCategory) => {
  const data = [...state[category].data]
  state.filteredData.data = data.filter((item) => {
    return Object.entries(state.selectedFilters).every(([key, value]) => {
      return (item[key as keyof IaccountData] as string).includes(value)
    })
  })
}
const sort = (state: ITable) => {
  const { key } = state.sort
  if (!state.sort.dir || !key) return
  const data = [...state.filteredData.data]
  state.filteredData.data = data.sort((a, b) =>
    state.sort.dir === 'asc' ? a[key] - b[key] : b[key] - a[key],
  )
}
const tableSlice = createSlice({
  name: 'historyData',
  initialState,
  reducers: {
    getAccountData: (
      state,
      action: {
        payload: {
          category: DataCategory
          data: IaccountData[] | undefined | string
        }
      },
    ) => {
      const category = action.payload.category
      if (action.payload.data && typeof action.payload.data !== 'string') {
        state[category].data = action.payload.data
        state.filteredData.data = action.payload.data
      }
      state.filters = getFilters(state[category].data)
    },
    getTableIsLoading: (state, action) => {
      const category = action.payload.category as 'driveData' | 'accountData'
      state[category].isLoading = action.payload.data
      state.filteredData.isLoading = action.payload.data
    },
    sortData: (state, action: { payload: { key: SortFields; dir: SortDir } }) => {
      state.sort = { ...action.payload }
      sort(state)
    },
    filterData: (
      state,
      action: { payload: { key: keyof IFilters; value: string; category: DataCategory } },
    ) => {
      state.selectedFilters[action.payload.key] = action.payload.value
      filterWithSelectedValues(state, action.payload.category)
      sort(state)
    },
    searchData: (state, action: { payload: { value: string; category: DataCategory } }) => {
      const { value, category } = action.payload
      state.searchValue = value

      filterWithSelectedValues(state, category)
      sort(state)

      state.filteredData.data = state.filteredData.data.filter((item) => {
        return searchingValues.some((searchLabel) =>
          item[searchLabel].toLowerCase().includes(value.toLowerCase()),
        )
      })
    },
    resetFilters: (state) => {
      state.sort = { key: '', dir: 'desc' }
      state.filters = []
      state.selectedFilters = {}
      state.searchValue = ''
    },
    resetEntrie: (state) => {
      state.entries = 6
    },
    setEntries: (state, action) => {
      state.entries = action.payload.value
    },
    setPage: (state, action) => {
      state.page = action.payload.value
    },
    getAccountDetailData: (state, action) => {
      state.accountDetailInfo.data = action.payload
    },
    getAccountDetailIsLoading: (state, action) => {
      state.accountDetailInfo.isLoading = action.payload
    },
    getBoxdata: (state, action) => {
      state.boxData = action.payload
    },
   
  },
})
export const {
  getAccountData,
  getTableIsLoading,
  getAccountDetailData,
  getAccountDetailIsLoading,
  sortData,
  filterData,
  searchData,
  resetFilters,
  resetEntrie,
  getBoxdata,
  setEntries,
  setPage
} = tableSlice.actions
export default tableSlice.reducer
