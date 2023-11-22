import { IaccountData } from '../../redux/tableSlice/model'
import { ReactComponent as DetailIcon } from '../../assets/icons/detail.svg'
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'
import { useAppSelector } from '../../hooks/redux'
import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg'
import { ReactComponent as LumenLogo } from '../../assets/icons/LumenLogo.svg'
import genesysLogo from '../../assets/icons/GenesysIcon.png'
import { ReactComponent as ZoomLogo } from '../../assets/icons/ZoomIcon.svg'
import { colorArray, status } from '../../utils/constants'
import { Tooltip } from 'react-tooltip'
import { useMemo } from 'react'
import { Column, Row } from 'react-table'
import { TableUi } from '../reusable/TableUi'

interface ITableData {
  handleViewDetail: (parent: IaccountData) => void
  handleRemoveItem: (id: string) => void
  handleEmail: (parent?: IaccountData) => void
}

export default function Table({ handleViewDetail, handleRemoveItem, handleEmail }: ITableData) {
  const { filteredData, entries, page } = useAppSelector((state) => state.accountData)

  const columns = useMemo(
    () => [
      {
        Header: "Account Owner",
        accessor: "account_owner",
        Cell: ({ value, row }: { value: string, row: Row<IaccountData> }) => {
          return (
            <div className='flex items-center gap-[30px]'>
              <div className={`h-full w-[17px] rounded-l ${status[row.original.status]} absolute left-0`}></div>
              <div className='flex justify-between gap-3'>
                <div className='flex items-center gap-[15px]'>
                  <div className='h-[25px] w-[25px]'>
                    {row?.original.partner_company?.includes('Genesys') ? (
                      <img
                        src={genesysLogo}
                        alt='genesysLogo'
                        className='h-full w-full rounded-full'
                      />
                    ) : row?.original.partner_company.includes('Zoom') ? (
                      <ZoomLogo className='h-full w-full' />
                    ) : (
                      <LumenLogo className='h-full w-full' />
                    )}
                  </div>
                  <span>{value}</span>
                </div>
              </div>
            </div>
          )
        },
        show: true
      },
      {
        Header: "Partner Account Owner",
        accessor: "partner_account_owner",
        Cell: ({ value, row }: { value: string, row: Row<IaccountData> }) => (
          <div className='flex items-center gap-[15px]'>
            <div className='h-[25px] w-[25px]'>
              <LumenLogo className='h-full w-full' />
            </div>
            <span>{value}</span>
          </div>
        )
      },
      {
        Header: "Partner Name",
        accessor: "partner_company_logo",
        Cell: ({ row }: { row: Row<IaccountData> }) => {
          return (
            <div className='flex items-center gap-2'>
              <div className='h-[25px] w-[25px]'>
                {row?.original.partner_company?.includes('Genesys') ? (
                  <img
                    src={genesysLogo}
                    alt='genesysLogo'
                    className='h-full w-full rounded-full'
                  />
                ) : row?.original.partner_company.includes('Zoom') ? (
                  <ZoomLogo className='h-full w-full' />
                ) : (
                  <LumenLogo className='h-full w-full' />
                )}
              </div>
              <span className='max-w-[130px] whitespace-pre-wrap'>{row?.original.partner_company}</span>
            </div>
          )
        }
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }: { value: string }) => (
          <div className='max-w-[130px] whitespace-pre-wrap'>{value}</div>
        ),
        show: false
      },
      {
        Header: "Accounts",
        accessor: "number_of_children",
        show: true,
      },
      {
        Header: "Deals",
        accessor: "opportunities",
        show: true
      },
      {
        Header: "Accounts",
        accessor: "companies",
        show: true,
        Cell: ({ row }: { row: Row<IaccountData> }) => {
          const companies = row?.original.shared_accounts.split('|').map((s) => s.trim())
          const beforePipe = companies.map((s) => s.split('|')[0])
          const uniqueBeforePipe = beforePipe.filter(
            (s, index, arr) => arr.indexOf(s) === index,
          )

          return (
            <div className='flex justify-center gap-3'>
              {uniqueBeforePipe.map((item, index) => {
                if (index < 4) {
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

              {uniqueBeforePipe.length > 4 && (
                <div className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-[50%] bg-light-blue text-[13px] text-white'>
                  +{uniqueBeforePipe.length - 4}
                </div>
              )}
            </div>
          )
        }
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }: { row: Row<IaccountData> }) => (
          <div className='flex items-center justify-center gap-3'>
            <div
              className='h-[18px] w-[18px] cursor-pointer'
              onClick={() => handleViewDetail(row?.original)}
            >
              <DetailIcon className='h-full w-full' />
            </div>
            <div
              onClick={() => handleRemoveItem(row?.original.children_ids)}
              className='h-[18px] w-[18px] cursor-pointer'
            >
              <TrashIcon className='h-full w-full' />
            </div>
            <div
              onClick={() => handleEmail(row.original)}
              className='h-[18px] w-[18px] cursor-pointer'
            >
              <TelegramIcon className='h-full w-full' />
            </div>
          </div>
        ),
      },
    ],
    [filteredData.data ?? []]
  )

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='ml-2 h-[2px] w-[17px] bg-blue-500'></div>
      <div className='mt-6 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-4 lg:px-6'>
            <div className='relative overflow-hidden'>
              <TableUi data={filteredData?.data
                ?.slice(page - 1 > 0 ? (page - 1) * entries : 0, page * entries)} columns={columns as Column[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
