const { Router, json } = require("express");
const { ObjectId } = require("mongodb");
const { tryCatch, authCheck } = require("../basic/shotcuts");
const router = Router()
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args))
const Subjects = require("../mongo/models.js")


router.get("/authCheck", (req, res) => {
    res.json({
        success: true, response: {
            auth: req.body.key == process.env.KEY
        }
    })
})




router.post("/stack", async (req, res) => {
    // console.log(req.body)
    try {
        tryCatch(res, async () => {
            const { key, subjectId, name, questionName, answerName } = req.body;

            authCheck(res, key, async () => {
                let insert;
                if ([name, questionName, answerName, subjectId].every(x => !!x && typeof x == "string")) {
                    const subject = await Subjects.findOne({ _id: ObjectId(subjectId) })
                    const stackExists = !!subject.stacks.find(s => s.name == name)

                    // console.log(subject)
                    if (!stackExists) {
                        insert = await Subjects.findOneAndUpdate(
                            { _id: ObjectId(subjectId) },
                            {
                                $push: {
                                    stacks: {
                                        name,
                                        indexcards: [],
                                        questionName,
                                        answerName
                                    }
                                }
                            },
                            {
                                returnOriginal: false,
                                returnDocument: "after"
                            });
                    }

                }


                res.json({ success: !!insert ? !!insert.stacks.find(s => s.name == name) : false, response: {} })
            })
        })
    } catch (err) {
        res.json({
            success: false, response: {
                reason: "Etwas ist schief gelaufen"
            }
        })
    }

})



router.put("/stack", (req, res) => {
    const { key, subjectId, stackName, changes } = req.body;

    tryCatch(res, async () => {
        authCheck(res, key, async () => {

            const subject = await Subjects.findOne({ _id: ObjectId(subjectId) })
            console.log(subject)
            const stackExists = !!subject ? !!subject.stacks.find(s => s.name == stackName) : false

            if (stackExists && typeof changes == "object") {
                const updateStack = await Subjects.findByIdAndUpdate({ _id: ObjectId(subjectId) }, { $set: { "stacks.$[s]": { ...subject.stacks.find(s => s.name == stackName), ...changes } } }, { arrayFilters: [{ "s.name": stackName }] })

                res.json({ success: true, response: {} })
            } else {
                res.json({
                    success: false, response: {
                        reason: "Der Stapel existiert nicht"
                    }
                })
            }
        })
    })
})




router.post("/indexcards", (req, res) => {
    const { key, subjectId, stackName, indexcards } = req.body;

    tryCatch(res, async () => {
        authCheck(res, key, async () => {
            let update;
            const subject = await Subjects.findOne({ _id: ObjectId(subjectId)})
            const stackExists = !!subject ? !!subject.stacks.find(s => s.name == stackName) : false
            const correctForm = indexcards.map(i => typeof i.answer == "string" & typeof i.question == "string")

            if ([subjectId, stackName].every((x) => !!x && typeof x == "string") && Array.isArray(indexcards) && correctForm) {
                update = await Subjects.findByIdAndUpdate({ _id: ObjectId(subjectId) }, { $push: { "stacks.$[s].indexcards": { $each: indexcards } } }, { arrayFilters: [{ "s.name": stackName }] })
            }

            console.log(indexcards)
            res.json({
                success: !!update, response: {

                }
            })
        })
    })
})


// router.put("/indexcard", (req, res) => {
//     const { key } = req.body;

//     tryCatch(res, async () => {
//         authCheck(res, key, async () => {
//             res.json({
//                 success: true, response: {

//                 }
//             })
//         })
//     })
// })


// router.delete("/indexcard", (req, res) => {
//     const { key } = req.body;

//     tryCatch(res, async () => {
//         authCheck(res, key, async () => {
//             res.json({
//                 success: true, response: {

//                 }
//             })
//         })
//     })
// })




module.exports = router