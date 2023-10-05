import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import PublicationsCard from "../Cards/PublicationsCard";
import { UserContext } from "../../store/usercontext";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const ShareModal = ({
  pubChoosen,
  publicationId,
  creatorName,
  creatorId,
  closeModalShare,
  profileImage,
}) => {
  const [publicationTotal, setPublicationTotal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentShared, setCommentShared] = useState("");
  const [noCommentMessage, setNoCommentMessage] = useState(true)
  const userCtx = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/getOnePublication/${publicationId}`)
      .then((res) => {
        setPublicationTotal(res.data);
        console.log(res.data);
        setTimeout(() => {
          setLoading(true);
        }, 3500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [publicationId, creatorName, creatorId, profileImage]);

  function openModalFour() {
    const modal = document.getElementById("my_modal_4");
    modal.showModal();
  }

  const notificacionDeToast = () => {
    toast.error("You cant share a Publication with out comments", {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: "#FF0000",
      },
    });
  };

  const getActualDate = () => {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const day = String(fechaActual.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    console.log(pubChoosen);
  }, [pubChoosen]);

  const actualDate = getActualDate();

  const shareOnMyWall = () => {
    if(commentShared.length === 0) { 
      notificacionDeToast();
    } else { 
      const publicationDataToBeShared = {
        sharer: userCtx.userName,
        sharerId: userCtx.userId,
        sharerProfileImage: userCtx.userProfileImage,
        publicationCreatorId: pubChoosen.creatorId,
        publicationCreatorName: pubChoosen.creatorName,
        publicationCreatorProfileImage: pubChoosen.creatorProfileImage,
        sharingDate: actualDate,
        comment: commentShared,
        publicationImages: [
          pubChoosen.publicationImages[0],
          pubChoosen.publicationImages[1],
        ],
        pubDate: pubChoosen.publicationDate,
        categoryPub: pubChoosen.typeOfPublication,
        publicationTitle: pubChoosen.publicationTitle,
        publicationDescription: pubChoosen.publicationDescription,
        publicationAddress: pubChoosen.address,
        publicationUbication: pubChoosen.creatorLocation,
      };
      axios
        .post(
          `http://localhost:4000/sharePublication/${publicationId}`,
          publicationDataToBeShared
        )
        .then((res) => {
          console.log(res.data);
          setTimeout(() => {
            closeModalShare();
          }, 400);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    }
    

  return (
    <div>
      <button className="btn" onClick={() => openModalFour()}>
        <ShareIcon />
      </button>
      <dialog id="my_modal_4" className="modal ">
        {loading ? (
          <form method="dialog" className="modal-box max-w-fit-contain">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => closeModalShare()}
            >
              ✕
            </button>

            <div>
              <div className="mb-4 mt-4">
                <textarea
                  className="rounded-lg w-full h-auto text-sm text-center"
                  placeholder="Write your comment"
                  onChange={(e) => setCommentShared(e.target.value)}
                />
              </div>
              {publicationTotal.map((p) => (
                <div>
                  <div className="flex flex-start">
                    <img
                      className="rounded-2xl h-8 w-8"
                      src={p.creatorProfileImage}
                    ></img>
                    <small className="ml-4">{p.creatorName}</small>
                  </div>
                  <div className="justify-center">
                    <h2 className="font-bold text-lg">{p.publicationTitle}</h2>
                    <small className="mt-4">{p.publicationDescription}</small>
                    <small className="mt-6">
                      {p.creatorLocation}, {p.address}
                    </small>
                  </div>
                  <div className="flex justify-center mt-6">
                    <img
                      className=" h-24 w-24 ml-2"
                      src={p.publicationImages[0]}
                    ></img>
                    <img
                      className=" h-24 w-24 ml-2"
                      src={p.publicationImages[1]}
                    ></img>
                  </div>
                </div>
              ))}
            </div>

            <div className="">
            {commentShared.length !== 0 ? 
            <button
                className="bg-blue-950 border-none mt-4 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400"
                onClick={() => shareOnMyWall()}
              >
                Share in my Wall
              </button> : 
               <button className="bg-yellow-400 border-none mt-4 h-9 w-18 text-sm text-black hover:text-white hover:bg-blue-950">
                  You Cant Share with out Comment
                </button>}
            </div>
          </form>
        ) : (
          <div>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </dialog>
    </div>  
  );
};

export default ShareModal;
