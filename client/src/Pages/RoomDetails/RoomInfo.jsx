const RoomInfo = ({ roomData }) => {

      return (
            <div className='col-span-4 flex flex-col gap-8'>
                  <div className='flex flex-col gap-2'>
                        <div
                              className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
                        >
                              <div>Hosted by {roomData?.host?.name}</div>

                              <img
                                    className='rounded-full'
                                    height='30'
                                    width='30'
                                    alt='Avatar'
                                    // src='https://a0.muscache.com/im/pictures/user/bb9ba580-9b3b-4402-ac92-3976abe1a178.jpg'
                                    src={roomData?.host?.image}
                              />
                        </div>
                        <div
                              className='
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              '
                        >
                              <div>{roomData?.total_guest} total guest</div>
                              <div>{roomData?.bedrooms} bedrooms</div>
                              <div>{roomData?.bathrooms} bathrooms</div>
                        </div>
                  </div>

                  <hr />
                  <div
                        className='
          text-lg font-light text-neutral-500'
                  >
                        {roomData?.description}
                  </div>
                  <hr />
            </div>
      )
}

export default RoomInfo