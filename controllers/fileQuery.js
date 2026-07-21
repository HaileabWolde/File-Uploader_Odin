const  prisma  = require("../lib/prisma.js");
const db = require("../db/filequeries")
const dbOne = require("../db/folderqueries")

async function createFile(req, res){  
  const {name, parentid} = req.params
  const parentID = Number(parentid)
  const user = req.user
  try {
    const deleteUsers = await prisma.file.deleteMany({});

    /*
    
    // Wait for all file database operations to finish before sending the response
    await Promise.all(
      req.files.map(async (file) => {
        try {
          const { filename, mimetype, path, size } = file;
          await db.createFile(parentID, filename, mimetype, path, size);
        } catch (error) {
          console.log('Error saving file:', error);
        }
      })
    );

    const folderContent = await dbOne.childrenFolders(parentID)
    const folderwithFile = await dbOne.folderwithFile(parentID)
    console.log(folderwithFile)
    
     res.render("subFolder", {
        allchildrenFolder: folderContent,
        folderwithFile: folderwithFile,
        user: user,
        name: name,
        id: parentid
       })
      */
    
    
  } catch (error) {
    console.log("error", error)
    res.status(500).send('Server error');
  }
 

}
module.exports = {
   createFile
}