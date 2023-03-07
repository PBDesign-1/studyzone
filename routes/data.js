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
    
        const subjectsFormated = subjects.map(s=>{return {_id: s._id, name: s.name, stackNumber: s.stacks.length}})
    
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


router.get("/indexcards/:subjectId/:stackName", (req ,res)=>{
    let {subjectId, stackName} = req.params;
    const stackNameReplaced = stackName.replace(/_/gi, " ")

    tryCatch(res, async ()=>{
        const subject = await db.collection("subjects").findOne({_id: ObjectId(subjectId)})
        console.log(subject, stackNameReplaced)
        const stack = subject.stacks.find(s=>s.name == stackNameReplaced)

        res.json({success: true, response: {
            stack
        }})        
    })

})



module.exports = router