import React from "react";
import WallFilters from "../components/WallFilters";
import New from "../components/New";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import PublicationsCard from "../components/Cards/PublicationsCard";
import LoadingPublications from "../Hooks/LoadingPublications";
import useGetBackendQueries from "../Hooks/useGetBackendQueries";
import FiltersModal from "../components/Modals/FiltersModal";
import { useContext } from "react";
import { UserContext } from "../store/usercontext";
import ResolvedComplainsWall from "../components/Wall/ResolvedComplainsWall";
import Footer from "../components/Footer";
import Paginacion from "../components/Paginacion";
import LeaveYourOpinionWall from "../components/Wall/LeaveYourOpinionWall";
import OpinionsAndResolveMobile from "../components/Wall/OpinionsAndResolveMobile";

const Wall = () => {
  const [load, setLoad] = useState(true);
  const [firstFivePublications, setFirstFivePublications] = useState(true);
  const [secondFivePublications, setSecondFivePublications] = useState(false);
  const { data, loading } = useGetBackendQueries(`getOtherUsersPublications`);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);

  const showFirstFivePublications = () => {
    setSecondFivePublications(false);
    setFirstFivePublications(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para un desplazamiento suave
    });
  };

  const showSecondFivePublications = () => {
    setSecondFivePublications(true);
    setFirstFivePublications(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para un desplazamiento suave
    });
  };

  const firstFive = data.slice(0, 5);
  const secondFive = data.slice(5, 10);

  return (
    <div>
      <div className="flex flex-col justify-center mb-2">
        {load ? (
          <LoadingPublications text={"Publications"} />
        ) : (
          <div className="flex flex-wrap gap-4 items-center place-content-around">
            <div className="flex flex-col fixed 2xl:left-72 xl:left-20 lg:left-6 invisible lg:visible ">
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
                  <div className="mb-6">
                    <Paginacion
                      showFirst={showFirstFivePublications}
                      showSecond={showSecondFivePublications}
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
  );
};

export default Wall;
