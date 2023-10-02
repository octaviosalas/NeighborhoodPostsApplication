import React from 'react'
import SignIn from '../../pages/SignIn'

const MainOne = () => {
  return (
    <div className='w-full h-full border border-black'>
          <div>
            <img src={"https://d19rpgkrjeba2z.cloudfront.net/static/gen/14e7ea357e69d82474e7.jpg"}></img>
          </div>
          <div className='mt-[-800px] border border-'>
             <SignIn/>
          </div>
    </div>
  )
}

export default MainOne
