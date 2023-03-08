

const express = require('express')
const path = require('path');
const app = express();
const cors = require("cors") //delete
app.use(express.json());
app.use(cors())
require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

    const data = require("./routes/data")
    const admin = require("./routes/admin")
    app.use("/data", data)
    app.use("/admin", admin)
    app.use(express.static(path.join(__dirname, './studyzone-app/build')))
    app.use(express.urlencoded({extended: true}))
    const PORT = process.env.PORT || 3000
    
    
    
    app.get("/edit", (req, res)=>{
        const {key} = req.body
        if(key == process.env.KEY){
            res.sendFile(path.join(__dirname, "./studyzone-app/build/index.html"))
        }else {
            res.redirect("/")
        }
    })
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "./studyzone-app/build/index.html"))
    })
    
    
    app.listen(PORT, ()=>{
        console.log("Server started at Port: " + PORT)
    })

