const db = require("../db/folderqueries")

async function createFolder(req, res){
    const {foldername} = req.body;
    const {id} = req.user
    const newid = Number(id)
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
     const user = req.user
    try{
       const allchildrenFolder = await db.childrenFolders(newid)
       res.render("subFolder", {
        allchildrenFolder: allchildrenFolder,
        user: user
       })
      
    }
    catch(error){
        console.log("error", error)
    }
}

async function createchildrenFolder(req, res){
    const {parentid, name} = req.params
    const parentFolderid = Number(parentid)
       const {id} = req.user
         const userid = Number(id)
         const {foldername} = req.body;

       try{
          const allchildrenFolder= await db.createchildrenFolders(userid, parentFolderid , foldername)
          res.redirect(`/folder/${name}/${parentid}`)

       }
       catch(error){
        console.log("error", error)
       }
}

module.exports = {
    createFolder,
    childrenFolder,
    createchildrenFolder
}