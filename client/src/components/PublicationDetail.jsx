import { Fragment, useState } from 'react'
import React from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import { UserContext } from '../store/usercontext';
import { useContext } from 'react'
import PublicationsCard from './PublicationsCard'
import MyPublicationsCard from './MyPublicationsCard'
import CommentsDetail from './CommentsDetail'

const sortOptions = [
  { name: 'Edit Publication', href: '#', current: true },
  { name: 'Delete Publication', href: '#', current: false },
  { name: 'Puse Publication', href: '#', current: false },
  { name: 'Share Again', href: '#', current: false },
 
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PublicationDetail() {

  const params = useParams()
  const userContx = useContext(UserContext)

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [publicationData, setPublicationData] = useState([])
  const [showCommentDetails, setShowCommentDetails] = useState(false)
 
  useEffect(() => { 
     axios.get(`http://localhost:4000/getOnePublication/${params.publicationId}`)
          .then((res) => { 
            console.log(res.data)
            setPublicationData(res.data)
          })
          .catch((err) => { 
            console.log(err)
          })
  }, [])



  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200  pt-24">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">{publicationData.map((p) => p.publicationTitle)}</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Options
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                
               
                  <Disclosure as="div"  className="border-b border-gray-200 py-6">                 
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900" onClick={() => setShowCommentDetails(true)}> Comments</span>
                          </Disclosure.Button>
                        </h3>        
                  </Disclosure>

                  <Disclosure as="div"  className="border-b border-gray-200 py-6">
                     <h3 className="-my-3 flow-root">
                       <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                         <span className="font-medium text-gray-900">  Shared </span>
                       </Disclosure.Button>
                     </h3>
                 </Disclosure>

                 <Disclosure as="div"  className="border-b border-gray-200 py-6">
                     <h3 className="-my-3 flow-root">
                       <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                         <span className="font-medium text-gray-900">  Likes </span>
                       </Disclosure.Button>
                     </h3>
                </Disclosure>
              
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 ">
                {publicationData.map((pub) => ( 
                     <div className="card w-96  bg-base-100 shadow-xs shadow-side-left ">
                         <div className="" key={pub._id}>

                           <div className='flex'>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full">
                                            <img src={pub.creatorProfileImage}  />
                                        </div>
                                    </div>

                                        <div className=''>
                                          <p className="text-black text-sm ml-2">{pub.creatorName}</p>
                                        </div>

                                     < Link to={`/publicationsSearched/${pub.typeOfPublication}`}> 
                                          <p className='justify-end ml-12 whitespace-no-wrap text-sm  h-6  cursor-pointer hover:font-bold w-[70px]'>
                                            {pub.typeOfPublication}
                                          </p>
                                      </Link>
                            </div>

                            <div className=' ml-4'>
                                  <p className='font-bold text-sm color-black'>{pub.publicationTitle}</p>
                                  <p className='justify-center  text-xs mr-4'>{pub.publicationDescription}</p>

                                  <div className='mt-4 whitespace-no-wrap'>
                                      <p className=' text-xs mr-4  whitespace-no-wrap'>{pub.creatorLocation}, {pub.address}</p>
                                      <p className=' text-xs mr-4 underline cursor-pointer'>Ver en Mapa</p>
                                  </div>
                            </div>

                         <div className='flex justify-center mt-2'>
                                  <div className="avatar">
                                    <div className="w-24 rounded">
                                        <img src={pub.publicationImages[0]} />
                                    </div>
                                  </div>

                                <div className="avatar">
                                    <div className="w-24 rounded ml-4">
                                      <img src={pub.publicationImages[1]} />
                                    </div>
                                </div>
                         </div>                    
                      </div>
              </div> 
             ))}
              <div>
               {showCommentDetails ? <CommentsDetail/> : null}
              </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}














/*








import React from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import { UserContext } from '../store/usercontext';

import { useContext } from 'react'


const PublicationDeatil = () => { 

  const params = useParams()
  const [publicationData, setPublicationData] = useState([])

  function openModalThree() {
    const modal = document.getElementById('my_modal_3');
    modal.showModal();
  }

  function openModalFour() {
    const modal = document.getElementById('my_modal_4');
    modal.showModal();
  }

  const userContx = useContext(UserContext)

 
  useEffect(() => { 
     axios.get(`http://localhost:4000/getOnePublication/${params.publicationId}`)
          .then((res) => { 
            console.log(res.data)
            setPublicationData(res.data)
          })
          .catch((err) => { 
            console.log(err)
          })
  }, [])

  return (
    
    <div> 
        { publicationData.map((pub) => ( 
           <div className="card w-96 bg-base-100 shadow-2xl shadow-side-left mt-4">
                                <div className="card-body" key={pub._id}>
                                 
                                      <div className='flex'>
                                            <div className="avatar">
                                                <div className="w-8 rounded-full">
                                                    <img src={pub.creatorProfileImage}  />
                                                </div>
                                            </div>

                                            <div className=''>
                                              <p className="text-black text-sm ml-2">{pub.creatorName}</p>
                                            </div>
                                          <Link to={`/publicationsSearched/${pub.typeOfPublication}`}> <p className='justify-end ml-8 whitespace-no-wrap text-sm border h-6 border-black cursor-pointer rounded-full bg-blue-950 text-white hover:bg-yellow-400 hover:text-black hover:font-bold w-[70px]'>
                                              {pub.typeOfPublication}
                                            </p></Link>
                                    </div>
                                      <div className=' ml-4'>
                                          <p className='font-bold text-sm color-black'>{pub.publicationTitle}</p>
                                          <p className='justify-center  text-xs mr-4'>{pub.publicationDescription}</p>

                                          <div className='mt-4 whitespace-no-wrap'>
                                            <p className=' text-xs mr-4  whitespace-no-wrap'>{pub.creatorLocation}, {pub.address}</p>
                                            <p className=' text-xs mr-4 underline cursor-pointer'>Ver en Mapa</p>
                                          </div>
                                      </div>
                                    <div className='flex'>
                                         <div className="avatar">
                                            <div className="w-24 rounded">
                                                <img src={pub.publicationImages[0]} />
                                            </div>
                                         </div>

                                         <div className="avatar">
                                            <div className="w-24 rounded ml-4">
                                            <img src={pub.publicationImages[1]} />
                                            </div>
                                         </div>
                                    </div> 
                                    <div className='flex justify-between'>

                                         <button className="btn border-none" >
                                            <FavoriteBorderIcon />
                                         </button>  

                                         <div onClick={() => settingPubData(pub)}>
                                            <button className="btn" onClick={() => openModalThree()}><MarkUnreadChatAltIcon/></button>
                                          </div>    

                                        <button className="btn" onClick={() => openModalFour()}><ShareIcon/></button>
                                           </div>

                                           <dialog id="my_modal_3" className="modal">
                                                  <form method="dialog" className="modal-box">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <div className='flex items-center space-x-2'>
                                                        <div className="avatar">                                                     
                                                          <div className="w-8 rounded-full">
                                                              <img src={userContx.userProfileImage} />                                               
                                                          </div>
                                                          <p className='ml-2 text-gray-500 text-sm'>{userContx.userName}</p>
                                                        </div>
                                                    </div>
                                                      <textarea className='mt-2 border border-gray-400 w-full rounded-xl text-sm text-center'
                                                       placeholder='Write your commnent..'/>
                                                      <div className='flex justify-end'>
                                                          <button className='bg-blue-950 border-none mt-2 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400'>
                                                              Send
                                                            </button>
                                                      </div>
                                                  </form>
                                                </dialog> 
                                                  

                                                <dialog id="my_modal_4" className="modal">
                                                  <form method="dialog" className="modal-box w-80">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <h3 className="font-bold text-sm flex justify-start">Compartir reclamo en mi muro</h3>
                                                    <div className=''>
                                                          <button className='bg-blue-950 border-none mt-4 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400'>Share</button>
                                                      </div>
                                                  </form>
                                                </dialog>              
                                   </div>
                                   </div>
                                   ))}                   
    </div>
    
           
  )
}

export default PublicationDeatil
*/