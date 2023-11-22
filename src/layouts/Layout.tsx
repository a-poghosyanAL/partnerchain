import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import FullLogo from '../assets/images/partnerchainlogov3 1.png'
import AdminImg from '../assets/images/avatar-admin.png.png'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { breadcrumbs, navigation } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { resetEntrie, resetFilters } from '../redux/tableSlice/TableSlice'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const breadcrumb = breadcrumbs[location.pathname as keyof typeof breadcrumbs]
  const changeTab = (href: string) => {
    if (href === location.pathname) return
    dispatch(resetFilters())
    dispatch(resetEntrie())
    navigate(href)
  }

  return (
    <>
      <div className='h-screen bg-white-300'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as='div' className='relative z-40 lg:hidden' onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex w-full max-w-[270px] flex-1 flex-col pt-5 pb-4'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='fixed inset-y-0 flex w-[270px] flex-col'>
                    <div className='flex flex-grow flex-col overflow-y-auto bg-light-blue-300'>
                      <div className='filteredShadowSideBar flex flex-shrink-0 items-center bg-[#183853]'>
                        <img className='h-full w-full p-4' src={FullLogo} alt='Partner Chain' />
                      </div>
                      <div className='bgImage flex h-[155px] items-center justify-start pl-8'>
                        <div className='flex items-center justify-center gap-4'>
                          <img
                            className='h-[50px] min-h-[50px] w-[50px] min-w-[50px] rounded-[50%]'
                            src={AdminImg}
                            alt='admin'
                          />
                          <div className='flex flex-col items-center'>
                            <span className='text-shadow text-sm font-medium leading-4 text-white'>
                              Leo Allen
                            </span>
                            <span className='text-shadow text-sm font-light leading-4 text-white'>
                              Seattle, WA
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='mt-3 flex flex-1 flex-col'>
                        <nav className='flex flex-1 flex-col gap-4 space-y-1 pb-4'>
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={`${location.pathname === item.href
                                ? 'bg-white-opacity-100 text-indigo-100 hover:bg-white-opacity'
                                : 'bg-white-opacity text-white'
                                }
                                group flex h-[58px] items-center gap-[50px] px-2 py-4 pl-[22px] text-sm font-normal leading-4 shadow-right-2xl`}
                            >
                              <item.icon className='max-h-[18px] max-w-[25px]' />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <div className='hidden md:inset-y-0 lg:fixed lg:flex lg:w-[270px] lg:flex-col'>
          <div className='flex flex-grow flex-col overflow-y-auto bg-light-blue-300'>
            <div className='filteredShadowSideBar flex flex-shrink-0 items-center bg-[#183853]'>
              <img className='h-full w-full p-4' src={FullLogo} alt='Partner Chain' />
            </div>
            <div className='bgImage flex h-[155px] items-center justify-start pl-8'>
              <div className='flex items-center justify-center gap-4'>
                <img
                  className='h-[50px] min-h-[50px] w-[50px] min-w-[50px] rounded-[50%]'
                  src={AdminImg}
                  alt='admin'
                />
                <div className='flex flex-col items-center'>
                  <span className='text-shadow text-sm font-medium leading-4 text-white'>
                    Leo Allen
                  </span>
                  <span className='text-shadow text-sm font-light leading-4 text-white'>
                    Seattle, WA
                  </span>
                </div>
              </div>
            </div>
            <div className='mt-3 flex flex-1 flex-col'>
              <nav className='flex flex-1 flex-col gap-4 space-y-1 pb-4'>
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    id={`${item.name.includes('Import') && 'my-first-step'}`}
                    onClick={() => changeTab(item.href)}
                    className={`${location.pathname === item.href
                      ? 'bg-white-opacity-100 text-indigo-100 hover:bg-white-opacity'
                      : 'bg-white-opacity text-white'
                      }
                      group flex h-[58px] items-center gap-[50px] px-2 py-4 pl-[22px] text-sm font-normal leading-4 shadow-right-2xl`}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className='flex flex-1 flex-col bg-white-300 lg:pl-[270px]'>
          <div className='fixed top-0 z-10 flex h-[66px] w-full flex-shrink-0 items-center justify-between bg-white-300 pr-8 pl-3 lg:w-[calc(100%-270px)] lg:pl-16'>
            <button
              type='button'
              className='px-4 text-gray-500 focus:outline-none lg:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3BottomLeftIcon className='h-6 w-6' aria-hidden='true' fill='#000' />
            </button>
            <div>
              <span className='text-4 font-medium text-grey-500 sm:text-[22px]'>
                Co-Sell Orchestrator
              </span>
              <span className='pl-1 font-medium text-grey-500'>|</span>
              <span className='text-4 pl-1 font-light text-grey-500 sm:text-[22px]'>
                {breadcrumb.title}
              </span>
            </div>
          </div>
        </div>
        <div className='min-h-[calc(100%-66px)] bg-white-300 pt-16 lg:pl-[270px]'>
          <Outlet />
        </div>
        <div className='flex h-[66px] w-full flex-shrink-0 items-center gap-1 bg-white-300 pl-9 lg:pl-[300px]'>
          <span className='text-[13px] font-semibold text-grey-700'>PartnerChain Copyright 2023</span>
        </div>
      </div>
    </>
  )
}
