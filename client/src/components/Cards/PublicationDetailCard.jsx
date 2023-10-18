import React from "react";
import { useState, useEffect } from "react";
import { UserContext } from "../../store/usercontext";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ImagesModalDetail from "../Modals/ImagesModalDetail";

const PublicationDetailCard = ({ pub }) => {
  return (
    <div className="mb-4">
      <div className="card rounded-xs 2xl:w-[500px] xl:w-[480px] lg:w-[480px] md:max-w-fit-contain bg-base-100  mt-4">
        <div className="card-body grid grid-cols-2" key={pub._id}>
        <div className="grid col-span-2">
            <div className="flex flex-col items-center xxs:flex-row  mt-2 ">
              <div className="avatar">
                <div className="h-full w-16 sm:w-16 xl:w-22 rounded-full">
                  <img src={pub.creatorProfileImage} />
                </div>
              </div>

              <div className="mt-2 xxs:mt-0">
                <p className="text-black text-sm ml-2 font-bold">
                  {" "}
                  {pub.creatorName}
                </p>
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

          <div className="grid col-span-2 max-w-fit-contain mt-2 xxs:mt-6">
            <div className="flex flex-col items-center justify-center ml-4">
              <Link to={`/publication/${pub._id}`}>
                {" "}
                <p className="font-bold text-sm  xxs:text-md text-black">
                  {pub.publicationTitle}
                </p>
              </Link>
              <p className="justify-center text-sm mr-4 mt-2">
                {pub.publicationDescription}
              </p>

              <div className="mt-4 whitespace-no-wrap">
                <p className=" text-xs mr-4  whitespace-no-wrap">
                  {pub.creatorLocation}, {pub.address}
                </p>
              </div>
            </div>
          </div>

          <div className="grid col-span-2">
            <div className="flex justify-center items-center mt-2 max-w-fit-contain mr-12 xxxs:mr-0">
              <div className="avatar flex justify-center items-center">
                <div className="w-16 xxs:w-24 sm:w-32 h-full border rounded">
                  <img src={pub.publicationImages[0]} />
                </div>
              </div>

              <div className="avatar flex justify-center items-center">
                <div className="w-16 xxs:w-24 sm:w-32 border rounded ml-4">
                  <img src={pub.publicationImages[1]} />
                </div>
              </div>
            </div>
            <div className="mt-2 text-gray-500 underline cursor-pointer">
              <ImagesModalDetail
                firstImage={pub.publicationImages[0]}
                secondImage={pub.publicationImages[1]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetailCard;
