import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../store/usercontext";
import MyPublicationsCard from "../components/Cards/MyPublicationsCard";
import { Link } from "react-router-dom";
import New from "../components/New";
import puzzle from "../img/puzzle.png";
import fon from "../img/imageFon.png";
import useGetBackendQueries from "../Hooks/useGetBackendQueries";
import LoadingPublications from "../Hooks/LoadingPublications";
import SharedPublicationsCard from "../components/Cards/SharedPublicationsCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ResolvedComplainsWall from "../components/Wall/ResolvedComplainsWall";
import OpinionsAndResolveMobile from "../components/Wall/OpinionsAndResolveMobile";

const MyPublications = () => {
  const userContx = useContext(UserContext);

  const [allMyPubs, setAllMyPubs] = useState([]);
  const [publicationsComments, setPublicationsComments] = useState([]);
  const {
    data: myData,
    loading: myLoading,
    noPublications: myNoPublications,
  } = useGetBackendQueries(`getMyPublications/${userContx.userId}`);
  const {
    data: otherData,
    loading: otherLoading,
    noPublications: otherNoPublications,
  } = useGetBackendQueries(`getMySharedPublications/${userContx.userId}`);

  useEffect(() => {
        axios.get(`https://app-citizens.onrender.com/getPublicationComments/${userContx.userId}`)
            .then((res) => {
                console.log(res.data);
                setPublicationsComments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }, []);

  useEffect(() => {
    console.log(otherData);
  }, [otherData]);

  return (
    <div className="">
      {myNoPublications ? (
        <>
          <div>
            <b>{userContx.userName}</b>
            <br />
            <small>At the moment you dont have Publications</small>
          </div>
        </>
      ) : myLoading ? (
        <LoadingPublications text={"Publications"} />
      ) : (
        <div className="flex"> 
            <div className=" max-w-fit-contain lg:w-96 xl:w-[500px]">
                <div className="mt-24 xxs:mt-20 flex flex-col items-center justify-center">
                    <span className="text-md">
                    <b>{userContx.userName}' Publications</b>
                    </span>  
                </div>

                <div className="flex flex-col items-center justify-center visible lg:hidden  mt-12">
                    <OpinionsAndResolveMobile />
              </div>

                <div className="">
                    {myData.map((p) => (
                    <MyPublicationsCard pub={p} comments={publicationsComments} />
                    ))}
                </div>

                {otherData.length !== 0 ? (
                    <div className="flex flex-col justify-center items-center mt-24 ">
                        <div className="flex flex-col items-center justify-center">
                            <h4 className="font-bold text-xxs">Shared Publications</h4>
                            <KeyboardArrowDownIcon />
                        </div>

                        <div className="mt-4">
                            {otherData.map((p) => (
                            <SharedPublicationsCard pub={p} />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div> 

            <div className=" flex flex-col items-center mt-28 fixed 2xl:right-40 xl:right-12 lg:right-5 border invisible lg:visible">
               <ResolvedComplainsWall/>
            </div>
        </div>
      )}
    </div>
  );
};

export default MyPublications;
