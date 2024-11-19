import React, { useContext, useState } from 'react';
import AddRoomForm from '../../component/Forms/AddRoomForm';
import { uploadImage } from '../../Api/utils';
import { AuthContext } from '../../providers/AuthProvider';

import toast from 'react-hot-toast';
import { addRoom } from '../../Api/rooms';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {

      const [loading, setLoading] = useState(false)
      const navigate = useNavigate()
      const [uploadButtonText, setUploadButtonText] = useState(`Upload Image`)

      const [dates, setDates] = useState({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
      })

      const handleDates = ranges => {

            setDates(ranges.selection)
      }

      const { user } = useContext(AuthContext);
      const handleSubmit = (event) => {
            event.preventDefault();
            setLoading(true)
            const location = event.target.location.value
            const title = event.target.title.value

            const from = dates.startDate
            const to = dates.endDate

            const price = event.target.price.value
            const total_guest = event.target.total_guest.value

            const bedrooms = event.target.bedrooms.value
            const bathrooms = event.target.bathrooms.value

            const description = event.target.description.value
            const category = event.target.category.value

            const image = event.target.image.files[0]
            setUploadButtonText(`Uploadding.....`)
            uploadImage(image)
                  .then(data => {
                        // console.log(data.data.display_url)
                        const roomData = {
                              image: data.data.display_url,
                              host: {
                                    name: user?.displayName,
                                    image: user?.photoURL,
                                    email: user?.email,
                              },
                              location,
                              from,
                              to,
                              title,
                              price,
                              total_guest,
                              bathrooms,
                              bedrooms,
                              description,
                              category,

                        }
                        console.log(roomData);
                        //save room to dataBase
                        addRoom(roomData)
                              .then(data => {
                                    console.log(data)
                                    setUploadButtonText(`Uploaded`)
                                    setLoading(false);
                                    toast.success(`Room data is added successfully !!!`)
                                    navigate(`/dashboard/my-listings`)
                              })
                              .catch(err => {
                                    console.log(err.message);
                              })

                  })
                  .catch(err => {
                        console.log(err.message);
                        setLoading(false);
                  })
            // console.log(location);

      }

      const handleImageChange = (image) => {
            setUploadButtonText(image.name)
      }

      return <AddRoomForm
            handleSubmit={handleSubmit}
            loading={loading}
            handleImageChange={handleImageChange}
            uploadButtonText={uploadButtonText}
            dates={dates}
            handleDates={handleDates}
      />
};

export default AddRoom;