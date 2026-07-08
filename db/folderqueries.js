const  prisma  = require("../lib/prisma.js");




async function createFolder(foldername, id){
 
    await prisma.folder.deleteMany()
    /*
  const newFolder = await prisma.folder.create({
   data: {
    authorId: id,
      title: foldername
   }
});
const alluser = await prisma.user.findMany({
     include: { folders: true },
  })
  console.log(alluser)
  return newFolder;
  
*/
}
module.exports = {
    createFolder
}
