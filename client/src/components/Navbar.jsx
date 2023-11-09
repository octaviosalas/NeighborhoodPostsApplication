import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import New from './New'
import {Link} from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import theme from "../img/theme.png"

 const Navbar = () => {

        const userContx = useContext(UserContext) 
        const navigate = useNavigate()
        const [showOldNotifications, setShowOldNotifications] = useState(false)
        const [theme, setTheme] = useState("light");

        useEffect(() => {
          const isDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;
          console.log(isDarkMode)
          setTheme(isDarkMode ? "dark" : "light");
        }, []);
        
        useEffect(() => {
          document.querySelector("html").classList.remove("dark");
          document.querySelector("html").classList.add(theme);
        }, [theme]);
  
        useEffect(() => { 
          axios.get(`https://app-citizens.onrender.com/getMyNotifications/${userContx.userId}`)
            .then((res) => { 
                console.log(res.data)
                const allNotifications = res.data
                const unreadNotifications = allNotifications.filter(notis => notis.isRead === false)
                userContx.updateUserQuantityNotifications(unreadNotifications.length);
                userContx.updateUserNotifications(res.data); 
            })
            .catch((err) => { 
              console.log(err);
            })
        }, [userContx.userId]);

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

        const handleChangeTheme = () => {
          setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
        };
       
        const viewNotification = (x, y) => { 
          axios.put(`https://app-citizens.onrender.com/markAsRead/${y}`)
               .then((res) => { 
                console.log(res.data)
               })
               .catch((err) => { 
                console.log(err)
               })
          navigate(`/publication/${x}`)
        }
     
    const navigation = [
      { name: 'Wall', href: '/wall', current: false },
      { name: 'My Publications', href: `/myPublications/${userContx.userId}`, current: false },
      { name: 'New Report', href: `/`, current: false },
    ]

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }

      

    return (
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="mx-auto w-full px-2 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 main-content z-50 bg-gray-200">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to={"/"}><p className='text-yellow-500 invisible xxs:visible' >Nei United.</p></Link> 
                    
                  </div>
                  <div className="hidden sm:ml-6 sm:block ">
                    <div className="flex gap-6 md:gap-12 ">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? ' text-white' : 'text-black hover:bg-gray-700 hover:text-white ',
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
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-auto max-w-fit-contain shadow-xl bg-gray-100">
                        <div className="card-body">
                          <div className='flex flex-col items-center justify-center'>
                            <small className='text-lg font-bold'>Notifications</small>
                          </div>
                             <div className='flex flex-col justify-start items-start'>
                             {Array.isArray(userContx.userNotifications) ? (
                                    userContx.userNotifications.filter((n) => !n.isRead).map((n, index) => ( 
                                      <div className='flex flex-col items-center justify-center'>
                                          <div className='bg-gray-100 w-full mt-4 hover:underline'>
                                             <small onClick={() => viewNotification(n.publicationId, n._id)} key={n._id} className="text-xs font-bold cursor-pointer">{n.message}</small>
                                          </div>                                     
                                      </div>
                                    ))
                                  ) : (
                                    <div className='flex items-center justify-center'>
                                         <p className='text-xs font-bold '>You have no unread notifications</p>
                                    </div>
                                  )}
                             </div>
                             
                             <div className='flex flex-col justify-center items-center'>

                               {showOldNotifications ? 
                               <small className='text-black underline cursor-pointer text-sm ml-2' style={{ whiteSpace: 'nowrap' }} onClick={() => setShowOldNotifications(false)}>Close old Notifications</small>
                                    :
                               <small className='text-black underline cursor-pointer text-sm ml-2' style={{ whiteSpace: 'nowrap' }} onClick={() => setShowOldNotifications(true)}>View old Notifications</small> 
                                
                                }
                               {showOldNotifications ? 
                                  <div className='flex flex-col items-center justify-center'>
                                    <div className='border border-black w-full mt-4'></div>
                                      {Array.isArray(userContx.userNotifications) ? (
                                          userContx.userNotifications.filter((n) => n.isRead).map((n, index) => ( 
                                            <div className='flex flex-col items-center justify-center'>
                                                <div className='bg-gray-100 w-full mt-2 hover:underline'>
                                                  <small onClick={() => viewNotification(n.publicationId, n._id)} key={n._id} className="text-xs font-bold cursor-pointer">{n.message}</small>
                                                </div>                                     
                                            </div>
                                          ))
                                        ) : (
                                          <div className='flex items-center justify-center'>
                                              <p className='text-xs font-bold '>You have no unread notifications</p>
                                          </div>
                                        )}
                                 </div> : 
                                 null}

                             </div>
                        </div>
                    </div>
                 </div> 
                 
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex  rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400">
                        <img
                          className="h-12 w-12 rounded-full border"
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
                            <a  href="#" onClick={handleChangeTheme}  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}  >
                              Change Theme
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
              <div className=" bg-gray-200 rounded-lg mt-[33px] flex flex-col items-start justify-start">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-blue-800 font-bold hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-md font-medium'
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

