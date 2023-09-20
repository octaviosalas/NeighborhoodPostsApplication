import React from 'react'

const LoadingPublications = ({text}) => {
  return (
    <div> 
            <div>
                 <span>Loading {text}..</span>
                 <br />
                 <span className="loading loading-dots loading-lg"></span>
            </div>
    </div>
  )
}

export default LoadingPublications