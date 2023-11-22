import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import Loader from '../Table/Loader'

interface IModal {
  open: boolean
  setOpen: (open: boolean) => void
  status: { open?: boolean; error: string; success: string }
  handleSend: () => void
  title: string
  type?: 'email' | 'upload' | 'delete' | 'select' | ''
  loading?: boolean
}

export default function Modal({ open, setOpen, status, handleSend, title, type, loading }: IModal) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                {loading ? (
                  <Loader className='max-w-[140px]' />
                ) : (
                  <>
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                      <div className='sm:flex sm:items-start'>
                        {type === 'email' ? (
                          <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10'>
                            <EnvelopeIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                          </div>
                        ) : type === 'delete' ? (
                          <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10'>
                            <ExclamationTriangleIcon
                              className='h-6 w-6 text-red-600'
                              aria-hidden='true'
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                          <Dialog.Title
                            as='h3'
                            className='text-lg font-medium leading-6 text-dark-grey'
                          >
                            {title}
                          </Dialog.Title>
                        </div>
                      </div>
                    </div>
                    <div className='px-4 sm:flex sm:flex-row-reverse sm:px-6'>
                      <span
                        className={`${
                          status.error
                            ? 'block text-red-600'
                            : status.success
                            ? 'block text-green-600'
                            : 'hidden'
                        }`}
                      >
                        {status.error || status.success}
                      </span>
                    </div>
                    <div
                      className={`px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ${
                        type ? '' : 'pb-6'
                      }`}
                    >
                      {type === 'email' ? (
                        <>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={handleSend}
                          >
                            Send
                          </button>
                          <button
                            type='button'
                            className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </>
                      ) : type === 'delete' ? (
                        <>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={handleSend}
                          >
                            Yes
                          </button>
                          <button
                            type='button'
                            className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            No
                          </button>
                        </>
                      ) : type === 'upload' ? (
                        <>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={handleSend}
                          >
                            Upload
                          </button>
                          <button
                            type='button'
                            className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </>
                      ) : type === 'select' ? (
                        <>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={() => setOpen(false)}
                          >
                            Ok
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
