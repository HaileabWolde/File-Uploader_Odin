const db = require("../db/folderqueries")

async function createFolder(req, res){
    const {foldername} = req.body;
    const {id} = req.user
    const newid = Number(id)
    console.log(newid)
    try{
        await db.createFolder(foldername, newid)
        
        res.redirect("/")
    }
    catch(error){
        console.log("error", error)
    }
}

async function childrenFolder(req, res){
    const {id} = req.params
     const newid = Number(id)
    try{
        await db.childrenFolders(newid)
      
    }
    catch(error){
        console.log("error", error)
    }
}

module.exports = {
    createFolder,
    childrenFolder
}