const  prisma  = require("../lib/prisma.js");




async function createFolder(foldername, id){
 
   // await prisma.folder.deleteMany()
    
  const newFolder = await prisma.folder.create({
   data: {
    authorId: id,
      title: foldername
   }
});
/*
const alluser = await prisma.user.findMany({
     include: { folders: true },
  })
  alluser.map((user)=> {
    console.log(user.folders)
  })*/
  return newFolder;
  

}
async function allCreatedFolders(id){
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: { folders: true },
  })
  const allfolders = await user.folders
 return allfolders
}

async function childrenFolders(id) {
  const folderWithChildren = await prisma.folder.findMany({
  where: { parentId: id },
});
 console.log(folderWithChildren)
  return folderWithChildren
  
}

async function createchildrenFolders(userid, parentFolderid , foldername){
   const newFolder = await prisma.folder.create({
   data: {
    authorId: userid,
    title: foldername,
    parentId: parentFolderid
   }
});
}
module.exports = {
    createFolder,
    allCreatedFolders,
    childrenFolders
}
