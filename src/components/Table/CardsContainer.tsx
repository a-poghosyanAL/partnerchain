import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useFetch, useMutationParams, useMutationQuery } from '../../queries'
import OverLay from '../reusable/OverLay'
import Loader from './Loader'
import {
  getAccountData,
  getAccountDetailData,
  getAccountDetailIsLoading,
  getBoxdata,
  getTableIsLoading,
} from '../../redux/tableSlice/TableSlice'
import { IaccountData } from '../../redux/tableSlice/model'
import AccountdataContainer from './AccountdataContainer'

import { BASE_URL, URL_SEND } from '../../utils/constants'
interface ICardsContainer {
  view: string
}
export default function CardsContainer({ view }: ICardsContainer) {
  const { accountData } = useAppSelector((state) => state.accountData)
  const [itemId, setItemId] = useState(new Set())
  const [modal, setModal] = useState({ delete: false, email: false })
  const { mutate } = useMutationQuery(
    'post',
    URL_SEND,
    false,
    mailNothificationSuccess,
    mailNothificationError,
  )
  const [childrenIds, setChildrenIds] = useState('')
  const [status, setStatus] = useState({ error: '', success: '' })
  const [open, setOpen] = useState(false)
  const [parentInfo, setParentInfo] = useState<IaccountData>()
  const [rowIdDetail, setRowIdDetail] = useState<number>()
  const { mutate: mutateChildren } = useMutationParams('get', getAccountDataOnSuccess)
  const { mutate: accoundDataMutate } = useMutationQuery('get', BASE_URL + 'GetParentDataWithReady')
  const { mutate: boxMutate } = useMutationParams('get', getBoxDataSuccess)

  const dispatch = useAppDispatch()
  const { data, isSuccess, isLoading } = useFetch<IaccountData[]>(BASE_URL + 'GetParentDataWithReady', 'cardsData')

  useEffect(() => {
    if (isSuccess) {
      dispatch(getAccountData({ data: data, category: 'accountData' }))
    }
    dispatch(getTableIsLoading({ data: isLoading, category: 'accountData' }))
  }, [isSuccess, isLoading])

  let time: ReturnType<typeof setTimeout>

  const handleChecked = (id?: number) => {
    if (itemId.has(id)) {
      setItemId((prev) => new Set([...prev].filter((item) => item !== id)))
    } else {
      setItemId((prev) => new Set([...prev, id]))
    }
  }

  const handleEmail = () => {
    if (itemId.size) {
      mutate.mutate({
        rowIds: [...itemId],
      })
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(time)
    }
  }, [])

  function mailNothificationSuccess(data?: string) {
    if (data) {
      setStatus({ error: '', success: data })
    }
    time = setTimeout(() => {
      setModal({ delete: false, email: false })
      itemId.clear()
      setOpen(false)
      boxMutate.mutate(BASE_URL + 'GetCustomerDataStatusCounts')
      accoundDataMutate.mutate({})
      setStatus({ error: '', success: '' })
    }, 2000)
  }

  function mailNothificationError() {
    setStatus({ error: 'Something went wrong', success: '' })

    itemId.clear()
    time = setTimeout(() => {
      setStatus({ error: '', success: '' })
    }, 2000)
  }

  useEffect(() => {
    if (mutateChildren.isLoading) {
      dispatch(getAccountDetailIsLoading(mutateChildren.isLoading))
    } else {
      dispatch(getAccountDetailIsLoading(mutateChildren.isLoading))
    }
  }, [mutateChildren])

  function getAccountDataOnSuccess(data: []) {
    dispatch(getAccountDetailData(data))
  }

  const handleViewDetail = (parent: IaccountData) => {
    mutateChildren.mutate(BASE_URL + `GetChildrenData?ids=${parent.children_ids}`)
    setOpen(true)
    setParentInfo(parent)
  }

  const handleOpenModal = (parent?: IaccountData, unique?: number) => {
    setParentInfo(parent)
    if (!unique) {
      if (parent?.children_ids && !itemId.size) {
        setItemId(new Set(parent?.children_ids?.split(',').map(Number)))
      }
    } else {
      setItemId(new Set([unique]))
    }

    setModal({ delete: false, email: true })
  }

  const handleRemoveItem = (id: string) => {
    setModal({ delete: true, email: false })
    setChildrenIds(id)
  }

  function getBoxDataSuccess(data: []) {
    dispatch(getBoxdata(data))
  }

  return (
    <div className='px-4  sm:px-6 lg:px-8'>
      <div className='flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='min-h-[500px] shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            {accountData.isLoading && <Loader className={'max-w-[150px]'} />}
            <div className='m-auto w-full pb-6 pt-4'>
              <AccountdataContainer
                handleViewDetail={handleViewDetail}
                handleEmail={handleEmail}
                status={status}
                view={view}
                open={modal}
                setOpen={setOpen}
                handleRemoveItem={handleRemoveItem}
                setChildrenIds={setChildrenIds}
                childrenIds={childrenIds}
                parentInfo={parentInfo}
                handleOpenModal={handleOpenModal}
                setModal={setModal}
                setItemId={setItemId}
                accoundDataMutate={accoundDataMutate}
              />
            </div>
          </div>
        </div>
      </div>
      <OverLay
        open={open}
        handleChecked={handleChecked}
        setOpen={setOpen}
        rowId={rowIdDetail}
        setRowId={setRowIdDetail}
        parentInfo={parentInfo}
        setItemId={setItemId}
        itemId={itemId}
        handleRemoveItem={handleRemoveItem}
        handleEmail={handleOpenModal}
      />
    </div>
  )
}
