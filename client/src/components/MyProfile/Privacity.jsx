import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { useContext } from 'react';
import { UserContext } from '../../store/usercontext';
import { useNavigate } from 'react-router-dom';

const Privacity = ({close}) => { 

     const userCtx = useContext(UserContext)

     const [newName, setNewName] = useState("")
     const [newEmail, setNewEmail] = useState("")
     const [lastPassword, setLastPassword] = useState("")
     const [newPassword, setNewPassword] = useState("")
     const [cantSendData, setCantSendData] = useState(false)
     const [shortPassword, setShortPassword] = useState(false)


     const changeMyData = () => { 
        const newData = ( { 
            name: newName,
            email: newEmail,
            lastPassword: lastPassword,
            newPassword: newPassword
        })
        if(newName.length === 0 && email.length === 0 && lastPassword.length === 0 && newPassword.length === 0) { 
               setCantSendData(true)
        } else if (newPassword.length <= 5) { 
            setShortPassword(true)
        } else { 
            axios.put(`http://localhost:4000/changeUserData/${userCtx.userId}`, newData)
                 .then((res) => { 
                    console.log(res.data)
                 })
                 .catch((err) => { 
                    console.log(err)
                 })
        }
      
     }



  return (
    <div className=' grid grid-cols-7 mt-2 max-w-fit-contain border border-gray-300'>
     <small className='grid col-start-8 cursor-pointer mr-2' onClick={close}>X</small>
       <div className='grid col-span-12 '>
           <div className='mt-2 col-span-2'>
               <div className='flex items-center ml-2'>
                   <small className='text-gray-500 flex justify-start text-sm'>Privacity </small>
               </div>
           </div>     
           <div className='grid col-span-3 ml-2 mt-2'>
               <div className='flex flex-col items-start justify-start lg:flex-row  lg:items-center lg:juistify-center'>
                   <div className='flex items-center mt-2'>
                       <small className='text-sm font-bold ml-2'>Name:</small>
                       <input type="text" placeholder='Nombre..' className="text-xs h-6 border border-gray-200 ml-2" onChange={(e) => setNewName(e.target.value)}/>
                   </div>
                   <div className='flex items-center mt-2 '>
                       <small className='text-sm font-bold ml-2'>Email:</small>
                       <input type="text" placeholder='Email..' className="text-xs h-6 border border-gray-200  ml-2" onChange={(e) => setNewEmail(e.target.value)}/>
                   </div>
                   <div className='flex items-center mt-2'>
                       <small className='text-sm font-bold ml-2'>Password:</small>
                       <input type="text" placeholder='Actual Password..' className="text-xs h-6 border border-gray-200 ml-2" onChange={(e) => setLastPassword(e.target.value)}/>
                   </div>
                   <div className='flex items-center mt-2 mb-2 '>
                       <small className='text-sm font-bold ml-2'>New Password:</small>
                       <input type="text" placeholder='New Password..' className="text-xs h-6 border border-gray-200  ml-2" onChange={(e) => setNewPassword(e.target.value)}/>
                   </div>
               </div>
               <div className='mt-4'>
                   <button className='btn w-36 h-4 mb-2 text-white bg-blue-600 hover:bg-blue-800 hover:text-yellow-500' onClick={() => changeMyData()}>Save</button>
               </div>
               {shortPassword ? <p>The password must be more than 5 characteres</p> : null}
               {cantSendData ? <p>You must Complete all Items</p> : null}
           </div>
       </div>
   </div>    
  )
}

export default Privacity
