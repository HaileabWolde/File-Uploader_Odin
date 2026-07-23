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
        next(error)
    }
}

async function childrenFolder(req, res){
    const uploadError = req.session.uploadError || [];
   req.session.uploadError = null; // clear it after reading

    const {name, parentid} = req.params
     const newid = Number(parentid)
     const user = req.user
     const {id} = req.user
     
    try{
        const allchildrenFolder = await db.childrenFolders(newid)
       const folderwithFile = await db.folderwithFile(newid)
       const allfolders = await db.allCreatedFolders(id)
       const allparentFolders = allfolders.filter((f)=> {
                        return f.parentId === null
                   })
         
      const childrenFolder = await Promise.all(
              allparentFolders.map(async (f)=> {
                   try{
                        return await db.childrenFolders(f.id)
                   }
                   catch(error){
                       console.log("error", error)
                   }
              
              })
           )
          
    const flatChildren = childrenFolder.flat()
       res.render("subFolder", {
        allchildrenFolder: allchildrenFolder,
        folderwithFile: folderwithFile.file,
        user: user,
        name: name,
        id: parentid,
        allparentFolders: allparentFolders,
        childrenFolder: flatChildren,
        errors: uploadError.map(msg=> ({msg}))
       })
    }
    catch(error){
        console.log("error", error)
        next(error)
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
        next(error)
       }
}

async function deletechildrenFolders(req, res){
    const{name, id} = req.params
    const newid = Number(id)
    try{
        await db.deletechildrenFolders(newid)
        res.redirect("/")
    }
    catch(error){
        console.log('error', error)
        next(error)
    }
}
module.exports = {
    createFolder,
    childrenFolder,
    createchildrenFolder,
    deletechildrenFolders
}