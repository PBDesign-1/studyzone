const {Router, json} = require("express");
const { ObjectId } = require("mongodb");
const { tryCatch } = require("../basic/shotcuts");
const router = Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {connection} = require("../mongo/connection")
connection.open()
const db = connection.db.db("studyzone")


router.get("/subjects", async (req, res)=>{
    tryCatch(res, async ()=>{
        const subjectsRaw = await db.collection("subjects").find({})
        const subjects = await subjectsRaw.toArray()
    
        const subjectsFormated = subjects.map(s=>{return {name: s.name, stackNumber: s.stacks.length}})
    
        res.json({success: true, response: {
            subjectsFormated
        }})
    })

})


router.get("/stacks/:subjectID", async (req, res)=>{
    const {subjectID} = req.params

    tryCatch(res, async ()=>{
        let subject = await db.collection("subjects").findOne({_id: ObjectId(subjectID)})

        res.json({success: true, response: {
            subject
        }})        
    })
})


router.get("/indexcard", (req ,res)=>{
    tryCatch(res, async ()=>{
        res.json({success: true, response: {
            
        }})        
    })

})



module.exports = router