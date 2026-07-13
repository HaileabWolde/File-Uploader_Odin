const {createFile} = require("../db/filequeries")
async function createFile(req, res){  
  console.log(req.files)
  const allfiles = req.files.map((file)=>{

  })
  res.send("fuck u bitch")

}
module.exports = {
   createFile
}