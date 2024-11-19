import React from 'react';

import Container from '../../component/Shared/Container';
import Catagories from '../../component/Catagories/Catagories';
import Rooms from '../../component/Rooms/Rooms';

import home from '../../assets/home/Screenshot 2024-10-16 141803.png'
import Carousel from '../../component/Carosoul/Carousel';


const Home = () => {
      return (
            <div className=' pt-20'>
                  <Container>
                        <Carousel/>
                        <Catagories />
                        <Rooms />

                  </Container>

            </div>
      );
};

export default Home;