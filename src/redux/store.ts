import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './tableSlice/TableSlice'

export const store = configureStore({
  reducer: {
    accountData: tableReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
