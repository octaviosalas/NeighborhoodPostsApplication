import React from 'react'

const LoadingPublications = ({text}) => {
  return (
    <div> 
            <div className=''>
                 <span className='font-bold text-sm lg:text-md text-black dark:text-black'>Loading {text}..</span>
                 <br />
                 <span className="loading loading-dots loading-lg"></span>
            </div>
    </div>
  )
}

export default LoadingPublications
