//initializing
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6mxxl.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

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
    // Connect the client to the server	(optional starting in v4.7)


    const categoryCollection = client.db("fashionDB").collection("category");
    const allProductsCollection = client.db("fashionDB").collection("allProducts");


    //category related api
    app.get("/category", async (req, res) => {
      const cursor = categoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    //category related api
    app.get("/allProducts", async (req, res) => {
      const cursor = allProductsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })



    // Send a ping to confirm a successful connection

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Sun Fashion server is running");
})

app.listen(port, () => {
  console.log((`Sun Fashion server is running on port: ${port}`))
})