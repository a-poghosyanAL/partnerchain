import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { useFetch, useMutationParams, useMutationQuery } from '../../queries'
import { IaccountData } from '../../redux/tableSlice/model'
import {
  getAccountData,
  getAccountDetailData,
  getAccountDetailIsLoading,
  getTableIsLoading,
} from '../../redux/tableSlice/TableSlice'
import { BASE_URL, URL_SEND } from '../../utils/constants'
import ChartIframe from '../reusable/ChartIframe'
import Modal from '../reusable/Modal'
import OverLay from '../reusable/OverLay'
import DriveFooter from './DriveFooter'

const DriveGeneral = () => {
  const dispatch = useAppDispatch()
  const [childrenIds, setChildrenIds] = useState('')
  const [deleteStatus, setDeleteStatus] = useState({ error: '', success: '' })
  const [parentInfo, setParentInfo] = useState<IaccountData>()
  const { mutate: mutateChildren } = useMutationParams('get', getAccountDataOnSuccess)
  const { mutate: mutateDelete } = useMutationParams('DELETE', deleteSuccess, deleteError)
  const { mutate: accoundDataMutate } = useMutationQuery(
    'get',
    BASE_URL + 'GetParentDataWithAllButReady',
  )
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState({ error: '', success: '' })

  const handleViewDetail = (parent: IaccountData) => {
    setOpen(true)
    setParentInfo(parent)
    mutateChildren.mutate(BASE_URL + `GetChildrenData?ids=${parent.children_ids}`)
  }
  const [modal, setModal] = useState({ delete: false, email: false })
  let time: ReturnType<typeof setTimeout>

  const { mutate } = useMutationQuery(
    'post',
    URL_SEND,
    false,
    mailNothificationSuccess,
    mailNothificationError,
  )

  const handleChecked = (id?: number) => {
    if (itemId.has(id)) {
      setItemId((prev) => new Set([...prev].filter((item) => item !== id)))
    } else {
      setItemId((prev) => new Set([...prev, id]))
    }
  }
  const [itemId, setItemId] = useState(new Set())
  const [rowIdDetail, setRowIdDetail] = useState<number>()

  const handleEmail = (parent?: IaccountData, unique?: number) => {
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

  function mailNothificationSuccess(data?: string) {
    if (data) {
      setStatus({ error: '', success: data })
    }

    time = setTimeout(() => {
      setModal({ delete: false, email: false })
      itemId.clear()
      accoundDataMutate.mutate({})
      setOpen(false)
      setStatus({ error: '', success: '' })
    }, 2000)
  }

  function mailNothificationError() {
    setStatus({ error: 'Something went wrong', success: '' })

    time = setTimeout(() => {
      itemId.clear()
      setStatus({ error: '', success: '' })
    }, 2000)
  }

  const handleClose = () => {
    setModal({ email: false, delete: false })
    setDeleteStatus({ error: '', success: '' })
    setItemId(new Set())
  }

  const emailSend = () => {
    if (itemId.size) {
      mutate.mutate({
        rowIds: [...itemId],
      })
    }
  }

  const handleSendRemove = () => {
    mutateDelete.mutate(BASE_URL + `DeleteCustomerData?ids=${childrenIds}`)
  }

  const handleRemoveItem = (id: string) => {
    setModal({ delete: true, email: false })
    setChildrenIds(id)
  }

  function deleteSuccess() {
    setDeleteStatus({ error: '', success: 'Data Successfuly deleted' })
    time = setTimeout(() => {
      setChildrenIds('')
      setModal({ delete: false, email: false })
      setDeleteStatus({ error: '', success: '' })
      setOpen(false)
      accoundDataMutate.mutate({})
    }, 2000)
  }

  function deleteError() {
    setDeleteStatus({ error: 'Something went wrong', success: '' })
  }

  useEffect(() => {
    if (accoundDataMutate.isSuccess) {
      dispatch(getAccountData({ data: accoundDataMutate.data, category: 'driveData' }))
    }
    dispatch(getTableIsLoading({ data: accoundDataMutate.isLoading, category: 'driveData' }))
  }, [accoundDataMutate.isSuccess, accoundDataMutate.isLoading])

  useEffect(() => {
    return () => {
      clearTimeout(time)
    }
  }, [])

  const { data, isSuccess, isLoading } = useFetch<IaccountData[]>(
    BASE_URL + 'GetParentDataWithAllButReady',
    'driveData',
  )
  useEffect(() => {
    if (isSuccess) {
      dispatch(getAccountData({ data: data, category: 'driveData' }))
    }
    dispatch(getTableIsLoading({ data: isLoading, category: 'driveData' }))
  }, [isSuccess, isLoading])

  return (
    <div className='mx-[13px] rounded border-[1px] border-light-grey-100 bg-white pb-[50px] sm:mx-[20px] md:mx-[33px]'>
      <ChartIframe queryKey='chartValueDrive' url="GetMetabaseDashboardUrl" />
      <DriveFooter
        handleViewDetail={handleViewDetail}
        handleRemove={handleRemoveItem}
        handleEmail={handleEmail}
      />
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
        handleEmail={handleEmail}
      />
      <Modal
        setOpen={handleClose}
        open={modal.delete}
        title={'Are you sure you want to delete?'}
        status={deleteStatus}
        type='delete'
        handleSend={handleSendRemove}
      />
      <Modal
        setOpen={handleClose}
        open={modal.email}
        type='email'
        title={`You are about to send a message to the following people: ${parentInfo?.account_owner} and ${parentInfo?.partner_account_owner}`}
        status={status}
        handleSend={emailSend}
      />
    </div>
  )
}

export default DriveGeneral
