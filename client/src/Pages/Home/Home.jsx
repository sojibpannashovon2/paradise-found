import React from 'react';

import Container from '../../component/Shared/Container';
import Catagories from '../../component/Catagories/Catagories';
import Rooms from '../../component/Rooms/Rooms';

const Home = () => {
      return (
            <div className=' pt-20'>
                  <Container>
                        <Catagories />
                        <Rooms />
                  </Container>

            </div>
      );
};

export default Home;