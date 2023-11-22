import { useState, useEffect, Fragment } from 'react'
import { ReactComponent as UploadIcon } from '../../assets/icons/UploadIcon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/deleteIcon.svg'
import { FileUploader } from 'react-drag-drop-files'
import { BASE_URL } from '../../utils/constants'
import { useMutationQuery } from '../../queries'
import Modal from '../reusable/Modal'
import { useAppSelector } from '../../hooks/redux'
import useChangeFilter from '../../hooks/useChangeFilter'
import { useDispatch } from 'react-redux'
import { setEntries, setPage } from '../../redux/tableSlice/TableSlice'
import Pagination from '../reusable/Pagination'
import { Listbox, Transition } from '@headlessui/react'
import { ReactComponent as SquareTableIcon } from '../../assets/icons/squareTableIcon.svg'
import { ReactComponent as ListIcon } from '../../assets/icons/listIcon.svg'
import { CheckIcon } from '@heroicons/react/24/outline'
import { ReactComponent as EtcIcon } from '../../assets/icons/detail.svg'
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'
import { ReactComponent as CopyIcon } from '../../assets/icons/Copy.svg'
import { ReactComponent as ImportIcon } from '../../assets/icons/Import.svg'

export const connectselect = [
  {
    id: 1,
    sortkey: 'Sort By:',
    sortval: 'Date (New to Old)',
    value: [],
  },
  {
    id: 2,
    sortkey: 'Accounts:',
    sortval: 'All',
    value: [],
  },
  {
    id: 3,
    sortkey: 'Upload Status:',
    sortval: 'All',
    value: [],
  },
]

const mockData = [
  {
    fileName: 'your-file-here.csv',
    status: 'Incomplete',
    rows: 'Error',
    uploadedBy: 'Jacob Andrews',
    size: '25 KB',
    dateTime: '10:53AM  1-23-2023',
  },
  {
    fileName: 'your-file-here.csv',
    status: 'Complete',
    rows: '790 Rows',
    uploadedBy: 'Jacob Andrews',
    size: '25 KB',
    dateTime: '10:53AM  1-23-2023',
  },
  {
    fileName: 'your-file-here.csv',
    status: 'Complete',
    rows: '790 Rows',
    uploadedBy: 'Jacob Andrews',
    size: '25 KB',
    dateTime: '10:53AM  1-23-2023',
  },
]

