import { ReactComponent as SquareTableIcon } from '../../assets/icons/squareTableIcon.svg'
import { ReactComponent as ListIcon } from '../../assets/icons/listIcon.svg'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import DriveFooterTable from './DriveFooterTable'
import { IaccountData, IFilters } from '../../redux/tableSlice/model'
import { IFilterValues } from '../../utils/model'
import useChangeFilter from '../../hooks/useChangeFilter'
import { useAppSelector } from '../../hooks/redux'
import { useDispatch } from 'react-redux'
import { setEntries, setPage } from '../../redux/tableSlice/TableSlice'
import Pagination from '../reusable/Pagination'
import { ReactComponent as ImportIcon } from '../../assets/icons/Import.svg'
import Cards from '../Table/Cards'
import { Link } from 'react-router-dom';

interface DriveViewDetail {
  handleViewDetail: (parent: IaccountData) => void
  handleRemove: (id: string) => void
  handleEmail: (parent?: IaccountData | undefined) => void
}

const DriveFooter = ({ handleViewDetail, handleRemove, handleEmail }: DriveViewDetail) => {
  const {
    filters,
    sort: { dir },
    selectedFilters,
    entries,
  } = useAppSelector((state) => state.accountData)
  const dispatch = useDispatch()

  const [view, setView] = useState('card')
  const { handleInputChange, search } = useChangeFilter({ category: 'driveData' })

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value >= 1) {
      dispatch(setEntries({ value }))
      dispatch(setPage({ value: 1 }))
    }
  }
  return (
    <div className='mx-[13px] rounded border-[1px] border-light-grey-100'>
      <div className='flex h-12 items-center gap-[15px] border-b-[1px] border-light-grey-100 pl-4'>
        <span className='roboto text-sm font-bold text-dark-grey'>Dashboard </span>
        <span className='roboto text-sm font-light italic text-dark-grey'>
          Manage the Connection Pipeline
        </span>
      </div>
      <div className='px-3 pt-[27px] pb-[52px] md:pr-[47px] md:pl-[10px]'>
        <div className='flex flex-col-reverse justify-between pb-4 sm:flex-row pl-9'>
          <div className='flex flex-wrap items-center gap-4 pt-1 sm:gap-[30px] sm:pt-0'>
            <Link to="/upload">
              <button className='rounded border border-light-blue bg-light-blue-100 py-[9px] px-[19px] text-[13px] text-white'>
                Upload More Accounts
              </button>
            </Link>
            <div className='flex w-full max-w-[278px]'>
              <div className='h-[37px] w-10 rounded-l border-[1px] border-grey-200 bg-white-200'></div>
              <input
                type='text'
                placeholder='Search'
                onChange={search}
                className=' filteredShadowButton h-[37px] w-full rounded-r border-[1px] border-grey-200 bg-white pl-[14px] focus:border-grey-200 focus:outline-none'
              />
            </div>
          </div>
          <div className='flex gap-[34px] h-full'>
            <button className='flex h-max items-center rounded bg-dark-grey-100 py-[9px] px-[19px]'>
              <ImportIcon fill='white' stroke-white="true" className='path' />
              <span className='lg:text-[10px] xl:text-[13px] text-white hidden lg:block'>Export Data (csv.)</span>
            </button>
            <div className=' flex h-[50px] w-max items-center self-end rounded border border-grey-400 sm:self-auto'>
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
        </div>
        <div className='flex flex-wrap justify-between pr-0 sm:pr-[42px] pb-3 sm:pb-0 pl-9'>
          <div className='flex w-full max-w-[1160px] flex-wrap gap-[22px]'>
            {filters.map((item) => {
              return (
                <Listbox key={item.id} onChange={(e: IFilterValues) => handleInputChange(e, item)}>
                  {({ open }) => (
                    <>
                      <div className='relative h-[35px] w-full sm:min-w-[214px] sm:max-w-max'>
                        <Listbox.Button className='relative w-full cursor-pointer rounded-md  bg-white-500 py-[5px]  px-[14px] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:bg-white  focus:outline-none focus:ring-2 sm:text-sm sm:leading-6'>
                          <span className='flex w-max items-center'>
                            <span className='text-[13px] font-bold text-grey-700'>
                              {item.sortLabel}
                            </span>
                            <span className='ml-1 block truncate text-[13px] font-normal text-grey-700'>
                              {item.id === 1
                                ? `${dir === 'asc'
                                  ? ' Low to High'
                                  : dir === 'desc'
                                    ? ' High to Low'
                                    : ''
                                }`
                                : selectedFilters[item.sortKey as keyof IFilters] || 'All'}
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
                              item.value?.map((item: IFilterValues) => (
                                <Listbox.Option
                                  key={item.id}
                                  className={({ active }) =>
                                    classNames(
                                      active ? 'bg-light-blue text-white' : 'text-gray-900',
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
                                            active ? 'text-white' : 'text-light-blue',
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
          <div className='flex items-center gap-2 pt-1 ml-auto'>
            <span className=' text-[13px] leading-[19px] text-grey-600'>Show</span>
            <input
              type='number'
              min={1}
              value={entries}
              onChange={handleChange}
              className='h-[40px] max-w-[68px] rounded-md border-[2px] border-grey-500 px-3 outline-none focus:border-grey-500 focus:outline-none'
            />
            <span className='text-[13px] leading-[19px] text-grey-600'>entries</span>
          </div>
        </div>
        <div className='flex-col-reverse flex sm:flex-col'>
          <Pagination />
          {view !== 'card' ? (
            <DriveFooterTable
              handleViewDetail={handleViewDetail}
              handleRemoveItem={handleRemove}
              handleEmail={handleEmail}
            />
          ) : (
            <Cards
              handleViewDetail={handleViewDetail}
              handleRemoveItem={handleRemove}
              handleEmail={handleEmail}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DriveFooter
