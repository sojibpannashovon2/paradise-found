
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Loader from '../Shared/Loader';
import { useSearchParams } from 'react-router-dom';
import Heading from '../Heading/Heading';
import { getAllRooms } from '../../Api/rooms';

const Rooms = () => {
      const [rooms, setRooms] = useState([]);
      const [loading, setLoading] = useState(false);
      const [params, setParams] = useSearchParams();
      const category = params.get("category");
      // console.log(category);
      useEffect(() => {
            setLoading(true)
            // fetch('rooms.json')
            //       .then(res => res.json())
            getAllRooms()
                  .then(data => {
                        if (category) {
                              const filtered = data?.filter(room => room?.category == category)
                              setRooms(filtered)
                              setLoading(false)
                        }
                        else {

                              setRooms(data)
                              setLoading(false)
                        }
                  }
                  )
                  .catch(err => console.log(err))
      }, [category])

      if (loading) {
            return <Loader />
      }

      return (<>

            {rooms && rooms.length > 0 ? <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
                  {rooms?.map((room, index) => <Card room={room} key={index} />)}
            </div> : <div className='pt-12'>
                  <Heading
                        title={`No rooms available on this category`}
                        subtitle={`Please select other category`}
                        center={true}
                  />
            </div>}

      </>


      );
};

export default Rooms;