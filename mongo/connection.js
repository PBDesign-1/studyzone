const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

class connection {
  static async open() {
    if (!this.db) {
      this.db = await MongoClient.connect(this.url, this.options)
    }
    return this.db.db("studyzone")
  }
}

connection.db = null
connection.url = process.env.Mongo_URI
connection.options = { useNewUrlParser: true, useUnifiedTopology: true }

module.exports = {connection};