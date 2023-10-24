import React from 'react'

const SuccesStorieModal = ({pubId}) => {


  return (
    <div>
      <small className="font-bold underline cursor-pointer text-xs" onClick={()=>document.getElementById('my_modal_12').showModal()}> See settlement and testimony</small>
            <dialog id="my_modal_12" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">{pubId}</p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
      </div>
  )
}

export default SuccesStorieModal
