const {Router, json} = require("express");
const { tryCatch, authCheck } = require("../basic/shotcuts");
const router = Router()
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args))
const {connection} = require("../mongo/connection")
connection.open()
const db = connection.db.db("studyzone")

router.get("/authCheck", (req, res)=>{
    res.json({success: true, response: {
        auth: req.body.key == process.env.KEY
    }})
})




router.post("/stack", async (req, res)=>{
    const {key, name, questionName, answerName} = req.body;
    
    tryCatch(res, async ()=>{
        authCheck(res, key, async ()=>{
            let insert;
            if([name, questionName, answerName].every(x=>!!x && typeof x == "string")){
                insert = await db.collection("subject").insert({
                    name,
                    indexcards: [],
                    questionName,
                    answerName
                });
            }
    
            res.json({success: true, response: !!insert ? {
                
            } : {} })
     
        })  
    })
})



router.put("/stack", (req, res)=>{
    const {key, subject, stack, changes} = req.body;

    tryCatch(res, async ()=>{
        authCheck(res, key, ()=>{
            res.json({success: true, response: {
                
            }})            
        })
    })
})




router.post("/indexcard", (req, res)=>{
    const {key, subjectName, stackName} = req.body;

    tryCatch(res, async ()=>{
        authCheck(res, key, ()=>{
            let indexcards;
            if([subjectName, stackName].every((x)=>!x && typeof x == "string")){
               
            }                
            res.json({success: !!indexcards, response: {
                    
            }})
        })
    })
})


router.put("/indexcard", (req, res)=>{
    const {key} = req.body;

    tryCatch(res, async ()=>{
        authCheck(res, key, async ()=>{
            res.json({success: true, response: {
                
            }})            
        })
    })
})


router.delete("/indexcard", (req, res)=>{
    const {key} = req.body;

    tryCatch(res, async ()=>{
        authCheck(res, key, async ()=>{
            res.json({success: true, response: {
                
            }})
        })
    })
})




module.exports = router