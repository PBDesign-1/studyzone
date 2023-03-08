// const MongoClient = require('mongodb').MongoClient
// require('dotenv').config();

// class connection {

//     static async open() {
//         if (this.db) return this.db
//         this.db = await MongoClient.connect(process.env.Mongo_URI)
//         // console.log(await this.db.db("studyzone").collection("subjects").findOne({}))
//         return this.db
//     }

// }

// // connection.db = null
// // connection.url = process.env.Mongo_URI



// Import necessary packages
const MongoClient = require('mongodb').MongoClient;

// Get the URI from the environment variable
const uri = process.env.MONGO_URI;

// Create a new MongoClient instance
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the database name
const dbName = 'studyzone';

// Connect to the MongoDB client
client.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Connected to MongoDB server');

  // Export the database object
  module.exports = {db: client.db(dbName)};
});