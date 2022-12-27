function tryCatch(res, func){
    try{
        func()
    }catch(err){        
        res.json({success: false, response: {
            reason: "Etwas ist schief gelaufen"
        }})
    }
}

function authCheck(res, key, func){
    if(key === process.env.KEY){
        func()
    }else {
        res.json({success: false, response: {
            reason: "Du hast keine Berechtigung"
        }})
    }
}

module.exports = { tryCatch, authCheck }