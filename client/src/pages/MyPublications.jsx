import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../store/usercontext";
import MyPublicationsCard from "../components/Cards/MyPublicationsCard";
import WallFilters from "../components/WallFilters";
import useGetBackendQueries from "../Hooks/useGetBackendQueries";
import LoadingPublications from "../Hooks/LoadingPublications";
import SharedPublicationsCard from "../components/Cards/SharedPublicationsCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ResolvedComplainsWall from "../components/Wall/ResolvedComplainsWall";
import OpinionsAndResolveMobile from "../components/Wall/OpinionsAndResolveMobile";
import LeaveYourOpinionWall from "../components/Wall/LeaveYourOpinionWall"

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
        <LoadingPublications text={"your Publications"} />
      ) : (
        <div className="flex"> 
            <div className=" max-w-fit-contain lg:w-96 xl:w-[500px]">
                <div className="mt-24 xxs:mt-20 flex flex-col items-center justify-center">
                    <span className="text-md">
                    <b>{userContx.userName}' Publications</b>
                    </span>  
                </div>

                <div className="flex flex-col fixed 3xl:left-64 2xl:left-48 xl:left-20 lg:left-6 invisible lg:visible mt-44">
                  <WallFilters />
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
                    <div className="flex flex-col justify-center items-center mt-6 ">
                        <div className="mt-4">
                            {otherData.map((p) => (
                            <SharedPublicationsCard pub={p} />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div> 

            <div className=" flex flex-col items-center mt-28 fixed 3xl:right-52 2xl:right-36 xl:right-12 lg:right-5 invisible lg:visible overflow-y-auto overflow-x-hidden max-h-[500px] 2xl:overflow-hidden 2xl:max-h-[none]">
               <ResolvedComplainsWall/>
                  <div className="mt-6">
                    <LeaveYourOpinionWall style={{ marginTop: "10px" }} />
                  </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default MyPublications;

/*

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
                    <div className="flex flex-col justify-center items-center mt-6 ">
                        <div className="mt-4">
                            {otherData.map((p) => (
                            <SharedPublicationsCard pub={p} />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div> 

            <div className=" flex flex-col items-center mt-28 fixed 2xl:right-36 xl:right-12 lg:right-5 invisible lg:visible">
               <ResolvedComplainsWall/>
                  <div className="mt-6">
                    <LeaveYourOpinionWall style={{ marginTop: "10px" }} />
                  </div>
            </div>
        </div>
      )}
    </div>

*/

/* 

 <div className="">
      <div className="flex flex-col justify-center mb-2">
        {load ? (
          <LoadingPublications text={"Publications"} />
        ) : (
          <div className="flex flex-wrap gap-4 items-center place-content-around">
            <div className="flex flex-col fixed 3xl:left-80 2xl:left-48 xl:left-20 lg:left-6 invisible lg:visible ">
              <WallFilters />
            </div>

            <div>
              <div className="flex flex-col items-center justify-center visible lg:hidden  mt-12">
                <OpinionsAndResolveMobile />
                <FiltersModal />
              </div>

              <div className="mt-6 lg:mt-20 ml-auto flex justify-center">
                <div className=" justify-center items-center h-screen">
                  {firstFivePublications
                    ? firstFive.map((p) => <PublicationsCard pub={p} />)
                    : null}
                  {secondFivePublications
                    ? secondFive.map((p) => <PublicationsCard pub={p} />)
                    : null}
                     {thirdFivePublications
                    ? thirdFive.map((p) => <PublicationsCard pub={p} />)
                    : null}
                  <div className="mb-6">
                    <Paginacion
                      showFirst={showFirstFivePublications}
                      showSecond={showSecondFivePublications}
                      showThird={showThirdFivePublications}
                    />
                  </div>
                </div>

                <div className="fixed flex flex-col 3xl:right-52 2xl:right-44 xl:right-12 lg:right-7 invisible lg:visible overflow-y-auto overflow-x-hidden max-h-[500px] 2xl:overflow-hidden 2xl:max-h-[none]">
                  <ResolvedComplainsWall />
                  <div className="mt-6">
                    <LeaveYourOpinionWall style={{ marginTop: "10px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

*/