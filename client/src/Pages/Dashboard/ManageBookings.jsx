import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import Loader from "../../component/Shared/Loader"
import { getHostBookings } from "../../Api/booking"
import TableRow from "../../component/Dashboard/TableRow"
import EmptyState from "../../component/Shared/EmptyState"

const ManageBookings = () => {

      const [bookings, setBookings] = useState([])
      const { user } = useContext(AuthContext)
      const [loadingp, setLoadingp] = useState(false);
      const fetchBookings = () => {
            setLoadingp(true)
            getHostBookings(user?.email)
                  .then(data => {
                        // console.log(data);
                        setBookings(data)
                        setLoadingp(false)
                        
                  })
      }

      useEffect(() => {
            fetchBookings()
      }, [user])
      if (loadingp) {
            return <Loader />
         }
      return (
            <>
            {bookings && Array.isArray(bookings) && bookings.length>0?  <div className='container mx-auto px-4 sm:px-8'>
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
                                                            Action
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody>{bookings?.map(booking => <TableRow booking={booking} key={booking._id} fetchBookings={fetchBookings} />)}</tbody>
                                    </table>
                              </div>
                        </div>
                  </div>
                  </div> : <EmptyState
                              message={`Your Rooms Hasn't Booked Yet !!`}
                              address={`/`}
                              label={`Go Back`}
                  />}
            </>
      )
}

export default ManageBookings