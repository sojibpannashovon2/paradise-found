import React from "react";
import { GiWheat } from "react-icons/gi";
import person1 from "../../assets/review/oli.jpg";
import person2 from "../../assets/review/al-mahamud.jpg";
import person3 from "../../assets/review/noman.jpg";
import person4 from "../../assets/review/sagor.jpg";
import person5 from "../../assets/review/IMG_7219.JPG";
import person6 from "../../assets/review/IMG_7486.JPG";
import { FaStar } from "react-icons/fa";

const ReviewRoom = ({ roomData }) => {
  return (
    <>
      <div className="text-center mx-auto">
        <div className="flex font-bold items-center gap-16 ml-14">
          <GiWheat className="text-8xl" />
          <h3 className="text-8xl">{roomData?.ratting || "4.9"} </h3>
          <GiWheat className="text-8xl " />
        </div>
        <div className="text-center mx-auto pt-5 font-sans">
          <h3 className="text-2xl font-semibold">Guest favorite</h3>
          <p className="w-[70%] mx-auto">
            One of the most loved homes on Airbnb based on ratings, reviews, and
            reliability
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:lg:md:grid-cols-2 gap-6 pt-6">
        <div className="border border-slate-500 bottom-2 p-6 rounded-xl shadow-sm shadow-slate-300">
          <div className="flex items-center  gap-2">
            <div>
              <img
                className="h-16 w-16 rounded-full border-2 border-green-700 "
                src={person1}
                alt=""
              />
            </div>
            <div>
              <h3>Md. Olliul</h3>
              <p>3 year on Paradise Found</p>
            </div>
          </div>
          <div className="flex text-center items-center gap-3 pt-4">
            <div className="flex ">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div>
              <span>3 week ago</span>
            </div>
          </div>
          <p className="pt-4">
            It was a lovely stay with Sid felt right at home at peace. Little
            walk down to the place but worth it. The rooms are clean, sit out
            with the view is amazing. Sid n his wife takes pride in
          </p>
        </div>
        <div className="border border-slate-500 bottom-2 p-6 rounded-xl shadow-sm shadow-slate-300">
          <div className="flex items-center  gap-2">
            <div>
              <img
                className="h-16 w-16 rounded-full border-2 border-green-700 "
                src={person2}
                alt=""
              />
            </div>
            <div>
              <h3>Md. Al Mahmmud</h3>
              <p>2 year on Paradise Found</p>
            </div>
          </div>
          <div className="flex text-center items-center gap-3 pt-4">
            <div className="flex ">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div>
              <span>2 week ago</span>
            </div>
          </div>
          <p className="pt-4">
            This is the best place to plan your vacation. It is so peaceful and
            close to nature that you will want to stay here forever.
          </p>
        </div>
        <div className="border border-slate-500 bottom-2 p-6 rounded-xl shadow-sm shadow-slate-300">
          <div className="flex items-center  gap-2">
            <div>
              <img
                className="h-16 w-16 rounded-full border-2 border-green-700 "
                src={person3}
                alt=""
              />
            </div>
            <div>
              <h3>Noham Ahmed</h3>
              <p>4 year on Paradise Found</p>
            </div>
          </div>
          <div className="flex text-center items-center gap-3 pt-4">
            <div className="flex ">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div>
              <span>4 week ago</span>
            </div>
          </div>
          <p className="pt-4">
            It was great ! If someone wants to spend relax time I think this
            place was good and peaceful…
          </p>
        </div>
        <div className="border border-slate-500 bottom-2 p-6 rounded-xl shadow-sm shadow-slate-300">
          <div className="flex items-center  gap-2">
            <div>
              <img
                className="h-16 w-16 rounded-full border-2 border-green-700 "
                src={person4}
                alt=""
              />
            </div>
            <div>
              <h3>Sagor Bissas</h3>
              <p>5 year on Paradise Found</p>
            </div>
          </div>
          <div className="flex text-center items-center gap-3 pt-4">
            <div className="flex ">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div>
              <span>5 week ago</span>
            </div>
          </div>
          <p className="pt-4">
            Place was clean. An AC didn’t work but it got fixed quickly. The
            caretakers will come and fix any other problems quickly. Mosquito
            nets were provided as there were lots of
          </p>
        </div>
        <div className="border border-slate-500 bottom-2 p-6 rounded-xl shadow-sm shadow-slate-300">
          <div className="flex items-center  gap-2">
            <div>
              <img
                className="h-16 w-16 rounded-full border-2 border-green-700 "
                src={person1}
                alt=""
              />
            </div>
            <div>
              <h3>Md. Olliul</h3>
              <p>3 year on Paradise Found</p>
            </div>
          </div>
          <div className="flex text-center items-center gap-3 pt-4">
            <div className="flex ">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div>
              <span>3 week ago</span>
            </div>
          </div>
          <p className="pt-4">
            It was a lovely stay with Sid felt right at home at peace. Little
            walk down to the place but worth it. The rooms are clean, sit out
            with the view is amazing. Sid n his wife takes pride in
          </p>
        </div>
        <div className="border border-slate-500 bottom-2 p-6 rounded-xl shadow-sm shadow-slate-300">
          <div className="flex items-center  gap-2">
            <div>
              <img
                className="h-16 w-16 rounded-full border-2 border-green-700 "
                src={person1}
                alt=""
              />
            </div>
            <div>
              <h3>Md. Olliul</h3>
              <p>3 year on Paradise Found</p>
            </div>
          </div>
          <div className="flex text-center items-center gap-3 pt-4">
            <div className="flex ">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div>
              <span>3 week ago</span>
            </div>
          </div>
          <p className="pt-4">
            It was a lovely stay with Sid felt right at home at peace. Little
            walk down to the place but worth it. The rooms are clean, sit out
            with the view is amazing. Sid n his wife takes pride in
          </p>
        </div>
      </div>
    </>
  );
};

export default ReviewRoom;
