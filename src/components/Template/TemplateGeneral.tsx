import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import EmailTemplate from './EmailTemplate'

const connectselect = [
  {
    id: 1,
    sortkey: 'Template:',
    sortval: 'Lumen Q1 Sales Play',
    value: [],
  },
]

const TemplateGeneral = () => {
  const [selected, setSelected] = useState('All')

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className='flex flex-col gap-9 pl-3 lg:pl-16 pr-3 lg:pr-6 pb-20'>
      <div className='flex flex-wrap gap-3 sm:gap-7'>
        <button className='flex h-[40px] w-[123px] items-center justify-center rounded bg-light-blue text-sm leading-5 text-white'>
          New Template
        </button>
        {connectselect.map((item) => {
          return (
            <Listbox value={selected} onChange={setSelected} key={item.id}>
              {({ open }) => (
                <>
                  <div className='relative h-[40px] w-full max-w-[240px] '>
                    <Listbox.Button className='relative h-full w-full cursor-pointer rounded-md bg-white-500 py-[5px] px-[14px] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:bg-white focus:outline-none focus:ring-2 sm:text-sm sm:leading-6'>
                      <span className='flex w-max items-center'>
                        <span className='text-[13px] font-bold text-grey-700'>{item.sortkey}</span>
                        <span className='ml-1 block truncate text-[13px] font-normal text-grey-700'>
                          {item.id === 1 ? 'Lumen Q1 Sales Play' : selected}
                        </span>
                        <ChevronDownIcon
                          className='ml-2 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
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
      <EmailTemplate />
    </div>
  )
}

export default TemplateGeneral
