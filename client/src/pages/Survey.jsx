import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify"


const Survey = () => {

     const userCtx = useContext(UserContext)
     const navigate = useNavigate()
     const [showSurvey, setShowSurvey] = useState(true)
     const [securityLevel, setSecurityLevel] = useState(0);
     const [streetsLevel, setStreetsLevel] = useState(0);
     const [cleaningLevel, setCleaningLevel] = useState(0);
     const [lightingLevel, setLightinLevel] = useState(0);
     const [transitLevel, setTransitLevel] = useState(0);
     const [opinion, setOpinion] = useState("")
     const [usersLocation, setUsersLocation] = useState([])
     const [location, setLocation] = React.useState("")
    
    useEffect(() => { 
        axios.get("https://app-citizens.onrender.com/allUsersData")
             .then((res) => { 
                console.log(res.data)
                const allData = res.data
                const allLocations = allData.map((d) => (d.location))
                const uniqueLocations = [...new Set(allLocations)];
                setUsersLocation(uniqueLocations);
             })
             .catch((err) => { 
                console.log(err)
             })
    }, [])

    const sendMySurvey = () => { 
      const myOpinion = ( { 
         userName: userCtx.userName,
         userId: userCtx.userId,
         userProfileImage: userCtx.userProfileImage,
         location: location,
         securityLevel: securityLevel,
         streetsLevel: streetsLevel,
         lightingLevel: lightingLevel,
         cleaningLevel: cleaningLevel,
         transitLevel: transitLevel,
         opinion: opinion
      })
      axios.post("http://localhost:4000/saveSurvey", myOpinion)
           .then((res) => { 
            console.log(res.data)
            notificacionDeToast()
            setTimeout(() => { 
              setShowSurvey(false)
            }, 2700)
           })
           .catch((err) => { 
            console.log(err)
           })
    }

    const notificacionDeToast = () =>{ 
      toast.success("Your survey has been send", {
        position: toast.POSITION.TOP_CENTER,
        style: {
          color: "#082E58", 
        },
      });
    }

  return (
    <div className='mt-16 md:mt-12'>
         { showSurvey ?
        <>  
         <div className="flex flex-col items-center justify-center">
            <img src={userCtx.userProfileImage} className='h-24 w-24 rounded-full'/>
            <h3 className="text-base font-semibold leading-7 text-gray-900">Survey to find out the quality of life in your location</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Your answers will be saved, so that you can obtain general statistics and make your voice heard..</p>
            <select className='w-full text-center mt-4' title="a" onChange={(e) => setLocation(e.target.value)}>
                <option value={location} className='text-sm' disabled selected>Select your location</option>
                {usersLocation.map((l) => ( 
                    <option value={l}>{l}</option>
                ))}
            </select>
         </div>
        <div className='flex flex-col items-center justify-center mt-4'>
            <div className='mt-2  flex flex-col  rounded-lg'>
                <div className='flex i gap-24 mt-8 m-2'>
                    <small className='font-bold' style={{ marginRight: 'auto' }}>  Security level </small>
                    <Box>  <Rating name="simple-controlled" value={securityLevel} onChange={(event, newValue) => { setSecurityLevel(newValue); }} />  </Box>
                </div>
                <div className='flex i gap-24 mt-8 m-2'>
                    <small className='font-bold' style={{ marginRight: 'auto' }}>  Streets state. </small>
                    <Box>  <Rating name="simple-controlled" value={streetsLevel} onChange={(event, newValue) => { setStreetsLevel(newValue); }} />  </Box>
                </div>
                <div className='flex i gap-24 mt-8 m-2'>
                    <small className='font-bold' style={{ marginRight: 'auto' }}>  Cleaning level. </small>
                    <Box>  <Rating name="simple-controlled" value={cleaningLevel} onChange={(event, newValue) => { setCleaningLevel(newValue); }} />  </Box>
                </div>
                <div className='flex i gap-24 mt-8 m-2'>
                    <small className='font-bold' style={{ marginRight: 'auto' }}>  Lighting status </small>
                    <Box>  <Rating name="simple-controlled" value={lightingLevel} onChange={(event, newValue) => { setLightinLevel(newValue); }} />  </Box>
                </div>
                <div className='flex i gap-24 mt-8 m-2'>
                    <small className='font-bold' style={{ marginRight: 'auto' }}>  Transit level </small>
                    <Box>  <Rating name="simple-controlled" value={transitLevel} onChange={(event, newValue) => { setTransitLevel(newValue); }} />  </Box>
                </div>
            </div>
            
            <div className='flex flex-col items-center justify-center mt-12'>
                <h3 className="text-base font-semibold leading-7 text-gray-900">Write a brief summary giving your opinion about your location, highlighting the points to improve.</h3>
                <textarea className='w-full mt-4 rounded-lg' onChange={(e) => setOpinion(e.target.value)}></textarea>
                <button className='mt-4 w-full bg-blue-600 text-white hover:bg-blue-800' onClick={() => sendMySurvey()}>End survey</button>
            </div>
        </div> 
        </> 
        : 
        <div className='flex flex-col items-center justify-center'>
            <small className='text-lg '>We have saved your opinion so that more people can know it. Thank you for contributing to make your city better every day.!</small>
            <Link to={"/wall"}><small className='underline text-black mt-12 font-bold text-sm'>Go Back</small></Link>  
        </div> }
        <ToastContainer/>
    </div>
  )
}

export default Survey



/*import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const Survey = () => {

    const [value, setValue] = React.useState(2);


    
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Survey to find out the quality of life in your location.n</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Your answers will be saved, so that you can obtain general statistics and make your voice heard..</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Security level</dt>
            <Box sx={{ '& > legend': { mt: 2 }, }}>
              <Rating  name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }} />
           </Box>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">State of the streets</dt>
           <Box sx={{ '& > legend': { mt: 2 }, }}>
              <Rating  name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }} />
           </Box>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Lighting Status</dt>
           <Box sx={{ '& > legend': { mt: 2 }, }}>
              <Rating  name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }} />
           </Box>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Cleaning Level</dt>
           <Box sx={{ '& > legend': { mt: 2 }, }}>
              <Rating  name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }} />
           </Box>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Write a brief summary giving your opinion about your location.</dt>
           <Box sx={{ '& > legend': { mt: 2 }, }}>
              <Rating  name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue); }} />
           </Box>
          </div>
        
          
        </dl>
      </div>
    </div>
  )
}

export default Survey
*/