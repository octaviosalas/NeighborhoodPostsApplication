import React from 'react'
import { UserContext } from '../store/usercontext'
import { useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';

const UserDataProfile = () => {

    const userContx = useContext(UserContext)

  return (
    <div className='border border-black rounded-2xl w-[600px]'> 

        <div className='flex justify-end mr-4  items-center'>
              <button className='justify-end border mt-2 text-sm border-blue-950 rounded-xl bg-blue-950 text-white hover:text-yellow-400'>Save</button>
        </div>

       <div className='flex '>
          <div className='justify-start'>
               <div className="avatar"> 
                       <div className="w-14 ml-4 gap-6 rounded-full"> 
                           <img src={userContx.userProfileImage} />
                        </div>
                </div>
          </div>
    
           <div className='items-center text-center justify-center ml-12'>

                <div className='flex'>
                    <span className='font-bold'>{userContx.userName}</span> 
                    <EditIcon style={{marginLeft:"12px", fontSize: "20px"}}/>
                </div>

                <div className='flex'>
                    <span>Personal Description</span>
                    <EditIcon style={{marginLeft:"12px", fontSize: "20px"}}/>
                </div>

                <div>
                        <div className='flex'>
                           <input type='text' placeholder='Ubication..' className='mt-2 h-8 border border-blue-950 text-sm w-80'/>
                           <EditIcon style={{marginLeft:"12px", fontSize: "20px", marginTop:"10px"}}/>
                        </div>

                        <div className='flex'>
                           <input type='text' placeholder='Ubication..' className='mt-2 border h-8  border-blue-950 text-sm w-80'/>
                           <EditIcon style={{marginLeft:"12px", fontSize: "20px", marginTop:"10px"}}/>
                        </div>

                        <div className='flex'>
                           <input type='text' placeholder='Ubication..' className='mt-2 border h-8 border-blue-950 text-sm w-80'/>
                           <EditIcon style={{marginLeft:"12px", fontSize: "20px", marginTop:"10px"}}/>
                        </div>
                </div>
                
                <div className='mt-12 justify-center flex items-center mb-4'>
                    <span className='font-bold cursor-pointer underline'>Delete my Account</span>
                </div>

               
            </div>

       </div>
    </div>
  )
}

export default UserDataProfile

/*import React from 'react'
import { UserContext } from '../store/usercontext'
import { useContext } from 'react'

const UserDataProfile = () => {

    const userContx = useContext(UserContext)

  return (
    <div> 
        <div className='border border-black rounded-xl w-[600px]'>
            <div className='flex mt-2 gap-6'>
                <div className="avatar"> <div className="w-12 ml-4 gap-6 rounded-full">  <img src={userContx.userProfileImage} /> </div>
                     <p className='ml-6 text-black font-bold mt-4 text-sm'>{userContx.userName}</p>
                </div>
            </div>

            <div className='inline-block'>
                <p>Descripcion personal</p>
                <div>
                    <div>
                    <input type='text' placeholder='Ubication..' className='mt-2'></input>
                    </div>
                    <div>
                    <input type='text' placeholder='Ubication..' className='mt-2'></input>
                    </div>
                    <div>
                    <input type='text' placeholder='Ubication..' className='mt-2'></input>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default UserDataProfile
*/