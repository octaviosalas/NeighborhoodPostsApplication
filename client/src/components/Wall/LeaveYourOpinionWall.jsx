import React from 'react'
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useContext } from 'react';
import { UserContext } from '../../store/usercontext';
import logi from "../../img/logi-removebg-preview.png";
import { Link } from 'react-router-dom';

const LeaveYourOpinionWall = () => {

    const userCtx = useContext(UserContext)


  return (
    <div className='border border-slate-300 w-60 xl:w-80 bg-gray-200  rounded-lg'>
       <div className='flex flex-col '>
           <div className='flex justify-between'>
                <small className='font-bold text-black text-left ml-2'>Give your opinion about your location</small>
                <div className="tooltip text-right mr-2" data-tip="Take a survey so that we know your opinion about the state of your town.">
                   <AnnouncementIcon style={{height:"20px", width:"20px"}}/>
                </div>
           </div>
           <div className='flex items-center gap-6 mt-6 justify-center'>
                <img src={userCtx.userProfileImage} className='h-14 w-14 rounded-full'/>
                <img src={logi} className='h-12 w-12 rounded-xl'/>
           </div>
           <div className='flex flex-col mt-4 mb-4 items-center justify-center'>
              <small className='text-sm'>We want to know your opinion</small>
              <small className='text-sm font-bold mt-2'> Make your voice heard!</small>
              <Link to={"/survey"}><button className='border border-none w-36  text-black text-xs mt-4 bg-yellow-500 hover:bg-blue-700 hover:text-white rounded-xl'>Take a free survey</button></Link>  
           </div>
       </div>
    </div>
  )
}

export default LeaveYourOpinionWall
