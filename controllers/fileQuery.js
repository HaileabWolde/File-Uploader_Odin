const  prisma  = require("../lib/prisma.js");

const db = require("../db/filequeries")
const dbOne = require("../db/folderqueries")





async function createFile(req, res){  
  const {name, parentid} = req.params
  const parentID = Number(parentid)
  const user = req.user
   
  try {
   //const deleteUsers = await prisma.file.deleteMany({});

    
    
    // Wait for all file database operations to finish before sending the response
    await Promise.all(
      req.files.map(async (file) => {
        
        try {
          const filepath = `/images/${file.filename}`
          const { filename, mimetype, size } = file;
          await db.createFile(parentID, file.originalname, mimetype, filepath, size);
        } catch (error) {
          console.log('Error saving file:', error);
        }
      })
    );


    res.redirect(`/folder/${name}/${parentid}`)
    /*
    console.log(folderwithFile.file)
    
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