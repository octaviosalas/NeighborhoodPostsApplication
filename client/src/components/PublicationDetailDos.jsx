import { Fragment, useState } from 'react'
import React from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../store/usercontext';
import { useContext } from 'react'
import useGetBackendQueries from '../Hooks/useGetBackendQueries';
import LoadingPublications from '../Hooks/LoadingPublications'
import PublicationDetailCard from './Cards/PublicationDetailCard'


const PublicationDetailDos = () => {

    const params = useParams()
    const userContx = useContext(UserContext)
    const [showFirst, setShowFirst] = useState(true);
    const [showSecond, setShowSecond] = useState(false);
  
    const { data, loading } = useGetBackendQueries(`getOnePublication/${params.publicationId}`); 
  

    const getScreenSize = () => {
        const screenSize = window.innerWidth;
        if (screenSize <= 768) { 
            setShowFirst(false);
            setShowSecond(true);
        } else {
            setShowFirst(true);
            setShowSecond(false);
        }
      };
    
      useEffect(() => {
        getScreenSize();
        window.addEventListener("resize", getScreenSize);
        return () => {
          window.removeEventListener("resize", getScreenSize);
        };
      }, []);



  return (
    <div className='border border-gray-500 w-auto m-4 max-w-fit-contain mt-24'>
       
            {showFirst ? <div className='grid grid-cols-2 gap-4 w-full max-w-fit-contain border border-gray-200 invisible md:visible'>    
                <div className='grid col-span-1 w-full m-4 max-w-fit-contain'> 
                    <div className='flex items-center justify-center  max-w-fit-contain'>
                        {data.map((d) => <PublicationDetailCard pub={d}/>)}
                    </div> 
                </div>
                <div className='grid col-span-1 w-full border'>
                    <div className='w-full flex justify-center max-w-fit-contain'> 
                        <div className='mt-2 max-w-fit-contain'>
                            <small className='mx-auto  ml-2 sm:ml-12 font-bold'>Coments</small>
                            <small className='mx-auto  ml-2 sm:ml-16 font-bold'>Likes</small>
                            <small className='mx-auto  ml-2 sm:ml-16 font-bold'>Who shared it</small>
                            <small className='mx-auto  ml-2 sm:ml-16 font-bold'>Visits</small>
                        </div>
                    </div>
                </div>
            </div> : null}

            {showSecond ? <div className='flex flex-col items-center justify-center gap-4 w-full max-w-fit-contain border border-gray-200 visible md:invisible'>    
                <div className='grid col-span-1 w-full m-4 max-w-fit-contain'> 
                    <div className='flex items-center justify-center  max-w-fit-contain'>
                        {data.map((d) => <PublicationDetailCard pub={d}/>)}
                    </div> 
                </div>
                <div className='grid col-span-1 w-full border'>
                    <div className='w-full flex justify-center max-w-fit-contain'> 
                        <div className='mt-2 max-w-fit-contain'>
                            <small className='mx-auto  ml-2 font-bold'>Coments</small>
                            <small className='mx-auto  ml-6  font-bold'>Likes</small>
                            <small className='mx-auto  ml-6  font-bold'>Who shared it</small>
                            <small className='mx-auto  ml-6  font-bold'>Visits</small>
                        </div>
                    </div>
                </div>
            </div> : null}
    
    </div>
  )
}

export default PublicationDetailDos
