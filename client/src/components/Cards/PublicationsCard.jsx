import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useEffect, useM } from "react";
import { UserContext } from "../../store/usercontext";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useGetBackendQueries from "../../Hooks/useGetBackendQueries";
import CommentModal from "../Modals/CommentModal";
import ShareModal from "../Modals/ShareModal";
import CommentsPublications from "../CommentsPublications";
import LoadingPublications from "../../Hooks/LoadingPublications";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShareIcon from "@mui/icons-material/Share";
import WhoSharedPub from "../Modals/WhoSharedPub";
import ImagesModal from "../Modals/ImagesModal";


const PublicationsCard = ({ pub }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWhoShareModalOpen, setIsWhoShareModalOpen] = useState(false);
  const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false);
  const [pubChoosen, setPubChoosen] = useState([]);
  const [publicationChoosenFirstImage, setPublicationChoosenFirstImage] = useState("");
  const [publicationChoosenSecondImage, setPublicationChoosenSecondImage] =useState("");
  const [publicationChoosenId, setPublicationChoosenId] = useState("");
  const [publicationChoosenUserProfileImage,setPublicationChoosenUserProfileImage,] = useState("");
  const [publicationChoosenName, setPublicationChoosenName] = useState("");
  const [publicationChoosenaddresseeName, setPublicationChoosenaddresseeName] =useState("");
  const [publicationComments, setPublicationComments] = useState([]);
  const [quantityComments, setQuantityComments] = useState(0);
  const [quantityTimesShared, setQuantityTimesShared] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [loadComments, setLoadComments] = useState(false);
  const userContx = useContext(UserContext);

  const getActualDate = () => {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const day = String(fechaActual.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const actualDate = getActualDate();

  useEffect(() => {
    axios
      .get(`https://app-citizens.onrender.com/viewPublicationComments/${pub._id}`)
      .then((res) => {
        setQuantityComments(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://app-citizens.onrender.com/getSharedNumber/${pub._id}`)
      .then((res) => {
        setQuantityTimesShared(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const settingPubData = (x) => {
    setPubChoosen(x);
    setPublicationChoosenFirstImage(x.publicationImages[0]);
    setPublicationChoosenSecondImage(x.publicationImages[1]);
    setPublicationChoosenId(x._id);
    setPublicationChoosenName(x.creatorName);
    setPublicationChoosenaddresseeName(x.creatorId);
    setPublicationChoosenUserProfileImage(x.creatorProfileImage);
  };

  const notificacionDeToast = () => {
    toast.success("Publication was saved in your Favorites", {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: "#082E58",
      },
    });
  };

  const saveInFavorites = (pub) => {
    const newFavPub = {
      publicationId: pub._id,
      userId: userContx.userId,
      publicationAddress: pub.address,
      publicationCreatorName: pub.creatorName,
      publicationImages: pub.publicationImages,
      publicationTitle: pub.publicationTitle,
      publicationDescription: pub.publicationDescription,
      typeOfPublication: pub.typeOfPublication,
      creatorLocation: pub.creatorLocation,
      creatorProfileImage: pub.creatorProfileImage,
      creatorName: pub.creatorName,
      likedBy: userContx.userName,
      likedByPhoto: userContx.userProfileImage,
    };
    axios
      .post("https://app-citizens.onrender.com/markAsFavorite", newFavPub)
      .then((res) => {
        console.log(res.data);
        notificacionDeToast();
      })
      .catch((err) => {
        console.log(err);
      });

    const newNotification = {
      userId: userContx.userId,
      typeOfNotification: "like",
      dateNotification: actualDate,
      message: `${userContx.userName} Liked your Post`,
      isRead: false,
      recipientId: pub.creatorId,
      recipientName: pub.creatorName,
      publicationId: pub._id,
    };
    axios
      .post("https://app-citizens.onrender.com/saveNewNotification", newNotification)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPublicationComments = (idPublication) => {
    axios
      .get(`https://app-citizens.onrender.com/viewPublicationComments/${idPublication}`)
      .then((res) => {
        console.log(res.data);
        setPublicationComments(res.data);
        setLoadComments(true);
        setTimeout(() => {
          setShowComments(true);
          setLoadComments(false);
        }, 2700);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModalShareNow = () => {
    setIsShareModalOpen(false);
  };

  const closeModalWhoShareNow = () => {
    setIsWhoShareModalOpen(false);
  };

  const openCommentModal = (pub) => {
    settingPubData(pub);
    setIsCommentModalOpen(true);
    console.log("aa");
  };

  const openShareModal = (pub) => {
    settingPubData(pub);
    setIsShareModalOpen(true);
  };

  const openWhoShareModal = (pub) => {
    settingPubData(pub);
    setIsWhoShareModalOpen(true);
  };

  const showPhotosModal = (pub) => {
    setIsPhotosModalOpen(true);
    settingPubData(pub);
  };

  const closeModalPhotos = () => {
    setIsPhotosModalOpen(false);
  };

  return (
    <div className="mb-4">
      <div className="card rounded-xs 2xl:w-[500px] xl:w-[480px] lg:w-[480px] md:max-w-fit-contain bg-base-100 shadow-2xl shadow-side-left mt-4 ">
        <div className="card-body grid grid-cols-2" key={pub._id}>
          <div className="grid col-span-2">
            <div className="flex flex-col items-center xxs:flex-row  mt-2 ">
              <div className="avatar">
                <div className="h-full w-16 xxs:w-8 rounded-full">
                  <img src={pub.creatorProfileImage} />
                </div>
              </div>

              <div className="mt-2 xxs:mt-0">
              <Link to={`/userProfile/${pub.creatorId}`}>
               <p className="text-black text-sm ml-2 font-bold">
                  {" "}
                  {pub.creatorName}
                </p>
                </Link> 
              </div>

              <div className="flex flex-grow justify-end invisible xxs:visible">
                <Link to={`/publicationsSearched/${pub.typeOfPublication}`}>
                  <p className=" ml-8 whitespace-no-wrap text-sm  h-6  cursor-pointer hover:font-bold w-[70px]">
                    {pub.typeOfPublication}
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid col-span-2 max-w-fit-contain mt-2">
            <div className=" ml-4">
              <Link to={`/publication/${pub._id}`}>
                {" "}
                <p className="font-bold text-sm text-black">
                  {pub.publicationTitle}
                </p>
              </Link>
              <p className="justify-center  text-xs mr-4 mt-2">
                {pub.publicationDescription}
              </p>

              <div className="mt-4 whitespace-no-wrap">
                <p className=" text-xs mr-4  whitespace-no-wrap">
                  {pub.creatorLocation}, {pub.address}
                </p>
                <p className=" text-xs mr-4 underline cursor-pointer">
                  Ver en Mapa
                </p>
              </div>
            </div>
          </div>

          <div className="grid col-span-2">
            <div className="flex justify-center items-center mt-2 max-w-fit-contain ">
              <div className="avatar flex">
                <div className="w-24 md:w-32 xl:w-40  h-full border rounded">
                  <img src={pub.publicationImages[0]} />
                </div>
              </div>

              <div className="avatar flex">
                <div className="w-24 md:w-32 xl:w-40 border rounded ml-4">
                  <img src={pub.publicationImages[1]} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid col-span-2 mt-2">
            <div className="flex">
              <div className="flex flex-justify-start">
                {isPhotosModalOpen ? (
                  <ImagesModal
                    firstImage={publicationChoosenFirstImage}
                    secondImage={publicationChoosenSecondImage}
                    close={closeModalPhotos}
                  />
                ) : (
                  <small
                    className="text-xs text-gray-500 cursor-pointer underline"
                    onClick={() => showPhotosModal(pub)}
                  >
                    {" "}
                    +2 Photos
                  </small>
                )}
              </div>
            </div>
            <div className="grid col-start-2">
              <div className="h-6">
                <div className="flex flex-grow justify-end gap-4">
                  <small
                    className="text-xs text-gray-500 cursor-pointer underline ml-4"
                    onClick={() => getPublicationComments(pub._id)}
                  >
                    {quantityComments} Comments{" "}
                  </small>
                  <small className="text-xs text-gray-500 ml-2 cursor-pointer underline">
                    {isWhoShareModalOpen ? null : (
                      <small
                        onClick={() => openWhoShareModal(pub)}
                        className="text-xs"
                      >
                        {quantityTimesShared} shared
                      </small>
                    )}
                    {isWhoShareModalOpen && (
                      <WhoSharedPub
                        publicationId={publicationChoosenId}
                        close={closeModalWhoShareNow}
                      />
                    )}
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="grid col-span-2 mt-2 md:mt-0">
            <div className="flex justify-between ">
              <button
                className="btn border-none"
                onClick={() => saveInFavorites(pub)}
              >
                <FavoriteBorderIcon />
              </button>

              {/* isWhoShareModalOpen*/}

              <div className="border">
                {isCommentModalOpen ? null : (
                  <button onClick={() => openCommentModal(pub)}>
                    <RateReviewIcon />
                  </button>
                )}
                {isCommentModalOpen && (
                  <CommentModal
                    publicationId={publicationChoosenId}
                    creatorName={publicationChoosenName}
                    creatorId={publicationChoosenaddresseeName}
                  />
                )}
              </div>

              <div>
                {isShareModalOpen ? null : (
                  <button onClick={() => openShareModal(pub)}>
                    <ShareIcon />
                  </button>
                )}
                {isShareModalOpen && (
                  <ShareModal
                    pubChoosen={pubChoosen}
                    publicationId={publicationChoosenId}
                    creatorName={publicationChoosenName}
                    creatorId={publicationChoosenaddresseeName}
                    closeModalShare={closeModalShareNow}
                    profileImage={publicationChoosenUserProfileImage}
                    firstImage={publicationChoosenFirstImage}
                    secondImage={publicationChoosenSecondImage}
                  />
                )}
              </div>
            </div>


          </div>
        </div>

        {loadComments ? (
          <div>
            <LoadingPublications text={"comments"} />
          </div>
        ) : showComments ? (
          <div className="">
            <CommentsPublications
              comments={publicationComments}
              close={() => setShowComments(false)}
            />
          </div>
        ) : null}
      </div>

      <ToastContainer />
    </div>
  );
};

export default PublicationsCard;
