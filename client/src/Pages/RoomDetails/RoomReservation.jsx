import React from 'react';
import DatePicker from './DatePicker';
import Button from '../../component/Button/Button';

const RoomReservation = () => {
      return (
            <div className='bg-white border-[1px] border-neutral-300 overflow-hidden rounded-md w-full'>
                  <div className='flex flex-row items-center gap-1 p-4'>
                        <div className='text-2xl font-semibold'>$400</div>
                        <div className='font-light text-neutral-600'>night</div>
                  </div>
                  <hr />
                  <DatePicker></DatePicker>
                  <hr />
                  <div className='p-4'><Button label={`Reserve`}></Button></div>
                  <hr />
                  <div className='flex flex-row items-center justify-between p-4 font-bold text-lg'>
                        <div>Total</div>
                        <div>$600</div>

                  </div>
            </div>
      );
};

export default RoomReservation;