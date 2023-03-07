const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

class connection {

    static async open() {
        if (this.db) return this.db
        this.db = await MongoClient.connect(this.url, this.options)
        // console.log(await this.db.db("studyzone").collection("subjects").findOne({}))
        return this.db
    }

}

// connection.db = null
connection.url = process.env.Mongo_URI



module.exports = {connection};