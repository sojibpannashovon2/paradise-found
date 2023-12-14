import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import { getHostsRooms } from "../../Api/rooms"
import RoomDataRow from "../../component/Dashboard/RoomDataRow"
import EmptyState from "../../component/Shared/EmptyState"
import Loader from "../../component/Shared/Loader"

const MyListings = () => {
  const { user } = useContext(AuthContext)
  const [hostRoomData, setHostRoomData] = useState([])
  const [loading, setLoading] = useState(false);
  const fetchHostRooms = () => {
    setLoading(true)
    getHostsRooms(user?.email)
      .then(data => {
        // console.log(data);
        setHostRoomData(data)
        setLoading(false)
      }).catch(err => {
        console.log(err.message)
      })
  }
  useEffect(() => {
    fetchHostRooms()
  }, [user])

  if (loading) {
    return <Loader />
 }
  return (
    <>{hostRoomData && Array.isArray(hostRoomData) && hostRoomData.length > 0 ?
      <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Title
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Location
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Price
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    From
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    To
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Delete
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>{hostRoomData?.map(room =>
                <RoomDataRow
                  key={room?._id}
                  room={room}
                  fetchHostRooms={fetchHostRooms}
                />)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
: <EmptyState
        message={`You Didn't Add A Room Yet !!`}
        address={`/dashboard/add-room`}
        label={`Add Your Room`}
    
    />}</>
  )
}

export default MyListings