import { format } from 'date-fns'
import { useState } from 'react'
import DeleteModal from '../Modal/DeleteModal'
import { deleteBookings, updateStatus } from '../../Api/booking'
import { toast } from "react-hot-toast"
const TableRow = ({ booking, fetchBookings }) => {
      const [isOpen, setIsOpen] = useState(false)

      const modalHandler = () => {
            deleteBookings(booking._id)
                  .then(data => {
                        console.log(data);
                        updateStatus(booking.roomId, false)
                              .then(data => {
                                    console.log(data);
                                    fetchBookings();
                                    toast.success(`Succesfully Delete the booking room !!`)

                              }).catch(err => {
                                    console.log(err.message);
                              })

                        closeModal()
                  }).catch(err => {
                        console.log(err.message);
                  })
      }
      const closeModal = () => {
            setIsOpen(false)
      }
      return (
            <>

                  <tr>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <div className='flex items-center'>
                                    <div className='flex-shrink-0'>
                                          <div className='block relative'>
                                                <img
                                                      alt='profile'
                                                      src={booking?.image}
                                                      className='mx-auto object-cover rounded h-10 w-15 '
                                                />
                                          </div>
                                    </div>
                                    <div className='ml-3'>
                                          <p className='text-gray-900 whitespace-no-wrap'>{booking?.title}</p>
                                    </div>
                              </div>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <p className='text-gray-900 whitespace-no-wrap'>{booking?.location}</p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <p className='text-gray-900 whitespace-no-wrap'>${booking?.price}</p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <p className='text-gray-900 whitespace-no-wrap'>
                                    {format(new Date(booking?.from), 'P')}
                              </p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <p className='text-gray-900 whitespace-no-wrap'>
                                    {format(new Date(booking?.to), 'P')}
                              </p>
                        </td>
                        <td className='px-5  py-5 border-b border-gray-200 bg-white text-sm'>
                              <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-black leading-tight hover:bg-red-500 hover:rounded-md '>
                                    <span
                                          aria-hidden='true'
                                          className='absolute inset-0 bg-blue-400 opacity-50 rounded-md border-[1px] border-slate-900  '
                                    ></span>
                                    <span className='relative'>Cancel</span>
                              </button>
                        </td>
                        <DeleteModal isOpen={isOpen} modalHandler={modalHandler} closeModal={closeModal} />
                  </tr>
            </>

      )
}

export default TableRow