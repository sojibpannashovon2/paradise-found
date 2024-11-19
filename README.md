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

### Data Loader(React Spinner)

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

4.  ## Query-string

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

## Nodemailer Component

Nodemailer blog -> Blog Link
https://miracleio.me/snippets/use-gmail-with-nodemailer/

## Email Template Guide => Blog Link

https://medium.com/jsblend/how-to-send-emails-with-templates-using-nodejs-176b72c1406d

new branch Added.

# React-Spinner for Loading Data

https://www.davidhu.io/react-spinners/

### For 64 bit genarate secret key

require('crypto').randomBytes(64).toString('hex')

# Genarate Jwt token

            app.post('/jwt', async (req, res) => {
                  const email = req.body
                  const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: `1h`,
                  })
                  console.log(token)
                  res.send({ token })
            })

# Post token from client site using axios. Here another default system is provide for poating data to backend. Finally save access token to local storage and remove data from localStorage according to the current user existents.

if (currentUser && currentUser?.email) {

        // fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify({ email: currentUser.email }),
        // }).then(res => res.json())
        //   .then(data => {

        //     console.log(data)
        //     localStorage.setItem("access-token", data.token)
        //   })
        axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
          email: currentUser?.email,
        }).then(data => {
          console.log(data.data.token);
          localStorage.setItem("access-token", data.data.token)
          setLoading(false)
        })
      }
      else {
        localStorage.removeItem("access-token")
        setLoading(false)
      }

### Verify Jwt or Validation of JWT token

                                    const verifyJWT = (req, res, next) => {
                                          const authoraization = req.headers.authorization
                                          if (!authoraization) {
                                                return res
                                                      .status(401)
                                                      .send({ error: true, message: `Unauthorized Access` })
                                          }
                                          const token = authoraization.split(' ')[1]
                                          console.log(token);
                                          //verify token
                                          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                                                if (err) {
                                                      return res
                                                            .status(401)
                                                            .send({ error: true, message: `Unauthorized Access` })
                                                }
                                                req.decoded = decoded
                                                next();
                                          })

                                    }

### Get Host spechific Rooms data and verify that only the spechific or valid or same user can see the routes data

            app.get('/rooms/:email', verifyJWT, async (req, res) => {
                  const decodedEmail = req.decoded.email;
                  const email = req.params.email;
                  if (email != decodedEmail) {
                        return res
                              .status(403)
                              .send({ error: true, message: `Forbiden Access` })
                  }
                  // if (!email) {
                  //       res.send([])
                  // }
                  const query = { 'host.email': email }
                  const result = await roomsCollection.find(query).toArray()
                  res.send(result)
            })

##Axios Intercept using

              import axios from "axios";
              import { useContext, useEffect } from "react";
              import { useNavigate } from "react-router-dom";
              import { AuthContext } from "../providers/AuthProvider";

              // ALL OPERARTION WILL BE DONE BY THIS AXIOS SECURE
              const axiosSecure = axios.create({
                baseURL: `${import.meta.env.VITE_API_URL}`,
              });

              const useAxiosSecure = () => {
                const navigate = useNavigate();
                const { logOut } = useContext(AuthContext);
                useEffect(() => {
                  //Intercept Request(client ----- to ----server)
                  axiosSecure.interceptors.request.use((config) => {
                    const token = `Bearer ${localStorage.getItem("access-token")}`;
                    if (token) {
                      //Headers add to the every
                      config.headers.Authorization = token;
                    }
                    return config;
                  });
                  //Intercept Response(server ---- to ---- client)
                  axiosSecure.interceptors.response.use(
                    (response) => response,

                    async (error) => {
                      if (
                        (error.response && error.response.status === 401) ||
                        error.response.status === 403
                      ) {
                        await logOut();
                        navigate("/login");
                      }

                      return Promise.reject(error);
                    }
                  );
                }, [logOut, navigate, axiosSecure]);

                return [axiosSecure];
              };

              export default useAxiosSecure;
