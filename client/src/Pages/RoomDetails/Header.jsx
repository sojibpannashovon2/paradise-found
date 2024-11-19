import React from "react";
import Heading from "../../component/Heading/Heading";

const Header = ({ roomData }) => {
  return (
    <>
      <Heading title={roomData?.title} subtitle={roomData?.location} />

      <div className="w-full md:h-[60vh]  rounded-xl">
        <img
          className="object-cover w-[100%] md:h-[60vh] rounded-xl"
          src={roomData?.image}
          alt="Not Found"
        />
      </div>
    </>
  );
};

export default Header;
