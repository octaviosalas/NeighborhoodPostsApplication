import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import New from './New'
import {Link} from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import { useNavigate } from 'react-router-dom';

 const Navbar = () => {

        const userContx = useContext(UserContext) 
        const navigate = useNavigate()
        const [notificationsDetail, setNotificationsDetail] = useState([])

        const logOut = () => { 
          userContx.updateUser(null)
          userContx.updateUserProfileImage(null)
          userContx.updateUserName(null)
          userContx.updateUserQuantityNotifications(null)
          userContx.updateUserNotifications(null)
          setTimeout(() => { 
            navigate("/login")
          }, 500)
        }

        const navigation = [
          { name: 'Wall', href: '/wall', current: false },
          { name: 'My Publications', href: `/myPublications/${userContx.userId}`, current: false }
        ]
    
        function classNames(...classes) {
          return classes.filter(Boolean).join(' ')
        }

        useEffect(() => { 
          console.log(userContx.userNotifications)
        }, [])

      

    return (
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 main-content z-50 bg-gray-200">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to={"/"}><p className='text-yellow-500' >Nei United.</p></Link> 
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? ' text-white' : 'text-black hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-circle">
                          <div className="indicator">
                            <BellIcon className="h-6 w-6 text-black" aria-hidden="true" />
                          {userContx.userId === null ? null :  <span className="badge badge-sm indicator-item">{userContx.userQuantityNotifications}</span>}
                          </div>
                      </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-auto bg-base-100 shadow-xl">
                        <div className="card-body">
                          <div className='flex flex-col items-center justify-center'>
                            <small className='text-lg font-bold'>Notifications</small>
                          </div>
                             <div className='flex flex-col justify-start items-start'>
                              
                                     <small className='text-black text-xs whitespace-nowrap m-2 bg-gray-100 cursor-pointer'><b> 🚩 Richard Peniston has commented your Publication</b></small>
                                     <small className='text-black text-xs whitespace-nowrap m-2 mt-4 bg-gray-100 cursor-pointer'><b> 🚩 Alexa Diamond shared your Publication</b></small>
                                     <small className='text-black text-xs whitespace-nowrap m-2 mt-4 bg-gray-100 cursor-pointer'><b> 🚩 Emily Watson saved your Publication in Favorites</b></small>
                             </div>
                             <div className='flex flex-col justify-start items-start'>
                                <small className='text-black underline cursor-pointer text-sm ml-2'>View old Notifications</small>
                             </div>
                        </div>
                    </div>
                 </div> 
                 
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={userContx.userProfileImage}
                          alt=""
                        /> 
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                           <Link to={`/prueba`}> <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} >
                               Profile
                            </a></Link>
                          )}
                        </Menu.Item>
                        
                        <Menu.Item>
                          {({ active }) => (
                            <a  href="#"   className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}  >
                              Settings
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a  href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} onClick={() => logOut()}>
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }

 export default Navbar

