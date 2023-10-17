import React, { useEffect } from "react";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../store/usercontext";
import { useNavigate } from "react-router-dom";
import useGetBackendQueries from "../../Hooks/useGetBackendQueries";
import LoadingPublications from "../../Hooks/LoadingPublications";
import CommentsPublications from "../CommentsPublications";

const MyPublicationsCard = ({ pub, comments }) => {
  const userContx = useContext(UserContext);
  const navigate = useNavigate();
  const [quantityCommentsPublication, setQuantityCommentsPublication] =useState(null);
  const [showComments, setShowComments] = useState(false);
  const [loadComments, setLoadComments] = useState(false);
  const [publicationComments, setPublicationComments] = useState([]);
  const { data: commentsData } = useGetBackendQueries(`viewPublicationComments/${pub._id}`);

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

  const deleteMyPublication = (pub) => {
    axios
      .delete(`https://app-citizens.onrender.com/deleteMyPublication/${pub._id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setQuantityCommentsPublication(commentsData.length);
  }, [commentsData]);

  const goToPublicationDetail = (pub) => {
    navigate(`/publication/${pub._id}`);
  };

  return (
    <div>
      <div className="card max-w-fit-contain bg-base-100 shadow-2xl shadow-side-left mt-6 ">
        <div className="card-body">
          <div className="flex justify-end">
            <div className="dropdown ">
              <label tabIndex={0} className="btn m-1 font-bold text-xl">
                ...
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content text-blue-950 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className=" text-blue-950 hover:text-yellow-400">Edit</a>
                </li>
                <li>
                  <a
                    className=" text-blue-950 hover:text-yellow-400"
                    onClick={() => deleteMyPublication(pub)}
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center xxs:flex-row  mt-2 ">
            <div className="avatar">
              <div className="h-full w-12 xxs:w-8 rounded-full">
                <img src={pub.creatorProfileImage} />
              </div>
            </div>

            <div className="">
              <p className="text-black text-sm ml-2"> {pub.creatorName}</p>
            </div>

            <div className="flex flex-grow justify-end invisible xxs:visible">
              <Link to={`/publicationsSearched/${pub.typeOfPublication}`}>
                <p className=" ml-8 whitespace-no-wrap text-sm  h-6  cursor-pointer hover:font-bold w-[70px]">
                  {pub.typeOfPublication}
                </p>
              </Link>
            </div>
          </div>

          <div className=" ml-4">
            <p className="font-bold text-sm color-black">
              {pub.publicationTitle}
            </p>
            <p className="justify-center  text-xs mr-4">
              {pub.publicationDescription}
            </p>

            <div className="mt-2 ">
              <p className=" text-xs mr-4">{pub.address}</p>
              <p className=" text-xs mr-4 underline cursor-pointer">
                Ver en Mapa
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="avatar">
              <div className="w-24 md:w-32 xl:w-40  h-full  rounded">
                <img src={pub.publicationImages[0]} />
              </div>
            </div>

            <div className="avatar">
              <div className="w-24 md:w-32 xl:w-40  h-full  rounded ml-4">
                <img src={pub.publicationImages[1]} />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex">
              <button
                className="btn"
                onClick={() => getPublicationComments(pub._id)}
              >
                {quantityCommentsPublication}{" "}
                <MarkUnreadChatAltIcon titleAccess="View Comments" />
              </button>
            </div>
            <button className="btn">
              1 <ShareIcon />
            </button>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="whitespace-no-wrap text-xs ">
                Was your claim resolved?
              </p>
            </div>

            <div className="justify-end">
              <p className="font-bold text-xs underline cursor-pointer">
                Shared the news
              </p>
            </div>
          </div>

          {loadComments ? (
            <div>
              <LoadingPublications text={"comments"} />
            </div>
          ) : showComments ? (
            <div>
              <CommentsPublications
                comments={publicationComments}
                close={() => setShowComments(false)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MyPublicationsCard;
