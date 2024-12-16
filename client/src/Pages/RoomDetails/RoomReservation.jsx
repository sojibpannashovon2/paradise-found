import { useNavigate } from "react-router-dom";
import DatePicker from "./DatePicker";
import Button from "../../component/Button/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingModal from "../../component/Modal/BookingModal";
import { formatDistance } from "date-fns";
import { addBooking, updateStatus } from "../../Api/booking";
import toast from "react-hot-toast";

const RoomReservation = ({ roomData }) => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [value, setValue] = useState({
    startDate: new Date(roomData?.from),
    endDate: new Date(roomData?.to),
    key: "selection",
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const [bookingInfo, setBookingInfo] = useState({
    guest: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    host: roomData?.host?.email,
    location: roomData?.location,
    price: 0, // Updated dynamically
    to: value.endDate,
    from: value.startDate,
    title: roomData.title,
    roomId: roomData._id,
    image: roomData.image,
  });

  // Recalculate the total price whenever the selected date range changes
  useEffect(() => {
    const days = Math.ceil(
      (value.endDate - value.startDate) / (1000 * 60 * 60 * 24)
    );
    const updatedPrice = days * roomData.price;

    setTotalPrice(updatedPrice);
    setBookingInfo((prev) => ({
      ...prev,
      from: value.startDate,
      to: value.endDate,
      price: updatedPrice,
    }));
  }, [value, roomData.price]);

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setValue({
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: "selection",
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalHandler = () => {
    addBooking(bookingInfo)
      .then(() => {
        updateStatus(roomData._id, true)
          .then(() => {
            toast.success("Booked Successfully");
            closeModal();
            navigate(`/dashboard/my-bookings`);
          })
          .catch((err) => console.error(err.message));
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div className="bg-white border-[1px] border-green-800 overflow-hidden rounded-md w-full">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${roomData?.price}</div>
        <div className="font-light text-black">/ night</div>
      </div>
      <hr />
      <div className="flex justify-center w-[80%] mx-auto">
        <DatePicker handleSelect={handleSelect} value={value} />
      </div>
      <hr className="my-3" />
      <div className="mx-auto w-52">
        <Button
          onClick={() => setIsOpen(true)}
          disabled={roomData?.host.email === user.email || roomData?.booked}
          label={`Reserve`}
        />
      </div>
      <hr className="my-3" />
      <div className="flex flex-row items-center justify-between p-4 font-bold text-lg ">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
      <BookingModal
        modalHandler={modalHandler}
        closeModal={closeModal}
        bookingInfo={bookingInfo}
        isOpen={isOpen}
      />
    </div>
  );
};

export default RoomReservation;
