const {Router, json} = require("express");
const { ObjectId } = require("mongodb");
const { tryCatch, authCheck } = require("../basic/shotcuts");
const router = Router()
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args))
const {connection} = require("../mongo/connection")
const db = connection.db.db("studyzone")

router.get("/authCheck", (req, res)=>{
    res.json({success: true, response: {
        auth: req.body.key == process.env.KEY
    }})
})




router.post("/stack", async (req, res)=>{
    console.log(req.body)

    tryCatch(res, async ()=>{
        const {key, subjectID, name, questionName, answerName} = req.body;

        authCheck(res, key, async ()=>{
            let insert;
            if([name, questionName, answerName, subjectID].every(x=>!!x && typeof x == "string")){
                const subject = await db.collection("subjects").findOne({_id: ObjectId(subjectID)})
                const stackExists = !!subject.stacks.find(s=>s.name == name)

                if(!stackExists){
                    insert = await db.collection("subjects").updateOne(
                        {_id: ObjectId(subjectID)}, 
                        {$push: {
                            stacks: {
                                name,
                                indexcards: [],
                                questionName,
                                answerName
                            }
                        }
                    });                    
                }

            }
    
            res.json({success: !!insert ? insert.modifiedCount > 0 : false, response: {} })
        })  
    })
})



router.put("/stack", (req, res)=>{
    const {key, subjectID, stackName, changes} = req.body;

    tryCatch(res, async ()=>{
        authCheck(res, key, async ()=>{
            const subject = await db.collection("subject").find({_id: subjectID})
            const stackExists = subject.stacks.find(s=>s.name == stackName)

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