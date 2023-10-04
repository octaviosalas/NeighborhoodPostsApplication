import React from 'react'

const ModalProfileChangePicture = ({photo}) => {
  return (
    <div>
       <img src={photo} className="rounded-full m-2 h-44 w-44 cursor-pointer" onClick={()=>document.getElementById('my_modal_6').showModal()} title="Leave a Comment"/>
           <dialog id="my_modal_6" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
                    <div className='flex items-center space-x-2'>
                         <img src={photo} className='mt-6 rounded-xl'/>
                    </div>
                    <div className='flex items-center justify-center mt-4'>
                         <small className='text-sm text-gray-500 underline cursor-pointer'>Examine</small>
                    </div>
                </form>
            </dialog> 
          
    </div>
  )
}

export default ModalProfileChangePicture
