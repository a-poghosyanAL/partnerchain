import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg'
import { ReactComponent as BackIcon } from '../../assets/icons/back.svg'
import { ReactComponent as DetailIcon } from '../../assets/icons/detail.svg'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useAppSelector } from '../../hooks/redux'
import { IaccountData, IaccountDetail } from '../../redux/tableSlice/model'
import Loader from '../Table/Loader'
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg'
import { ReactComponent as LumenLogo } from '../../assets/icons/LumenLogo.svg'
import genesysLogo from '../../assets/icons/GenesysIcon.png'
import { ReactComponent as ZoomLogo } from '../../assets/icons/ZoomIcon.svg'
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'
import { Tooltip } from 'react-tooltip'
import { colorArray, status } from '../../utils/constants'

interface IOverLay {
  open: boolean
  setOpen: (open: boolean) => void
  rowId?: number
  setRowId: (rowId?: number) => void
  parentInfo?: IaccountData
  handleChecked: (id?: number) => void
  setItemId: React.Dispatch<React.SetStateAction<Set<unknown>>>
  itemId: Set<unknown>
  handleEmail: (parent?: IaccountData, unique?: number) => void
  handleRemoveItem: (id: string) => void
}

export default function OverLay({
  open,
  setOpen,
  rowId,
  setRowId,
  parentInfo,
  handleChecked,
  setItemId,
  itemId,
  handleEmail,
  handleRemoveItem,
}: IOverLay) {
  const { accountDetailInfo } = useAppSelector((state) => state.accountData)
  const [connect, setConnect] = useState(false)
  const [accountDetail, setAccountDetail] = useState<
    (Omit<IaccountDetail, 'status'> & { account_status: string }) | null
  >()

  const handleClose = () => {
    setOpen(false)
    setConnect(false)
    setItemId(new Set())
    setAccountDetail(null)
    setRowId(undefined)
  }

  useEffect(() => {
    const detail = accountDetailInfo.data.filter((elem) => elem.id === rowId)[0]
    if (detail) {
      const { id, status, ...rest } = detail
      if (rest && id) {
        setAccountDetail({ account_status: status, ...rest })
      }
    }
  }, [rowId])

  const handleCloseDetail = () => {
    setAccountDetail(null)
    setRowId(undefined)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto relative w-screen min-w-[320px] max-w-max md:min-w-[460px]'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                        onClick={handleClose}
                      >
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex h-full flex-col overflow-y-auto bg-white shadow-xl'>
                    <div className='flex'>
                      <div className='h-screen w-[470px] overflow-y-auto pt-[84px] pb-24'>
                        <div className='flex w-full flex-col gap-10 pl-[43px] pr-[50px]'>
                          <div className='absolute left-0 top-0 z-50 flex min-h-[69px] w-full max-w-[470px] items-center justify-center bg-white'>
                            <span className='inter text-xl leading-7 text-grey-1000 md:text-[24px]'>
                              {!accountDetail ? 'Details' : 'Connection Details'}
                            </span>
                          </div>
                          <div className='flex flex-col justify-between gap-3 '>
                            <div className='flex justify-between'>
                              <div className='flex gap-4'>
                                <div className='h-[25px] w-[25px]'>
                                  {parentInfo?.partner_company?.includes('Genesys') ? (
                                    <img
                                      src={genesysLogo}
                                      alt='genesysLogo'
                                      className='h-full w-full rounded-full'
                                    />
                                  ) : parentInfo?.partner_company.includes('Zoom') ? (
                                    <ZoomLogo className='h-full w-full' />
                                  ) : (
                                    <LumenLogo className='h-full w-full' />
                                  )}
                                </div>
                                <div className='flex flex-col items-center'>
                                  <div className='flex items-center gap-3'>
                                    <span className='inter text-[20px]'>
                                      {parentInfo?.account_owner}
                                    </span>
                                    <CopyIcon />
                                  </div>
                                  <span className='inter text-base text-grey-1000'>Avant</span>
                                </div>
                              </div>
                              <div className='flex gap-4'>
                                <div className='h-[25px] w-[25px]'>
                                  <LumenLogo className='h-full w-full' />
                                </div>
                                <div className='flex flex-col items-center'>
                                  <span className='text-[20px]'>
                                    {parentInfo?.partner_account_owner}
                                  </span>
                                  <span className='inter text-base text-grey-1000'>{parentInfo?.partner_company}</span>
                                </div>
                              </div>
                            </div>
                            <div className='flex items-center gap-[7px] self-center'>
                              {parentInfo && <div className={`h-[15px] w-[15px] rounded-[50%] ${status[parentInfo?.status]}`}></div>}
                              <div>
                                <span className='inter text-base text-grey-1000'> Status: </span>
                                <span className='inter text-base'>{parentInfo?.status}</span>
                              </div>
                            </div>
                          </div>
                          {accountDetailInfo.isLoading || !accountDetailInfo.data.length ? (
                            <Loader className='max-w-[100px]' />
                          ) : (
                            accountDetailInfo.data.map((elem) => {
                              const companies = elem?.shared_account
                                .split('|')
                                ?.map((s) => s.trim())
                              const beforePipe = companies.map((s) => s.split('|')[0])
                              const uniqueBeforePipe = beforePipe.filter(
                                (s, index, arr) => arr.indexOf(s) === index,
                              )

                              return (
                                <div
                                  key={elem.id}
                                  className={`filteredShadow relative rounded border-[1px] bg-white-500 ${rowId !== elem.id && rowId ? 'opacity-50' : 'opacity-1'
                                    }`}
                                >
                                  <div className='w-full'>
                                    <div className='flex items-center gap-4 pl-[25px] pt-[20px] pb-[17px]'>
                                      {/* <PayPalIcon className='filteredShadow h-[50px] w-[50px]' /> */}
                                      {elem.partner_company.includes('Genesys') ? (
                                        <img
                                          src={genesysLogo}
                                          alt='genesysLogo'
                                          className='filteredShadow h-[25px] w-[25px] rounded-full'
                                        />
                                      ) : elem.partner_company.includes('Zoom') ? (
                                        <ZoomLogo className='filteredShadow h-[25px] w-[25px] rounded-full' />
                                      ) : (
                                        <LumenLogo className='filteredShadow h-[25px] w-[25px] rounded-full' />
                                      )}
                                      <span className='inter max-w-[238px] text-2xl font-medium text-light-grey-100'>
                                        {elem.account_name}
                                      </span>
                                    </div>
                                  </div>
                                  <div className='mb-5 flex justify-between px-9'>
                                    <div className='flex flex-col items-center'>
                                      <span className='inter text-light-grey'>Account Status</span>
                                      <span className='inter'>{elem.account_type}</span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                      <span className='inter text-light-grey'>Partner Status</span>
                                      <span className='inter'>
                                        {elem.partner_is_customer === 'TRUE'
                                          ? 'Customer'
                                          : 'Partner'}
                                      </span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                      <span className='inter text-light-grey'>Deals</span>
                                      <span className='inter'>{elem.open_opps}</span>
                                    </div>
                                  </div>
                                  <div className='flex items-center justify-center px-2 pb-3'>
                                    <div className='flex flex-wrap gap-3'>
                                      {uniqueBeforePipe.map((item, index) => {
                                        if (index < 5) {
                                          return (
                                            <div
                                              key={index}
                                              data-tooltip-id={`tooltip-${item}`}
                                              className={`flex h-[35px] w-[35px] items-center justify-center rounded-full text-white`}
                                              style={{ backgroundColor: `${colorArray[index]}` }}
                                            >
                                              <Tooltip id={`tooltip-${item}`} content={item} />
                                              {item[0]}
                                            </div>
                                          )
                                        }
                                      })}

                                      {uniqueBeforePipe.length > 5 && (
                                        <div className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-[50%] bg-light-blue text-[13px] text-white'>
                                          +{uniqueBeforePipe.length - 5}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className='flex bg-white py-2'>
                                    <button
                                      onClick={() =>
                                        handleRemoveItem((elem.id as number)?.toString())
                                      }
                                      className='flex w-1/2 items-center justify-start gap-[10px] border-r-[1px] border-[#7B7B7B] py-2 pl-2 lg:pl-[14px] xl:py-[11px]'
                                    >
                                      <TrashIcon />
                                      <span className='inter text-sm text-red-100'>Remove</span>
                                    </button>
                                    <button
                                      className='flex w-1/2 items-center justify-center gap-[10px] border-r-[1px] border-[#7B7B7B] py-2 xl:py-[11px]'
                                      onClick={() => setRowId(elem.id)}
                                    >
                                      <DetailIcon />
                                      <span className='inter text-sm text-grey-100'>Details</span>
                                    </button>
                                    <button
                                      onClick={() => handleEmail(parentInfo, elem.id)}
                                      className='flex w-1/2 items-center justify-end gap-[10px] border-[#7B7B7B] py-2 pr-3 lg:pr-[18px] xl:py-[11px]'
                                    >
                                      <TelegramIcon />
                                      <span className='inter text-sm text-light-blue-200'>
                                        Connect
                                      </span>
                                    </button>
                                  </div>
                                  <div className='absolute right-[15px] top-[14px]'>
                                    <div
                                      onClick={() => handleChecked(elem.id)}
                                      className='relative top-1 left-1 self-start'
                                    >
                                      {itemId.has(elem.id) ? (
                                        <CheckIcon className='absolute fill-light-grey-100' />
                                      ) : (
                                        <></>
                                      )}
                                      <input
                                        type='checkbox'
                                        className='h-[22px] w-[22px] appearance-none self-start rounded-[1px] border-2 border-light-grey-100 text-white accent-light-grey-100 ring-2 ring-light-grey-100'
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          )}
                        </div>
                      </div>
                      <div
                        className={`combineTransitions h-full bg-white-500 shadow-left-2xl ${!(parentInfo && accountDetail)
                          ? 'w-0 max-w-0 opacity-0'
                          : 'opacity-1 w-[460px] max-w-[460px] pl-[34px]'
                          }`}
                      >
                        {accountDetail && (
                          <>
                            <div className='pb-5'>
                              <div>
                                <div className='flex items-center justify-between pr-3'>
                                  <div className='flex items-center gap-[15px]'>
                                    <div className='flex items-center gap-4 pt-[20px] pb-[17px]'>
                                      <div className='max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px]'>
                                        {accountDetail.partner_company.includes('Genesys') ? (
                                          <img
                                            src={genesysLogo}
                                            alt='genesysLogo'
                                            className='h-full w-full rounded-full'
                                          />
                                        ) : accountDetail.partner_company.includes('Zoom') ? (
                                          <ZoomLogo className='h-full w-full' />
                                        ) : (
                                          <LumenLogo className='h-full w-full' />
                                        )}
                                      </div>
                                      <span className='inter text-[32px] font-medium text-black'>
                                        {accountDetail.account_name}
                                      </span>
                                    </div>
                                  </div>
                                  <button onClick={handleCloseDetail}>
                                    <XMarkIcon className='h-5 w-5' />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className='flex h-[calc(100vh-164px)] flex-col gap-4 overflow-y-auto pb-[50px] pt-5'>
                              {Object.entries(accountDetail).map(([key, value], idx) => {
                                return (
                                  <div
                                    key={idx}
                                    className={`flex flex-col gap-1 ${idx !== 0 && 'pl-6'}`}
                                  >
                                    <span className='inter text-sm capitalize text-light-grey'>
                                      {key.replace(/_/g, ' ')}
                                    </span>
                                    <span className='inter text-base font-medium'>
                                      {value || '-'}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='absolute bottom-0 mt-auto flex min-h-[42px] w-full max-w-[462px] items-center rounded bg-light-blue px-4'>
                    {!connect ? (
                      <>
                        <button
                          className={`mx-auto flex items-center justify-center ${itemId.size ? 'cursor-pointer' : 'cursor-not-allowed'
                            }`}
                          disabled={itemId.size ? false : true}
                          onClick={() => handleEmail(parentInfo)}
                        >
                          <span className='mulish text-sm font-bold uppercase leading-7 text-white md:text-base'>
                            Connect All {itemId.size ? '(' + itemId.size + ')' : ''}
                          </span>
                        </button>
                      </>
                    ) : (
                      <button onClick={() => setConnect(false)}>
                        <BackIcon />
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
