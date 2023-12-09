"# paradise-found"

![image](https://github.com/sojibpannashovon2/paradise-found/assets/108423803/a35baa6a-d40c-406e-b5ec-a14ed14c25b0)

#For Server--Initial package

{
"name": "aircnc-server",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"start": "node index.js",
"dev": "nodemon index.js"
},
"keywords": [],
"author": "",
"license": "ISC",
"dependencies": {
"cors": "^2.8.5",
"dotenv": "^16.0.3",
"express": "^4.18.2",
"mongodb": "^5.5.0"
}
}

#For Inital index.js given requirment

const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 7000

// middleware
const corsOptions = {
origin: '\*',
credentials: true,
optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mq0mae1.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
serverApi: {
version: ServerApiVersion.v1,
strict: true,
deprecationErrors: true,
},
})

async function run() {
try {
const usersCollection = client.db('aircncDb').collection('users')
const roomsCollection = client.db('aircncDb').collection('rooms')
const bookingsCollection = client.db('aircncDb').collection('bookings')

            // Send a ping to confirm a successful connection
            await client.db('admin').command({ ping: 1 })
            console.log(
                  'Pinged your deployment. You successfully connected to MongoDB!'
            )
      } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
      }

}
run().catch(console.dir)

app.get('/', (req, res) => {
res.send('Paradise Found Server is running..')
})

app.listen(port, () => {
console.log(`Paradise Found is running on port ${port}`)
})

#For Sidebar code

import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'
import Logo from '../Shared/Navbar/Logo'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
const Sidebar = () => {
const navigate = useNavigate()
const [toggle, setToggle] = useState(false)
const { user, logOut } = useContext(AuthContext)

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
{/_ Small Screen Navbar _/}
<div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
<div>
<div className='block cursor-pointer p-4 font-bold'>
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
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className='w-full hidden md:flex py-2 justify-center items-center bg-rose-100 mx-auto'>
              <Logo />
            </div>
            <div className='flex flex-col items-center mt-6 -mx-2'>
              <Link to='/dashboard'>
                <img
                  className='object-cover w-24 h-24 mx-2 rounded-full'
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
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              <>
                <label
                  htmlFor='Toggle3'
                  className='inline-flex w-full justify-center items-center px-2 rounded-md cursor-pointer text-gray-800'
                >
                  <input
                    onChange={toggleHandler}
                    id='Toggle3'
                    type='checkbox'
                    className='hidden peer'
                  />
                  <span className='px-4 py-1 rounded-l-md bg-rose-400 peer-checked:bg-gray-300'>
                    Guest
                  </span>
                  <span className='px-4 py-1 rounded-r-md bg-gray-300 peer-checked:bg-rose-400'>
                    Host
                  </span>
                </label>
                {/* Menu Links */}
                <NavLink
                  to='add-room'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <BsFillHouseAddFill className='w-5 h-5' />

                  <span className='mx-4 font-medium'>Add Room</span>
                </NavLink>
              </>
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
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

----------------------------------- New Techonogy Used -------------------------------------

1.  React-date-range

    Installation
    npm install --save react-date-range

    You need to import skeleton and theme styles first.

            import 'react-date-range/dist/styles.css'; // main style file
            import 'react-date-range/dist/theme/default.css'; // theme css file


                          const selectionRange = {
                          startDate: new Date(),
                          endDate: new Date(),
                          key: 'selection',
                        }
                        return (
                          <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={this.handleSelect}
                          />
                        )

2.  React-fns

    This plugin expects react and date-fns as peerDependencies, It means that you need to install them in your project folder.

          npm install --save react date-fns


            import { formatDistance } from 'date-fns'

            formatDistance(date, baseDate, [options])


              const totalPrice = parseFloat(
                formatDistance(
                      new Date(roomData.to),
                      new Date(roomData.from)
                ).split(' ')[0]
                ) * roomData.price;

3.  Spinner, React-spinner(Data loader) From react-icons site

    Spinner

    Link: https://react-icons.github.io/react-icons/search/#q=spinner

             import { ImSpinner4 } from "react-icons/im";

             <ImSpinner4 />


                              <div>
                                    <button
                                          type='submit'
                                          className='bg-blue-500 w-full rounded-md py-3 text-white'
                                    >
                                          {loading ? <TbFidgetSpinner size={24} className='m-auto animate-spin' /> : "Continue"}
                                    </button>
                              </div>

Data Loader(React Spinner)

Link: https://www.davidhu.io/react-spinners/

            <div
                              className='
                  h-[70vh]
                  flex
                  flex-col
                  justify-center
                  items-center
                '
                        >
                              <PacmanLoader size={50} color='red' />
            </div>

4.  Query-string

           import qs from "query-string"




                import { useNavigate, useSearchParams } from 'react-router-dom';
                import qs from "query-string"
                const CategoryBox = ({ label, icon: Icon }) => {
                      const [params, setParams] = useSearchParams();
                      const value = params.get("category");
                      // console.log(value);
                      const navigate = useNavigate();

                      const handleClick = () => {
                            let currentQuery = {};
                            if (params) {
                                  currentQuery = qs.parse(params.toString())
                            }
                            const updateQuery = {
                                  ...currentQuery,
                                  category: label,
                            }

                            const url = qs.stringifyUrl(
                                  {
                                        url: '/',
                                        query: updateQuery,
                                  },
                                  {
                                        skipNull: true
                                  }

                            )
                            navigate(url)
                      }

                      return (
                            <div onClick={handleClick} className='flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 border-transparent text-neutral-500'>
                                  <Icon size={26} />
                                  <div className='text-sm font-medium'>{label}</div>
                            </div>
                      );
                };

                export default CategoryBox;

#Nodemailer Component

Nodemailer blog -> Blog Link
https://miracleio.me/snippets/use-gmail-with-nodemailer/

Email Template Guide => Blog Link
https://medium.com/jsblend/how-to-send-emails-with-templates-using-nodejs-176b72c1406d

new branch Added.
