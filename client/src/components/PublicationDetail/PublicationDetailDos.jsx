import {useState } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { UserContext } from '../../store/usercontext';
import { useContext } from 'react'
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';
import LoadingPublications from '../../Hooks/LoadingPublications'
import PublicationDetailCard from '../Cards/PublicationDetailCard'
import Comments from './Comments';
import Likes from './Likes';
import WhoSharedPub from '../Modals/WhoSharedPub';
import WhoSharedDetail from './WhoSharedDetail';


const PublicationDetailDos = () => {

    const params = useParams()
    const userContx = useContext(UserContext)
    const [showFirst, setShowFirst] = useState(true);
    const [showSecond, setShowSecond] = useState(false);
    const [showComments, setShowComments] = useState(true)
    const [showLikes, setShowLikes] = useState(false)
    const [showShared, setShowShared] = useState(false)
  
    const { data } = useGetBackendQueries(`getOnePublication/${params.publicationId}`); 
    const { data: pubComments} = useGetBackendQueries(`viewPublicationComments/${params.publicationId}`); 
    const { data: pubShared} = useGetBackendQueries(`getSharedNumber/${params.publicationId}`); 
    const { data: pubLikes} = useGetBackendQueries(`getPublicationsLikes/${params.publicationId}`); 
    
    
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

      useEffect(() => {
       console.log(pubLikes)
      }, [pubLikes]);

      const showOnlyLikes = () => { 
        setShowComments(false)
        setShowLikes(true)
        setShowShared(false)
      }

      const showOnlyComments = () => { 
        setShowComments(true)
        setShowLikes(false)
        setShowShared(false)
      }

      const showOnlyShared = () => { 
        setShowComments(false)
        setShowLikes(false)
        setShowShared(true)
      }
    



  return (
    <div className='w-auto m-4 max-w-fit-contain mt-24'>
       
            {showFirst ? <div className='grid grid-cols-2 gap-4 w-full max-w-fit-contain border border-gray-200 invisible md:visible'>    
                <div className='grid col-span-1 w-full m-4 max-w-fit-contain'> 
                    <div className='flex items-center justify-center  max-w-fit-contain'>
                        {data.map((d) => <PublicationDetailCard pub={d}/>)}
                    </div> 
                </div>
                <div className='grid col-span-1 w-full border'>
                    <div className='w-full flex justify-center max-w-fit-contain'> 
                        <div className='mt-2 max-w-fit-contain'>
                            <small className={`mx-auto  ml-8 lg:ml-12 font-bold cursor-pointer ${showComments ? 'text-blue-500' : ''}`} onClick={() => showOnlyComments()}>Coments</small>
                            <small className={`mx-auto  ml-8 lg:ml-16 font-bold cursor-pointer ${showLikes ? "text-blue-500" : ""}`} onClick={() => showOnlyLikes()}>Likes</small>
                            <small className={`mx-auto  ml-8 lg:ml-16 font-bold cursor-pointer ${showShared ? "text-blue-500" : ""}`}onClick={() => showOnlyShared()}>Who shared it</small>
                        </div>
                    </div>

                    {showComments ?
                     <div className=''>
                        <Comments comments={pubComments}/>
                    </div>
                     :
                     null}

                    {showLikes ?
                     <div>
                        <Likes likes={pubLikes}/>
                    </div>
                     :
                     null} 

                     
                    {showShared ?
                     <div>
                        <WhoSharedDetail sharedData={pubShared}/>
                    </div>
                     :
                     null}                    

                </div>
            </div> : null}

            {showSecond ?
             <div className='flex flex-col items-center justify-center gap-4 w-full max-w-fit-contain border border-gray-200 visible md:invisible'>    
                <div className='grid col-span-1 w-full m-4 max-w-fit-contain'> 
                    <div className='flex items-center justify-center  max-w-fit-contain'>
                        {data.map((d) => <PublicationDetailCard pub={d}/>)}
                    </div> 
                </div>
                <div className='grid col-span-1 w-full border'>
                    <div className='w-full flex justify-center max-w-fit-contain'> 
                        <div className='mt-2 max-w-fit-contain'>
                            <small className={`mx-auto  ml-6 lg:ml-12 font-bold cursor-pointer ${showComments ? 'text-blue-500' : ''}`} onClick={() => showOnlyComments()}>Coments</small>
                            <small className={`mx-auto  ml-6 lg:ml-16 font-bold cursor-pointer ${showLikes ? "text-blue-500" : ""}`} onClick={() => showOnlyLikes()}>Likes</small>
                            <small className={`mx-auto  ml-6 lg:ml-16 font-bold cursor-pointer ${showShared ? "text-blue-500" : ""}`}onClick={() => showOnlyShared()}>Who shared it</small>
                       
                        </div>
                    </div>

                    {showComments ?
                     <div className=''>
                        <Comments comments={pubComments}/>
                    </div>
                     :
                     null}

                    {showLikes ?
                     <div>
                        <Likes likes={pubLikes}/>
                    </div>
                     :
                     null} 

                    {showShared ?
                     <div>
                        <WhoSharedDetail sharedData={pubShared}/>
                    </div>
                     :
                     null} 
                   
                </div>
            </div> 
            : 
            null}
    
    </div>
  )
}

export default PublicationDetailDos