const FileUpload = () => {
  const [show, setShow] = useState({ open: false, success: '', error: '' })
  const [modal, setModal] = useState(false)
  const [file, setFile] = useState<{ 0: File }[]>([])
  const dispatch = useDispatch()
  const { search } = useChangeFilter({ category: 'accountData' })
  const { entries, filteredData } = useAppSelector((state) => state.accountData)
  const [selected, setSelected] = useState('All')

  const [view, setView] = useState('card')

  const { mutate } = useMutationQuery(
    'post',
    BASE_URL + 'UploadCsv?userId=12&userEmail=clay@partnerchain.io',
    true,
    successfulyUploaded,
  )

  let time: ReturnType<typeof setTimeout>

  const handleAddAccounts = () => {
    mutate.mutate({ '': file[0] })
  }

  const handleOpenModal = () => {
    if (file?.length) {
      setShow({ open: true, error: '', success: '' })
    } else {
      setShow({ open: false, error: '', success: '' })
      setModal(true)
    }
  }
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }
  const handleChangeEntries = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    if (value >= 1 && value <= filteredData.data.length) {
      dispatch(setEntries({ value }))
      dispatch(setPage({ value: 1 }))
    }
  }
  function successfulyUploaded(data?: string) {
    if (data) {
      setShow({ open: true, error: '', success: data })
      setFile([])
    }

    time = setTimeout(() => {
      setShow((prev) => {
        return { ...prev, open: false }
      })
    }, 1500)
  }

  const onClose = () => {
    setShow({ open: false, error: '', success: '' })
    setModal(false)
  }

  const handleChange = (file: { 0: File; length: number }) => {
    if (file.length) {
      setFile((prev) => [...prev, file])
    }
  }

  const handleDeleteFile = (id: number) => {
    setFile((prev) => {
      return prev.filter((_, idx) => idx !== id)
    })
  }

  useEffect(() => {
    return () => {
      clearTimeout(time)
    }
  }, [])

  return (
    <div className='bg-white px-4 md:px-[33px]'>
      <div className='flex h-12 items-center gap-[15px] border-b-[1px] border-light-grey-100 pl-4'>
        <span className='roboto text-sm font-bold text-dark-grey'>Upload</span>
        <span className='roboto text-sm font-light italic text-dark-grey'>
          Import Co-Sell Account Data From PartnerTAP
        </span>
      </div>
      <div className='mt-[17px] mb-0 bg-light-grey-100 pt-[7px]'>
        <div className='m-auto flex max-w-[445px] flex-col items-center'>
          <span className='text-[22px] font-bold'>Upload</span>
          <div id='my-second-step' className='mb-10 flex w-full flex-col items-center justify-center'>
            <label
              htmlFor='dropzone-file'
              className={`dark:hover:bg-bray-800 relative flex ${file?.length ? 'h-[202px]' : 'sm:h-[202px] md:h-[427px]'
                } w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <div className='flex flex-col items-center gap-5'>
                  <UploadIcon fill='#483EA8' stroke='#483EA8' />
                  <div className='flex gap-1'>
                    <p className='mulish text-base font-bold text-dark-100'>Drag & drop files or</p>
                    <p className='mulish text-base font-bold text-purple-100 underline underline-offset-3'>
                      Browse
                    </p>
                  </div>
                </div>
                <p className='mulish px-5 pt-3 text-center text-xs text-grey-800 md:pt-[5px]'>
                  Supported formats: CSV
                </p>
              </div>
              <div className='upload absolute h-full w-full opacity-0'>
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name='file'
                  value={file}
                />
              </div>
            </label>
            {!!file?.length && (
              <div className='w-full self-start'>
                <span className='mulish block pb-[9px] pt-[11px] text-sm font-bold text-grey-800'>
                  Uploaded
                </span>
                <div className='flex w-full flex-col gap-[9px] pb-[27px]'>
                  {file?.map((item, id) => {
                    return (
                      <div
                        key={id}
                        className='flex items-center justify-between rounded border-[1px] border-green-100 pt-[10px] pr-[8px] pb-[8px] pl-[10px]'
                      >
                        <span>{item[0]?.name}</span>
                        <div className='cursor-pointer' onClick={() => handleDeleteFile(id)}>
                          <DeleteIcon className='h-3 w-4' />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            <button
              onClick={handleOpenModal}
              id='my-third-step'
              className={`mulish mt-[2px] h-[45px] w-full rounded bg-light-blue-100 text-sm font-bold uppercase text-white ${file?.length ? 'opacity-100' : 'opacity-50'
                }`}
            >
              Upload Files
            </button>
          </div>
        </div>
      </div>
      <Modal
        handleSend={handleAddAccounts}
        setOpen={onClose}
        type={file?.length ? 'upload' : ''}
        open={show.open}
        title={file?.length ? 'You want to upload account data?' : ''}
        status={show}
        loading={mutate.isLoading}
      />
      <Modal
        handleSend={handleAddAccounts}
        setOpen={onClose}
        type='select'
        open={modal}
        title={!file?.length ? 'Please select a file' : ''}
        status={show}
      />
      <div className='rounded border-[1px] border-light-grey-100'>
        <div className='flex h-12 items-center gap-[15px] border-b-[1px] border-light-grey-100 pl-4'>
          <span className='roboto text-sm font-medium text-dark-grey'>Historical Uploads</span>
        </div>
      </div>
      <div className='filteredShadowDiv flex flex-col gap-4'>
        <div className='flex flex-wrap justify-between pt-4 pr-[11px] pl-4 sm:flex-nowrap md:pl-9'>
          <div className='flex w-full max-w-[920px] flex-wrap gap-5'>
            <button className='filteredShadowButton roboto max-h-[37px] rounded bg-red-100 py-[9px] px-[19px] text-[13px] leading-[19px] text-white'>
              Archived Uploads
            </button>
            <div className='flex w-full max-w-[487px]'>
              <div className='h-[37px] w-10 rounded-l border-[1px] border-grey-200 bg-white-200'></div>
              <input
                type='text'
                placeholder='Search'
                onChange={search}
                className=' filteredShadowButton roboto h-[37px] w-full rounded-r border-[1px] border-grey-200 bg-white pl-[14px] text-sm placeholder:text-sm focus:border-grey-200 focus:outline-none'
              />
            </div>
          </div>
          <div className='mt-5 flex h-[45px] w-max items-center rounded border border-grey-400 sm:mt-0'>
            <button
              onClick={() => setView('card')}
              className={`flex h-full w-[66px] items-center justify-center rounded-l-md ${view === 'card' ? 'bg-light-blue text-white' : 'bg-light-grey-400 text-slate-500'
                }`}
            >
              <SquareTableIcon
                className={`max-h-[35px] ${view === 'card' ? 'fill-white' : 'fill-dark-grey'}`}
              />
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex h-full w-[66px] items-center justify-center rounded-r-md ${view === 'list' ? 'bg-light-blue text-white' : 'bg-light-grey-400 text-slate-500'
                }`}
            >
              <ListIcon
                className={`max-h-[35px] ${view === 'list' ? 'fill-white' : 'fill-dark-grey'}`}
              />
            </button>
          </div>
        </div>
        <div className='flex flex-wrap justify-between pr-[42px] pl-4 md:pl-9 lg:flex-nowrap'>
          <div className='flex w-full max-w-[1160px] flex-wrap gap-[22px]'>
            {connectselect.map((item) => {
              return (
                <Listbox value={selected} onChange={setSelected} key={item.id}>
                  {({ open }) => (
                    <>
                      <div className='relative h-[35px] w-full max-w-[214px] '>
                        <Listbox.Button className='relative w-full cursor-pointer rounded-md  bg-white-500 py-[5px]  px-[14px] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:bg-white  focus:outline-none focus:ring-2 sm:text-sm sm:leading-6'>
                          <span className='flex w-max items-center'>
                            <span className='text-[13px] font-bold text-grey-700'>
                              {item.sortkey}
                            </span>
                            <span className='ml-1 block truncate text-[13px] font-normal text-grey-700'>
                              {item.id === 1 ? 'Date (New to Old)' : selected}
                            </span>
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                            {!!item.value.length &&
                              item.value?.map((item: { id: number; name: string }) => (
                                <Listbox.Option
                                  key={item.id}
                                  className={({ active }) =>
                                    classNames(
                                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                      'relative cursor-default select-none py-2 pl-3 pr-9',
                                    )
                                  }
                                  value={item}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className='flex items-center'>
                                        <span
                                          className={classNames(
                                            selected ? 'font-semibold' : 'font-normal',
                                            'ml-3 block truncate',
                                          )}
                                        >
                                          {item.name}
                                        </span>
                                      </div>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4',
                                          )}
                                        >
                                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              )
            })}
          </div>
          <div className='ml-auto flex items-center gap-2 pt-[22px] lg:pt-0'>
            <span className=' text-[13px] leading-[19px] text-grey-600'>Show</span>
            <input
              type='number'
              min={1}
              value={entries}
              onChange={handleChangeEntries}
              className='h-[40px] max-w-[68px] rounded-md border-[2px] border-grey-500 px-3 outline-none focus:border-grey-500 focus:outline-none'
            />
            <span className='text-[13px] leading-[19px] text-grey-600'>entries</span>
          </div>
        </div>
        <div className='relative pt-[14px]'>
          <Pagination />
        </div>
        <div className='overflow-auto px-4 ring-opacity-5 md:px-[33px]'>
          <table className='mx-auto max-w-[500px] table-fixed border-separate border-spacing-y-1 xl:min-w-full xl:max-w-[1455px]'>
            <thead className='bg-white'>
              <tr>
                <th
                  scope='col'
                  className='inter py-3.5 pl-[71px] pr-3 text-left text-sm font-normal text-[#969696]'
                >
                  <div className='flex items-center gap-3'>File Name</div>
                </th>
                <th
                  scope='col'
                  className='inter min-w-[160px] px-3 py-3.5 text-left text-sm font-normal text-[#969696]'
                >
                  <div className='flex items-center gap-3'>Status</div>
                </th>
                <th
                  scope='col'
                  className='inter px-3 py-3.5 text-left text-sm font-normal text-[#969696]'
                >
                  Rows
                </th>
                <th
                  scope='col'
                  className='inter min-w-[160px] px-3 py-3.5 text-left text-sm font-normal text-[#969696]'
                >
                  Uploaded By
                </th>
                <th
                  scope='col'
                  className='inter px-3 py-3.5 text-left text-sm font-normal text-[#969696]'
                >
                  Size
                </th>
                <th
                  scope='col'
                  className='inter px-3 py-3.5 text-left text-sm font-normal text-[#969696]'
                >
                  Upload Date/Time
                </th>
                <th
                  scope='col'
                  className='inter min-w-[160px] px-3 py-3.5 text-left text-sm font-normal text-[#969696]'
                >
                  <div className='flex items-center gap-3'>Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {mockData.map((item, idx) => (
                <Fragment key={idx}>
                  <tr key={item.fileName}>
                    <td
                      className={`mulish rounded-l-md ${item.status === 'Complete'
                        ? 'border-y-[1px] border-l-[1px] border-green-400'
                        : 'border-y-[0.5px] border-l-[0.5px] border-error-red'
                        } whitespace-nowrap pl-[35px] pr-3 text-sm font-normal text-[#0F0F0F]`}
                    >
                      {item.fileName}
                    </td>
                    <td
                      className={`mulish whitespace-nowrap px-3 text-sm italic text-grey-100 ${item.status === 'Complete'
                        ? 'border-y-[1px] border-green-400'
                        : 'border-y-[0.5px] border-error-red'
                        }`}
                    >
                      {item.status}
                    </td>
                    <td
                      className={`mulish whitespace-nowrap px-3 text-sm italic text-grey-100 ${item.status === 'Complete'
                        ? 'border-y-[1px] border-green-400'
                        : 'border-y-[0.5px] border-error-red'
                        }`}
                    >
                      {item.rows}
                    </td>
                    <td
                      className={`mulish whitespace-nowrap px-3 text-sm italic text-grey-100 ${item.status === 'Complete'
                        ? 'border-y-[1px] border-green-400'
                        : 'border-y-[0.5px] border-error-red'
                        }`}
                    >
                      {item.uploadedBy}
                    </td>
                    <td
                      className={`mulish whitespace-nowrap px-3 text-sm italic text-grey-100 ${item.status === 'Complete'
                        ? 'border-y-[1px] border-green-400'
                        : 'border-y-[0.5px] border-error-red'
                        }`}
                    >
                      {item.size}
                    </td>
                    <td
                      className={`mulish whitespace-nowrap px-3 text-sm italic text-grey-100 ${item.status === 'Complete'
                        ? 'border-y-[1px] border-green-400'
                        : 'border-y-[0.5px] border-error-red'
                        }`}
                    >
                      {item.dateTime}
                    </td>
                    <td
                      className={`mulish whitespace-nowrap rounded-r-md px-3 text-sm text-grey-100 ${item.status === 'Complete'
                        ? 'border-y-[1px] border-r-[1px] border-green-400'
                        : 'border-y-[0.5px] border-r-[0.5px] border-error-red'
                        }`}
                    >
                      <div className='flex gap-4 bg-white md:py-1'>
                        <div
                          className={`flex gap-4 bg-white py-1 ${item.status === 'Complete' ? '' : 'opacity-30'
                            }`}
                        >
                          <button className='flex w-full items-center justify-center gap-[10px]'>
                            <CopyIcon />
                          </button>
                          <button className='flex w-full items-center justify-center gap-[10px] border-[#7B7B7B]'>
                            <ImportIcon />
                          </button>
                          <button className='flex w-full items-center justify-center gap-[10px]'>
                            <EtcIcon className='h-5 w-5' />
                          </button>
                        </div>
                        <div className='flex'>
                          <button className='flex w-full items-center justify-center gap-[10px] border-[#7B7B7B] pr-3 lg:pr-[18px]'>
                            <TrashIcon className='h-5 w-5' />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <td colSpan={7} className='pb-3'>
                    <span className='mulish text-base font-medium leading-[18px] text-error-red'>
                      {item.status === 'Incomplete' &&
                        'There was an error uploading this file and as result actions are limited'}
                    </span>
                  </td>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FileUpload
