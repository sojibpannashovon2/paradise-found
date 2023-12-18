import { AiOutlineMenu } from 'react-icons/ai'
import { FaHouseUser } from 'react-icons/fa';
import { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import { Link } from 'react-router-dom'
import HostModal from '../../Modal/HostRequestModal';
import { becomeHost } from '../../../Api/auth';
import toast from 'react-hot-toast';
const MenuDropdown = () => {
      const { user, logOut, role, setRole } = useContext(AuthContext);
      // console.log(role);
      const [isOpen, setIsOpen] = useState(false)
      const [modal, setModal] = useState(false)
      const toggleOpen = useCallback(() => {
            setIsOpen(value => !value)
      }, [])

      const modalHandler = (email) => {
            becomeHost(email)
                  .then(data => {

                        console.log(data);
                        toast.success(`Now you are a Host, post a room`)
                        setRole(`host`)
                        closeModal();
                  }).catch(err => {
                        console.log(err.message);
                  })

      }

      const closeModal = () => {
            setModal(false)
      }
      return (
            <div className='relative'>
                  <div className='flex flex-row items-center gap-3'>
                        <div className='hidden md:block text-sm font-semibold py-2 px-4 rounded-full transition '>

                              {!role &&
                                    <button
                                          className='cursor-pointer hover:px-1 hover:border-[1px] hover:bg-blue-300 hover:rounded-md'
                                          disabled={!user}
                                          onClick={() => setModal(true)}>
                                          Paradise Found Your Home
                                    </button>
                              }


                        </div>
                        <div
                              onClick={toggleOpen}
                              className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                        >
                              <AiOutlineMenu />
                              <div className='hidden md:block'>
                                    {user && user.photoURL ? <img className='w-6 h-6 rounded-lg' src={user.photoURL} alt="" /> : <FaHouseUser className='text-xl' />}
                              </div>
                        </div>
                  </div>
                  {isOpen && (
                        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[100%] bg-white overflow-hidden right-0 top-12 text-sm'>
                              <div className='flex flex-col cursor-pointer'>
                                    <Link
                                          to='/'
                                          className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                    >
                                          Home
                                    </Link>
                                    {user ? (
                                          <>
                                                <Link
                                                      to='/dashboard'
                                                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                                >
                                                      Dashboard
                                                </Link>
                                                <div
                                                      onClick={() => {
                                                            setRole(null)
                                                            logOut()
                                                      }}
                                                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                                >
                                                      Logout
                                                </div>
                                          </>
                                    ) : (
                                          <>
                                                <Link
                                                      to='/login'
                                                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                                >
                                                      Login
                                                </Link>
                                                <Link
                                                      to='/signup'
                                                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                                >
                                                      Sign Up
                                                </Link>
                                          </>
                                    )}
                              </div>
                        </div>
                  )}
                  <HostModal
                        closeModal={closeModal}
                        email={user?.email}
                        modalHandler={modalHandler}
                        isOpen={modal} />
            </div>
      )
}

export default MenuDropdown