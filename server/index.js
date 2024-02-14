const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 12000;
// This is your test secret API key.
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
// middleware
const jwt = require("jsonwebtoken");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yaanftr.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//send mail function

const sendMail = (emailData, emailAddress) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: emailAddress,
    subject: emailData.subject,
    html: `<p>${emailData?.message}</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};

//Verify Jwt or Validation of JWT token
const verifyJWT = (req, res, next) => {
  const authoraization = req.headers.authorization;
  if (!authoraization) {
    return res
      .status(401)
      .send({ error: true, message: `Unauthorized Access` });
  }
  const token = authoraization.split(" ")[1];
  // console.log(token);
  //verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: `Unauthorized Access` });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    const usersCollection = client.db("paradiseDb").collection("users");
    const roomsCollection = client.db("paradiseDb").collection("rooms");
    const bookingsCollection = client.db("paradiseDb").collection("bookings");

    //Genarate Jwt token
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: `7d`,
      });
      // console.log(token)
      res.send({ token });
    });

    //Genarate client secret for stripe payment

    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      console.log(price);
      if (price) {
        //convert dollar into cent
        const amount = parseFloat(price) * 100;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.send({ clientSecret: paymentIntent.client_secret });
      }
    });
    //save user to database

    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };

      const updateDoc = {
        $set: user,
      };

      const result = await usersCollection.updateOne(query, updateDoc, options);

      console.log(result);
      res.send(result);
    });

    //Get specific user by email

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
      // console.log(result);
    });

    // save rooms data to database

    app.post("/rooms", async (req, res) => {
      const room = req.body;
      const result = await roomsCollection.insertOne(room);
      res.send(result);
    });

    //Get Rooms data

    app.get("/rooms", async (req, res) => {
      const result = await roomsCollection.find().toArray();
      res.send(result);
    });

    //Get Host spechific Rooms data

    app.get("/rooms/:email", verifyJWT, async (req, res) => {
      const decodedEmail = req.decoded.email;
      const email = req.params.email;
      if (email != decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: `Forbiden Access` });
      }
      // if (!email) {
      //       res.send([])
      // }
      const query = { "host.email": email };
      const result = await roomsCollection.find(query).toArray();
      res.send(result);
    });

    //Get A Single Room data

    app.get("/room/:id", async (req, res) => {
      const roomId = req.params.id;
      const query = { _id: new ObjectId(roomId) };
      const result = await roomsCollection.findOne(query);
      res.send(result);
      // console.log(result);
    });

    //Delete room data from host database

    app.delete("/room/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const remove = await roomsCollection.deleteOne(query);
      res.send(remove);
    });

    // updated room booking status

    app.patch("/rooms/status/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const status = req.body.status;
      const updateDoc = {
        $set: {
          booked: status,
        },
      };
      const update = await roomsCollection.updateOne(query, updateDoc);
      res.send(update);
    });

    // save or add booking data to database

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);

      //send confirmation email to guest email account
      sendMail(
        {
          subject: "Booking Successful with payment !!",
          message: `Booking Id: ${result?.insertedId}, TransationId:${booking.transactionId}`,
        },
        booking?.guest?.email
      );
      //send confirmation email to host email account

      sendMail(
        {
          subject: "Booking Successful with payment !!",
          message: `Booking Id: ${result?.insertedId}, TransationId:${booking.transactionId}`,
        },
        booking?.host
      );
      res.send(result);
    });

    //Get bookings data

    app.get("/bookings", async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([]);
      }
      const query = { "guest.email": email };

      const result = await bookingsCollection.find(query).toArray();
      res.send(result);
    });
    //Get bookings data for host

    app.get("/bookings/host", async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([]);
      }
      const query = { host: email };

      const result = await bookingsCollection.find(query).toArray();
      res.send(result);
    });

    //Delete booking from database

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const remove = await bookingsCollection.deleteOne(query);
      res.send(remove);
    });

    // Send a ping to confirm a successful connection
    // await client.db('admin').command({ ping: 1 })
    // console.log(
    //       'Pinged your deployment. You successfully connected to MongoDB!'
    // )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Paradise Found Server is running..");
});

app.listen(port, () => {
  console.log(`Paradise Found is running on port ${port}`);
});
