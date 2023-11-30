
import DatePicker from './DatePicker';
import Button from '../../component/Button/Button';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import BookingModal from '../../component/Modal/BookingModal';
import { useState } from 'react';
import { formatDistance } from 'date-fns'
import { addBooking, updateStatus } from '../../Api/booking';
import toast from 'react-hot-toast';
const RoomReservation = ({ roomData }) => {

      const { user, role, setRole } = useContext(AuthContext);
      const [isOpen, setIsOpen] = useState(false);
      const totalPrice = parseFloat(
            formatDistance(
                  new Date(roomData.to),
                  new Date(roomData.from)
            ).split(' ')[0]
      ) * roomData.price;


      const [value, setValue] = useState({
            startDate: new Date(roomData?.from),
            endDate: new Date(roomData?.from),
            key: 'selection'
      })

      const [bookingInfo, setBookingInfo] = useState({
            guest: { name: user?.displayName, email: user?.email, image: user?.photoURL },
            host: roomData?.host.email,
            location: roomData?.location,
            price: totalPrice,
            to: value.endDate,
            from: value.startDate,
            // guest: roomData?.total_guest,
            title: roomData.title,
            roomId: roomData._id,
            image: roomData.image,

      })

      const handleSelect = ranges => {
            setValue({ ...value })
      }

      const closeModal = () => {
            setIsOpen(false)
      }

      const modalHandler = () => {
            addBooking(bookingInfo)
                  .then(data => {
                        console.log(data);
                        updateStatus(roomData._id, true)
                              .then(data => {
                                    console.log(data);
                                    toast.success("Booked Successfully")
                                    closeModal()
                              })
                              .catch(err => {
                                    console.log(err.message);
                              })

                  }).catch(err => {
                        console.log(err.message);
                  })

            console.log(bookingInfo);
      }


      return (
            <div className='bg-white border-[1px] border-neutral-300 overflow-hidden rounded-md w-full'>
                  <div className='flex flex-row items-center gap-1 p-4'>
                        <div className='text-2xl font-semibold'>${roomData?.price}</div>
                        <div className='font-light text-neutral-600'>night</div>
                  </div>
                  <hr />
                  <div className='flex justify-center'>
                        <div>
                              <DatePicker handleSelect={handleSelect} value={value}></DatePicker>
                        </div>

                  </div>

                  <hr />
                  <div className='p-4'>
                        <Button
                              onClick={() => setIsOpen(true)}
                              disabled={roomData.host.email === user.email || roomData._id == bookingInfo.roomId || roomData.booked}
                              label={`Reserve`}>
                        </Button></div>
                  <hr />
                  <div className='flex flex-row items-center justify-between p-4 font-bold text-lg'>
                        <div>Total</div>
                        <div>${totalPrice}</div>

                  </div>
                  <BookingModal
                        modalHandler={modalHandler}
                        closeModal={closeModal}
                        bookingInfo={bookingInfo}
                        isOpen={isOpen} />
            </div>
      );
};

export default RoomReservation;