import React from 'react'

const ImagesModal = ({firstImage, secondImage}) => {
  return (
    <div className=''> 
          <small className="text-gray-500 text-xs underline cursor-pointer"  onClick={()=>document.getElementById('my_modal_7').showModal()}>View Photos</small>      
            <dialog id="my_modal_7" className="modal">
                <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className='flex items-center justify-center gap-4'>
                          <img src={firstImage}></img>
                          <img src={secondImage}></img>
                        </div>
                </div>
            </dialog>
    </div>
  )
}

export default ImagesModal
