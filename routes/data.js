const {Router, json} = require("express");
const router = Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get("/subjects", (req, res)=>{

})
router.get("/stacks", (req, res)=>{
    
})
router.get("/indexcards", (req ,res)=>{

})


module.exports = router