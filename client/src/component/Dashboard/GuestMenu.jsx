import { NavLink, useNavigate } from 'react-router-dom'
import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import { useContext, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import { becomeHost } from '../../Api/auth'
import toast from 'react-hot-toast'
import HostModal from '../Modal/HostRequestModal'


const GuestMenu = () => {
      const { user, role, setRole } = useContext(AuthContext)
      const [isOpen, setIsOpen] = useState(false)
      const navigate = useNavigate();
      const closeModal = () => {
            setIsOpen(false)
      }
      const modalHandler = () => {
            becomeHost(user?.email)
                  .then(data => {
                        console.log(data)
                        toast.success(`You Are Admin Now !!, You can post Now`)
                        setRole(`host`)
                        navigate(`/dashboard/add-room`)
                        closeModal();
                        
                  }).catch(err => {
                  console.log(err.messase)
            })
      }
      return (
            <>
                  <NavLink
                        to='my-bookings'
                        className={({ isActive }) =>
                              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                              }`
                        }
                  >
                        <BsFingerprint className='w-5 h-5' />

                        <span className='mx-4 font-medium'>My Bookings</span>
                  </NavLink>
                  {!role ? <div className='flex items-center px-4 py-1 mt-2  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
                        <GrUserAdmin className='w-5 h-5' />

                        <span onClick={()=>setIsOpen(true)} className='mx-4 font-medium'>Become A Host</span>
                        <HostModal
                              isOpen={isOpen}
                              modalHandler={modalHandler}
                              closeModal={closeModal}
                              email={user?.email}
                        />
                  </div> : <></>}

            </>
      )
}

export default GuestMenu