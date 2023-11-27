import React, { useState } from 'react';
import Container from '../../component/Shared/Container';
import Header from './Header';
import RoomInfo from './RoomInfo';

import RoomReservation from './RoomReservation';
import { useLoaderData } from 'react-router-dom';

const RoomDetails = () => {
      const roomData = useLoaderData();
      console.log(roomData);
      return (
            <Container>

                  <div className='max-w-screen-lg mx-auto pt-20 '>
                        <div className='flex flex-col gap-6'>
                              <Header roomData={roomData} key={roomData._id} />
                              <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>

                                    <RoomInfo roomData={roomData} key={roomData._id} />
                                    <div className='mb-10 md:col-span-3 order-first md:order-last'>
                                          <RoomReservation roomData={roomData} key={roomData._id} />
                                    </div>



                              </div>
                        </div>
                  </div>
            </Container>
      );
};

export default RoomDetails;