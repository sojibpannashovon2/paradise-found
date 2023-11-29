
import DatePicker from './DatePicker';
import Button from '../../component/Button/Button';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import BookingModal from '../../component/Modal/BookingModal';
import { useState } from 'react';
import { formatDistance } from 'date-fns'
const RoomReservation = ({ roomData }) => {

      const { user, role, setRole } = useContext(AuthContext);
      const [isOpen, setIsOpen] = useState(false);
      const totalPrice = parseFloat(
            formatDistance(
                  new Date(roomData.to),
                  new Date(roomData.from)
            ).split(' ')[0]
      ) * roomData.price;
      console.log(totalPrice);

      const [bookingInfo, setBookingInfo] = useState({
            guest: { name: user?.displayName, email: user?.email, image: user?.photoURL },
            host: roomData?.host.email,
            loacation: roomData?.location,
            price: totalPrice,

      })

      return (
            <div className='bg-white border-[1px] border-neutral-300 overflow-hidden rounded-md w-full'>
                  <div className='flex flex-row items-center gap-1 p-4'>
                        <div className='text-2xl font-semibold'>${roomData?.price}</div>
                        <div className='font-light text-neutral-600'>night</div>
                  </div>
                  <hr />
                  <div className='flex justify-center'>
                        <div>
                              <DatePicker></DatePicker>
                        </div>

                  </div>

                  <hr />
                  <div className='p-4'>
                        <Button
                              onClick={() => setIsOpen(true)}
                              disabled={roomData.host.email === user.email}
                              label={`Reserve`}>
                        </Button></div>
                  <hr />
                  <div className='flex flex-row items-center justify-between p-4 font-bold text-lg'>
                        <div>Total</div>
                        <div>${totalPrice}</div>

                  </div>
                  <BookingModal isOpen={isOpen} />
            </div>
      );
};

export default RoomReservation;