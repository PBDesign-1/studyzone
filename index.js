const express = require('express')
const path = require('path');
const app = express();
// const cors = require("cors") //delete
require('dotenv').config();

const data = require("./routes/data")

const {connection} = require('./mongo/connection')

app.use(express.static(path.join(__dirname, './studyzone-app/build')))
app.use(express.urlencoded({extended: true}))
const PORT = process.env.PORT || 3000

app.use("/data", data)


app.get("/edit", (req, res)=>{
    const {key} = req.body
    if(key === "Be the change you want to see in the world."){
        res.sendFile(path.join(__dirname, "./studyzone-app/build/index.html"))
    }else {
        res.redirect("/home")
    }
})
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "./studyzone-app/build/index.html"))
})

app.listen(PORT, ()=>{
    console.log("Server started al Port: " + PORT)
})