import React, { Fragment, useState } from 'react'
import { ReactComponent as SquareTableIcon } from '../../assets/icons/squareTableIcon.svg'
import { ReactComponent as ListIcon } from '../../assets/icons/listIcon.svg'
import CardsContainer from '../Table/CardsContainer'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useAppSelector } from '../../hooks/redux'
import { IFilterValues } from '../../utils/model'
import { IFilters } from '../../redux/tableSlice/model'
import useChangeFilter from '../../hooks/useChangeFilter'
import { useDispatch } from 'react-redux'
import { setEntries, setPage } from '../../redux/tableSlice/TableSlice'
import Pagination from '../reusable/Pagination'

const ConnectFooter = () => {
  const {
    sort: { dir },
    selectedFilters,
    filters,
    filteredData,
    entries,
  } = useAppSelector((state) => state.accountData)
  const dispatch = useDispatch()
  const { handleInputChange, search } = useChangeFilter({ category: 'accountData' })

  const [view, setView] = useState('card')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    if (value >= 1 && value <= filteredData.data.length) {
      dispatch(setEntries({ value }))
      dispatch(setPage({ value: 1 }))
    }
  }
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className='mx-[13px] rounded border-[1px] border-light-grey-100'>
      <div className='flex h-12 items-center gap-[15px] border-b-[1px] border-light-grey-100 pl-4'>
        <span className='roboto text-sm font-bold text-dark-grey'>Connect </span>
        <span className='roboto text-sm font-light italic text-dark-grey'>
          Initiate Co-Sell Connection & Collaboration
        </span>
      </div>
      <div className='filteredShadowDiv flex flex-col gap-4'>
        <div className='flex justify-between pt-4 pr-[11px] pl-9'>
          <div className='flex w-full max-w-[920px] flex-wrap gap-5'>
            <button className='filteredShadowButton roboto max-h-[37px] rounded bg-light-blue py-[9px] px-[19px] text-[13px] leading-[19px] text-white'>
              Auto Connect All
            </button>
            <button className='filteredShadowButton roboto max-h-[37px] rounded bg-red-100 py-[9px] px-[19px] text-[13px] leading-[19px] text-white'>
              Clear Queue
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
          <div className='flex h-[45px] w-max items-center rounded border border-grey-400'>
            <button
              onClick={() => setView('card')}
              className={`flex h-full w-[66px] items-center justify-center rounded-l-md ${
                view === 'card' ? 'bg-light-blue text-white' : 'bg-light-grey-400 text-slate-500'
              }`}
            >
              <SquareTableIcon
                className={`max-h-[35px] ${view === 'card' ? 'fill-white' : 'fill-dark-grey'}`}
              />
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex h-full w-[66px] items-center justify-center rounded-r-md ${
                view === 'list' ? 'bg-light-blue text-white' : 'bg-light-grey-400 text-slate-500'
              }`}
            >
              <ListIcon
                className={`max-h-[35px] ${view === 'list' ? 'fill-white' : 'fill-dark-grey'}`}
              />
            </button>
          </div>
        </div>
        <div className='flex flex-wrap justify-between pr-[42px] pl-9 lg:flex-nowrap'>
          <div className='flex w-full max-w-[1160px] flex-wrap gap-[22px]'>
            {filters.map((item) => {
              return (
                <Listbox
                  // value={selected}
                  onChange={(e: IFilterValues) => handleInputChange(e, item)}
                  key={item.id}
                >
                  {({ open }) => (
                    <>
                      <div className='relative h-[35px] w-full min-w-[214px] max-w-max'>
                        <Listbox.Button className='relative w-full cursor-pointer rounded-md  bg-white-500 py-[5px]  px-[14px] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:bg-white  focus:outline-none focus:ring-2 sm:text-sm sm:leading-6'>
                          <span className='flex w-max items-center'>
                            <span className='roboto text-[13px] font-bold text-grey-700'>
                              {item.sortLabel}
                            </span>
                            <span className='roboto ml-1 block truncate text-[13px] font-normal text-grey-700'>
                              {item.id === 1
                                ? `${
                                    dir === 'asc'
                                      ? ' Low to High'
                                      : dir === 'desc'
                                      ? 'High to Low'
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
          <div className='ml-auto flex items-center gap-2 pt-[22px] lg:pt-0'>
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
        <div className=' flex flex-col-reverse pt-[14px] sm:relative sm:block'>
          <Pagination />
          <CardsContainer view={view} />
        </div>
      </div>
    </div>
  )
}

export default ConnectFooter
