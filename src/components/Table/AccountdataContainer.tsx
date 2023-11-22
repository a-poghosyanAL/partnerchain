import { UseMutationResult } from '@tanstack/react-query'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { useMutationParams } from '../../queries'
import { IaccountData } from '../../redux/tableSlice/model'
import { getAccountData, getBoxdata, getTableIsLoading } from '../../redux/tableSlice/TableSlice'
import { BASE_URL } from '../../utils/constants'
import Modal from '../reusable/Modal'
import Cards from './Cards'
import Table from './Table'

interface IAccountdataContainer {
  handleViewDetail: (parent: IaccountData) => void
  handleEmail: () => void
  status: { error: string; success: string }
  view: string
  handleOpenModal: (parent?: IaccountData) => void
  open: { delete: boolean; email: boolean }
  setModal: (open: { delete: boolean; email: boolean }) => void
  setItemId: Dispatch<SetStateAction<Set<unknown>>>
  accoundDataMutate: UseMutationResult<
    string | undefined,
    string | undefined,
    object | undefined,
    unknown
  >
  parentInfo?: IaccountData
  setChildrenIds: (childrenIds: string) => void
  childrenIds: string
  handleRemoveItem: (id: string) => void
  setOpen: (open: boolean) => void
}

const AccountdataContainer = ({
  view,
  handleEmail,
  handleViewDetail,
  status,
  handleOpenModal,
  open,
  setModal,
  setItemId,
  accoundDataMutate,
  parentInfo,
  setChildrenIds,
  childrenIds,
  handleRemoveItem,
  setOpen,
}: IAccountdataContainer) => {
  const [deleteStatus, setDeleteStatus] = useState({ error: '', success: '' })
  let time: ReturnType<typeof setTimeout>
  const dispatch = useAppDispatch()
  const { mutate: boxMutate } = useMutationParams('get', getBoxDataSuccess)

  const { mutate } = useMutationParams('DELETE', deleteSuccess, deleteError)

  useEffect(() => {
    if (status.success) {
      accoundDataMutate.mutate({})
    }
  }, [status])

  const handleSendRemove = () => {
    mutate.mutate(BASE_URL + `DeleteCustomerData?ids=${childrenIds}`)
  }

  function deleteSuccess() {
    setDeleteStatus({ error: '', success: 'Data Successfuly deleted' })
    time = setTimeout(() => {
      setChildrenIds('')
      boxMutate.mutate(BASE_URL + 'GetCustomerDataStatusCounts')
      accoundDataMutate.mutate({})
      setModal({ delete: false, email: false })
      setDeleteStatus({ error: '', success: '' })
      setOpen(false)
    }, 2000)
  }

  useEffect(() => {
    if (accoundDataMutate.isSuccess) {
      dispatch(getAccountData({ data: accoundDataMutate.data, category: 'accountData' }))
    }
    dispatch(getTableIsLoading({ data: accoundDataMutate.isLoading, category: 'accountData' }))
  }, [accoundDataMutate.isSuccess, accoundDataMutate.isLoading])

  function deleteError() {
    setDeleteStatus({ error: 'Something went wrong', success: '' })
  }

  useEffect(() => {
    return () => {
      clearTimeout(time)
    }
  }, [])

  const handleClose = () => {
    setModal({ email: false, delete: false })
    setDeleteStatus({ error: '', success: '' })
    setItemId(new Set())
  }

  function getBoxDataSuccess(data: []) {
    dispatch(getBoxdata(data))
  }

  return (
    <>
      {view === 'card' ? (
        <Cards
          handleRemoveItem={handleRemoveItem}
          handleViewDetail={handleViewDetail}
          handleEmail={handleOpenModal}
        />
      ) : (
        <Table handleViewDetail={handleViewDetail} handleRemoveItem={handleRemoveItem} handleEmail={handleOpenModal}/>
      )}
      <Modal
        setOpen={handleClose}
        open={open.delete}
        title={'Are you sure you want to delete?'}
        status={deleteStatus}
        type='delete'
        handleSend={handleSendRemove}
      />
      <Modal
        setOpen={handleClose}
        open={open.email}
        type='email'
        title={`You are about to send a message to the following people: ${parentInfo?.account_owner} and ${parentInfo?.partner_account_owner}`}
        status={status}
        handleSend={handleEmail}
      />
    </>
  )
}

export default AccountdataContainer
