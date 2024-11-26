import React, { useState } from "react";
import Container from "../../component/Shared/Container";
import Header from "./Header";
import RoomInfo from "./RoomInfo";

import RoomReservation from "./RoomReservation";
import { useLoaderData } from "react-router-dom";
import ScrollingImages from "../../component/RoomDetails/ScrollingImages";
import ReviewRoom from "../../component/RoomDetails/ReviewRoom";

const RoomDetails = () => {
  const roomData = useLoaderData();
  // console.log(roomData);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto pt-20 ">
        <div className="flex flex-col gap-6">
          <Header roomData={roomData} key={roomData._id} />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <RoomInfo roomData={roomData} key={roomData._id} />
            <div className="mb-10 md:col-span-3 order-first md:order-last">
              <RoomReservation roomData={roomData} key={roomData._id} />
            </div>
          </div>

          <div className="flex pb-2">
            <div className="h-96 w-[50%]">
              <h1 className="text-green-700 pb-2 text-xl">
                Where you will seleep ?
              </h1>

              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-805998357849925208/original/691c168c-eaec-4140-bdc5-45aed6d236d6.jpeg?im_w=720&im_format=avif"
                alt=""
                className="h-72 rounded-lg shadow-lg border-2 border-slate-400"
              />
            </div>
            <div className="w-[50%] h-72 grid grid-cols-2 gap-2 pb-4">
              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-11564181/original/c8368a2d-9b43-43bb-b656-8ac46ee7641c.jpeg?im_w=1200&im_format=avif"
                alt=""
                className="h-[100%] rounded-lg shadow-lg border-2 border-slate-400"
              />
              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-11564181/original/3072d61c-8cbf-4847-8621-ba687ee70fe5.jpeg?im_w=1200&im_format=avif"
                alt=""
                className="h-[100%] rounded-lg shadow-lg border-2 border-slate-400"
              />
              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-11564181/original/d474035f-81cc-41f8-99dd-e1ff630d5d56.jpeg?im_w=1200&im_format=avif"
                alt=""
                className="h-[100%] rounded-lg shadow-lg border-2 border-slate-400"
              />
              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-11564181/original/aa8d6253-266e-4fb4-a6f2-2a7e3dc420ec.jpeg?im_w=1200&im_format=avif"
                alt=""
                className="h-[100%] rounded-lg shadow-lg border-2 border-slate-400"
              />
            </div>
          </div>

          <div className="py-5">
            <h1 className="pb-3 text-green-700 text-xl font-mono">
              Discover even more to explore at this amazing destination!
            </h1>
            <ScrollingImages roomData={roomData} />
          </div>

          <ReviewRoom />
        </div>
      </div>
    </Container>
  );
};

export default RoomDetails;
