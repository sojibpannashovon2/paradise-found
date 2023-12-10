import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'
import Logo from '../Shared/Navbar/Logo'
import { GrLogout } from 'react-icons/gr'
import { FcHome, FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
// import { BsBookFill, BsFillHouseAddFill } from 'react-icons/bs'
import GuestMenu from './GuestMenu'
import HostMenu from './HostMenu'
const Sidebar = () => {
      const navigate = useNavigate()
      const [toggle, setToggle] = useState(false)
      const { user, logOut, role } = useContext(AuthContext)

      const [isActive, setActive] = useState('false')
      const toggleHandler = event => {
            setToggle(event.target.checked)
      }
      // Sidebar Responsive Handler
      const handleToggle = () => {
            setActive(!isActive)
      }
      const handleLogOut = () => {
            logOut()
            navigate('/')
      }
      return (
            <>
                  {/* Small Screen Navbar */}
                  <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden lg:overflow-hidden'>
                        <div>
                              <div className='block cursor-pointer p-2 font-bold border-[1px] border-slate-500'>
                                    <Logo />
                              </div>
                        </div>

                        <button
                              onClick={handleToggle}
                              className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                        >
                              <AiOutlineBars className='h-5 w-5' />
                        </button>
                  </div>
                  {/* Sidebar */}
                  <div
                        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                              }  md:translate-x-0  transition duration-200 ease-in-out`}
                  >
                        <div>
                              {/* Branding & Profile Info */}
                              <div>
                                    <div className='w-full hidden md:flex py-2 justify-center items-center bg-sky-200 mx-auto'>
                                          <Logo />
                                    </div>
                                    <div className='flex flex-col items-center mt-4 -mx-2'>
                                          <Link to='/dashboard'>
                                                <img
                                                      className='object-cover w-16 h-16 mx-2 rounded-full'
                                                      src={user?.photoURL}
                                                      alt='avatar'
                                                      referrerPolicy='no-referrer'
                                                />
                                          </Link>
                                          <Link to='/dashboard'>
                                                <h4 className='mx-2 mt-2 font-medium text-gray-800  hover:underline'>
                                                      {user?.displayName}
                                                </h4>
                                          </Link>
                                          <Link to='/dashboard'>
                                                <p className='mx-2 mt-1 text-sm font-medium text-gray-600  hover:underline'>
                                                      {user?.email}
                                                </p>
                                          </Link>
                                    </div>
                              </div>

                              {/* Nav Items */}
                              <div
                                    className='flex flex-col justify-between flex-1 mt-6'>
                                    <nav>
                                          
                                          {role && role === 'host' ? <>
                                          <label
                                                      htmlFor='Toggle3'
                                                      className='flex-col w-full  rounded-md cursor-pointer text-gray-800
                                                     justify-center  mt-6'
                                                >
                                                      <input
                                                            onChange={toggleHandler}
                                                            id='Toggle3'
                                                            type='checkbox'
                                                            className='hidden peer'
                                                      />
                                                      
                                                          
                                                            <span className='px-4 ml-12 py-1 rounded-l-md bg-sky-400 peer-checked:bg-gray-300'>
                                                                        Guest
                                                                  </span>
                                                                  <span className='px-4 py-1 rounded-r-md bg-gray-300 peer-checked:bg-sky-400'>
                                                                        Host
                                                            </span>
                                                          
                                                            {toggle ? <HostMenu /> : <GuestMenu />}
                                                           
                                                      
                                                      
                                                </label> </> :<GuestMenu />}
                                          
                                    </nav>
                              </div>
                        </div>

                        <div>
                              <hr />
                              <NavLink
                                    to='/dashboard/profile'
                                    className={({ isActive }) =>
                                          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                          }`
                                    }
                              >
                                    <FcSettings className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>Profile</span>
                              </NavLink>

                              <button
                                    onClick={handleLogOut}
                                    className='flex w-full items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                              >
                                    <GrLogout className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>Logout</span>
                              </button>
                        </div>
                  </div>
            </>
      )
}

export default Sidebar