import React from 'react'
import UserDataProfile from '../components/UserDataProfile'
import UserStats from '../components/UserStats'

const MyProfile = () => {
  return (
    <div>
        <div className='flex '>
            

            <div className='m-4 mt-12'>
                 <UserStats/>
            </div>
         
        </div>
    </div>
  )
}

export default MyProfile
