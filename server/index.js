const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 12000
// This is your test secret API key.
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
// middleware
const corsOptions = {
      origin: '*',
      credentials: true,
      optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yaanftr.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
      serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
      }
});

async function run() {
      try {
            const usersCollection = client.db('paradiseDb').collection('users')
            const roomsCollection = client.db('paradiseDb').collection('rooms')
            const bookingsCollection = client.db('paradiseDb').collection('bookings')

            //Genarate client secret for stripe payment

            app.post('/create-payment-intent', async (req, res) => {
                  const { price } = req.body
                  console.log(price);
                  if (price) {
                        //convert dollar into cent
                        const amount = parseFloat(price) * 100
                        const paymentIntent = await stripe.paymentIntents.create({
                              amount: amount,
                              currency: 'usd',
                              payment_method_types: ['card'],
                        })
                        res.send({ clientSecret: paymentIntent.client_secret })
                  }
            })
            //save user to database

            app.put("/users/:email", async (req, res) => {
                  const email = req.params.email
                  const user = req.body
                  const query = { email: email }
                  const options = { upsert: true }

                  const updateDoc = {
                        $set: user,
                  }

                  const result = await usersCollection.updateOne(query, updateDoc, options)

                  console.log(result);
                  res.send(result)
            })

            //Get specific user by email

            app.get('/users/:email', async (req, res) => {
                  const email = req.params.email
                  const query = { email: email }
                  const result = await usersCollection.findOne(query)
                  res.send(result)
                  // console.log(result);
            })

            // save rooms data to database

            app.post('/rooms', async (req, res) => {
                  const room = req.body;
                  const result = await roomsCollection.insertOne(room)
                  res.send(result)
            })


            //Get Rooms data

            app.get('/rooms', async (req, res) => {
                  const result = await roomsCollection.find().toArray()
                  res.send(result)
            })

            //Get A Single Room data

            app.get('/rooms/:id', async (req, res) => {
                  const roomId = req.params.id
                  const query = { _id: new ObjectId(roomId) }
                  const result = await roomsCollection.findOne(query)
                  res.send(result)
                  // console.log(result);
            })


            // updated room booking status

            app.patch('/rooms/status/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: new ObjectId(id) }
                  const status = req.body.status
                  const updateDoc = {
                        $set: {
                              booked: status,
                        }
                  }
                  const update = await roomsCollection.updateOne(query, updateDoc)
                  res.send(update)
                  console.log(update);
            })


            // save or add booking data to database

            app.post('/bookings', async (req, res) => {
                  const booking = req.body;
                  const result = await bookingsCollection.insertOne(booking)
                  res.send(result)
            })

            //Get Rooms data

            app.get('/bookings', async (req, res) => {

                  const email = req.query.email

                  if (!email) {
                        res.send([])
                  }
                  const query = { 'guest.email': email }

                  const result = await bookingsCollection.find(query).toArray()
                  res.send(result)
            })

            //Delete booking from database

            app.delete('/bookings/:id', async (req, res) => {
                  const id = req.params.id
                  const query = { _id: new ObjectId(id) }
                  const remove = await bookingsCollection.deleteOne(query)
                  res.send(remove);
            })



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