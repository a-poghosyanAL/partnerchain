import { ReactComponent as LumenLogo } from '../../assets/icons/LumenLogo.svg'
import genesysLogo from '../../assets/icons/GenesysIcon.png'
import { ReactComponent as ZoomLogo } from '../../assets/icons/ZoomIcon.svg'
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg'
import arrow from '../../assets/icons/ArrowDown.png'
import { ReactComponent as EtcIcon } from '../../assets/icons/detail.svg'
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'
import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg'
import { useAppSelector } from '../../hooks/redux'
import { IaccountData } from '../../redux/tableSlice/model'
import { colorArray } from '../../utils/constants'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

interface ICardsProps {
  handleViewDetail: (parent: IaccountData) => void
  handleEmail: (parent?: IaccountData) => void
  handleRemoveItem: (id: string) => void
}
export default function Cards({ handleViewDetail, handleEmail, handleRemoveItem }: ICardsProps) {
  const { filteredData, entries, page } = useAppSelector((state) => state.accountData)

  return (
    <ul
      role='li  st'
      className='drop-shadow-[(4px 4px 4px rgba(0, 0, 0, 0.25)] mt-2 grid grid-cols-1 gap-9 gap-y-9 px-5 pl-9 drop-shadow-xl filter md:grid-cols-2 2xl:flex 2xl:flex-wrap 2xl:justify-start'
    >
      {!filteredData.isLoading &&
        filteredData?.data
          ?.slice(page - 1 > 0 ? (page - 1) * entries : 0, page * entries)
          .map((list, idx) => {
            const companies = list.shared_accounts.split('|').map((s) => s.trim())
            const beforePipe = companies.map((s) => s.split('|')[0])
            const uniqueBeforePipe = beforePipe.filter((s, index, arr) => arr.indexOf(s) === index)

            return (
              <li
                key={idx}
                className='col-span-1 w-full max-w-[369px] divide-y divide-gray-200 rounded-lg bg-white shadow-md'
              >
                <div className='filteredShadow flex h-full flex-col justify-between gap-4 rounded border-[1px] bg-white-500'>
                  <div className='flex items-center justify-between pl-[14px] pr-5 pt-[14px]'>
                    <div className='flex flex-col items-center gap-3 sm:flex-row'>
                      <div
                        className='flex h-[25px] w-[25px] items-center justify-center rounded-full'
                      >
                        {list.partner_company.includes('Genesys') ? (
                          <img
                            src={genesysLogo}
                            alt='genesysLogo'
                            className='h-full w-full rounded-full'
                          />
                        ) : list.partner_company.includes('Zoom') ? (
                          <ZoomLogo />
                        ) : (
                          <LumenLogo />
                        )}
                      </div>
                      <span className='inter text-center text-base font-normal sm:text-left'>
                        {list.account_owner}
                      </span>
                    </div>
                    <div className='px-3'>
                      <CopyIcon />
                    </div>
                    <div className='flex flex-col-reverse items-center gap-3 sm:flex-row'>
                      <span className='inter text-center text-base font-medium sm:text-left'>
                        {list.partner_account_owner}
                      </span>
                      <div className='flex h-[25px] w-[25px] items-center justify-center rounded-full bg-black'>
                        <img src={arrow} alt='arrow icon' />
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between px-6'>
                    <div className='flex flex-col items-center'>
                      <span className='inter text-[12px] font-normal text-light-grey xl:text-sm'>
                        Customers
                      </span>
                      <span className='inter text-[18px] font-medium text-dark-grey lg:text-xl'>
                        {list.number_of_customers}
                      </span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <span className='inter text-[12px] font-normal text-light-grey xl:text-sm'>
                        Prospects
                      </span>
                      <span className='inter text-[18px] font-medium text-dark-grey lg:text-xl'>
                        {list.number_of_prospects}
                      </span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <span className='inter text-[12px] font-normal text-light-grey xl:text-sm'>
                        Deals
                      </span>
                      <span className='inter text-[18px] font-medium text-dark-grey lg:text-xl'>
                        {list.opportunities}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center justify-center px-2 pb-1'>
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
                  <div className='flex bg-white py-[2px]'>
                    <button
                      onClick={() => handleRemoveItem(list.children_ids)}
                      className='flex w-1/2 items-center justify-start gap-[10px] border-r-[1px] border-[#7B7B7B] py-2 pl-2 lg:pl-[17px] xl:py-[11px]'
                    >
                      <TrashIcon />
                      <span className='inter text-xs text-red-100 sm:text-sm '>Remove</span>
                    </button>
                    <button
                      onClick={() => handleViewDetail(list)}
                      className='flex w-1/2 items-center justify-center gap-[10px] border-r-[1px] border-[#7B7B7B] py-2 xl:py-[11px]'
                    >
                      <EtcIcon />
                      <span className='inter text-xs text-grey-100 sm:text-sm'>Details</span>
                    </button>
                    <button
                      onClick={() => handleEmail(list)}
                      className='flex w-1/2 items-center justify-end gap-[10px] border-[#7B7B7B] py-2 pr-3 lg:pr-[18px] xl:py-[11px]'
                    >
                      <TelegramIcon />
                      <span className='inter text-xs text-light-blue-200 sm:text-sm'>Connect</span>
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
    </ul>
  )
}
