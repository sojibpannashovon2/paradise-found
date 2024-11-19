import { FaCar, FaIceCream, FaTv, FaWifi } from "react-icons/fa";
import { MdBathtub, MdKitchen, MdLock, MdPark } from "react-icons/md";

const RoomInfo = ({ roomData }) => {
  return (
    <div className="col-span-4 flex flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <div
          className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
        >
          <div className="">What's the room will provide</div>

          {/* <img
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            // src='https://a0.muscache.com/im/pictures/user/bb9ba580-9b3b-4402-ac92-3976abe1a178.jpg'
            src={roomData?.host?.image}
          /> */}
        </div>
        <div
          className="
                flex 
                flex-row 
                items-center 
                gap-4 
                font-semibold
                text-green-900
              "
        >
          <div>{roomData?.total_guest} total guest</div>
          <div>{roomData?.bedrooms} bedrooms</div>
          <div>{roomData?.bathrooms} bathrooms</div>
        </div>
      </div>

      <hr />
      <div
        className="
          text-lg font-light text-black font-serif"
      >
        {roomData?.description}
      </div>
      <hr />

      <div className="font-serif">
        <h1 className="text-xl text-green-900">What this place offers</h1>
        <div>
          <div className="flex gap-32">
            <div>
              <div className="py-2 flex  gap-3 items-center">
                <MdBathtub />
                <p>Bathtub</p>
              </div>

              <div className="py-2 flex  gap-3 items-center">
                <MdPark />
                <p>Park view</p>
              </div>

              <div className="py-2 flex  gap-3 items-center">
                <FaCar />
                <p>Free parking on premises</p>
              </div>
              <div className="py-2 flex  gap-3 items-center">
                <FaTv />
                <p>TV with standard cable</p>
              </div>
            </div>

            <div>
              <div className="py-2 flex  gap-3 items-center">
                <FaIceCream />
                <p>AC-split type ductless system</p>
              </div>
              <div className="py-2 flex  gap-3 items-center">
                {" "}
                <FaWifi />
                <p>Wifi</p>
              </div>

              <div className="py-2 flex  gap-3 items-center">
                {" "}
                <MdKitchen />
                <p>Kitchen</p>
              </div>
              <div className="py-2 flex  gap-3 items-center">
                <MdLock />
                <p>Lock on bedroom door</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
