import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useAppSelector } from '../../hooks/redux'
import { ReactComponent as LinkedInIcon } from '../../assets/icons/Linkedin.svg'
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg'
import { ReactComponent as DisneyIcon } from '../../assets/icons/Disney.svg'
import { ReactComponent as EtcIcon } from '../../assets/icons/detail.svg'
import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg'
import { IaccountData } from '../../redux/tableSlice/model'
import { companyLogos } from '../../utils/constants'

interface IListsProps {
  handleViewDetail: (parent: IaccountData) => void
  handleEmail: (parent?: IaccountData) => void
}

const Lists = ({ handleViewDetail, handleEmail }: IListsProps) => {
  const { filteredData, page, entries } = useAppSelector((state) => state.accountData)

  return (
    <div className='w-full pr-3'>
      {!filteredData.isLoading &&
        filteredData?.data?.slice(page - 1 > 0 ? (page - 1) * entries : 0, page * entries).map((item, idx) => {
          return (
            <Disclosure as='div' key={idx} className={`${idx ? 'pt-6' : ''}`}>
              {({ open }) => (
                <>
                  <dt className='text-lg'>
                    <Disclosure.Button
                      className={`flex h-[83px] w-full items-center justify-between rounded-md border ${
                        open ? 'rounded-b-none' : ''
                      } border-light-grey px-6 text-left text-gray-400`}
                    >
                      <span className='font-medium text-gray-900'>{item.account_owner}</span>
                      <span className='ml-6 flex h-7 items-center'>
                        {open ? (
                          <MinusIcon className='h-6 w-6' />
                        ) : (
                          <PlusIcon className='h-6 w-6' />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel
                    as='dd'
                    className='h-full rounded-md rounded-t-none border border-t-0 border-light-grey 2xl:h-[80px]'
                  >
                    <div className='flex flex-col items-center justify-between border-b-[1px] border-b-light-grey bg-white-500 py-6 px-4 sm:p-6 lg:grid lg:grid-cols-2 lg:p-0 xl:flex xl:flex-row xl:flex-nowrap xl:gap-3'>
                      <div className='flex w-full items-center justify-between sm:pl-2 sm:pr-5 lg:w-auto xl:flex-col'>
                        <div className='flex w-full items-center gap-3'>
                          <LinkedInIcon className='min-w-[30px]' />
                          <span className='xm:text-xl text-[14px] font-bold'>
                            {item.account_owner}
                          </span>
                        </div>
                        <div className='px-3'>
                          <CopyIcon />
                        </div>
                        <div className='flex w-full items-center justify-end gap-3 lg:justify-start'>
                          <DisneyIcon className='min-w-[30px]' />
                          <span className='xm:text-xl text-[14px] font-bold'>
                            {item.partner_account_owner}
                          </span>
                        </div>
                      </div>
                      <div className='flex w-full justify-between pt-5 lg:w-auto xl:py-0 xl:px-6'>
                        <div className='flex flex-col items-center pr-2'>
                          <span className='text-sm text-light-grey sm:text-base'>Accounts</span>
                          <span className='text-[20px] text-xl font-black text-dark-grey xl:text-[30px]'>
                            {item.number_of_children}
                          </span>
                        </div>
                        <div className='flex flex-col items-center pl-3 pr-2 lg:border-l-2'>
                          <span className='text-sm text-light-grey sm:text-base'>Deals</span>
                          <span className='text-[20px] text-xl font-black text-dark-grey xl:text-[30px]'>
                            {item.opportunities}
                          </span>
                        </div>
                        {/* <div className='flex flex-col items-center pl-3 lg:border-l-2'>
                          <span className='text-sm text-light-grey sm:text-base'>Pipeline</span>
                          <span className='text-[20px] text-xl font-black text-dark-grey xl:text-[30px]'>
                            ${formatPipelineValue(item.potential_revenue) || 0}
                          </span>
                        </div> */}
                      </div>
                      <div className='col-start-1 col-end-3 flex w-full flex-col items-center justify-between gap-5 py-5 px-2 sm:flex-row sm:gap-20 xl:w-auto xl:border-l-2 xl:py-2'>
                        <span className='w-full max-w-[125px] text-sm text-light-grey sm:max-w-[70px] sm:text-base xl:max-w-[70px]'>
                          Shared Accounts:
                        </span>
                        <div className='flex w-full max-w-full flex-wrap justify-between gap-y-[1px]  sm:w-auto sm:max-w-none sm:flex-nowrap sm:gap-x-3 xl:max-w-[150px] xl:flex-wrap'>
                          {Object.entries(companyLogos).map(([key, value], idx) => {
                            if (idx < 5) {
                              return (
                                <div key={key}>
                                  <img
                                    src={value}
                                    alt=''
                                    className='h-[35px] min-h-[35px] w-[35px] min-w-[35px] rounded-[50%]'
                                  />
                                </div>
                              )
                            }
                          })}
                          <div className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-[50%] bg-light-blue text-[13px] text-white'>
                            +{Object.entries(companyLogos).length - 5}
                          </div>
                        </div>
                      </div>
                      <div className='hidden h-[120px] w-9 flex-col bg-white xl:flex 2xl:h-[90px]'>
                        <button
                          onClick={() => handleViewDetail(item)}
                          className='flex h-1/2 w-full items-center justify-center gap-2 rounded-t-[4px] border-b-[1px] py-[11px]'
                        >
                          <EtcIcon />
                        </button>
                        <button
                          onClick={() => handleEmail(item)}
                          className='flex h-1/2 w-full items-center justify-center gap-2 rounded-t-[4px] border-b-[1px] py-[11px]'
                        >
                          <TelegramIcon className='h-[15px] w-[15px]' />
                        </button>
                      </div>
                    </div>
                    <div className='flex bg-white py-2 xl:hidden'>
                      <button
                        onClick={() => handleViewDetail(item)}
                        className='flex w-1/2 items-center justify-center gap-[10px] border-r-[1px] border-[#7B7B7B] py-2 xl:py-[11px]'
                      >
                        <EtcIcon />
                        <span className='text-[11px] text-grey-100 xl:text-sm'>View Details</span>
                      </button>
                      <button
                        onClick={() => handleEmail(item)}
                        className='flex w-1/2 items-center justify-center gap-[10px] border-[#7B7B7B] py-2 pr-3 lg:pr-[18px] xl:py-[11px]'
                      >
                        <TelegramIcon />
                        <span className='text-[11px] text-light-blue-200 xl:text-sm'>Connect</span>
                      </button>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          )
        })}
    </div>
  )
}

export default Lists
