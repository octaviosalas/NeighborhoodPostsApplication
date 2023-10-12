import React from 'react'
import { useEffect, useState } from 'react'

const OtherUserInfo = ({quantity, photo, name, favorites, birthdate, email, location, openFavs, openPublications}) => {

    const [showFirst, setShowFirst] = useState(true);
    const [showSecond, setShowSecond] = useState(false);

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
        console.log("primero:", showFirst)
        console.log("segundo:", showSecond)
      }, [showFirst, showSecond]);

   

  return (
    <div>
      <div className='flex flex-col items-center justify-center bg-white  max-w-fit-contain'>
          <div className='m-8 flex flex-col items-center justify-center'> 
              <img className='rounded-full h-28 w-28 lg:h-40 lg:w-40 max-w-fit-contain' src={photo}/>
              <small className='text-black font-bold text-lg mt-2'>{name}</small>
          </div>

          <div className='flex flex-col max-w-fit-contain mt-2 md:mt-4'>
            <small className='text-sm text-black font-bold mt-2'>{location}</small>
            <small className='text-sm font-bold text-black'>{birthdate}</small>
            <small className='text-sm font-bold text-black'>{email}</small>
          </div>

 

         <div className='border border-gray-600 mr-2 ml-2 mt-4 w-full invisible md:visible'></div>

  {showFirst? 
            <div className='flex flex-col items-center justify-center mt-2 md:mt-6 max-w-fit-contain '>
                <small className={'text-gray-500 text-sm font-bold  underline cursor-pointer'} onClick={() => openPublications()}>{quantity} Publications</small>
                <small className='text-gray-500 text-sm font-bold underline cursor-pointer' onClick={() => openFavs()}>{favorites} Favorites</small>
            </div> : null}
            
            {showSecond ? <div className='flex flex-col items-center justify-center mt-4'>
     <small className='underline text-gray-400 cursor-pointer'  onClick={() => openPublications()}>Show Publications</small>
     <small  className="underline text-gray-400 cursor-pointer" onClick={() => openFavs()}>Show Favorites</small>
  </div> : null}
 
</div>
    </div>
  )
}

export default OtherUserInfo
