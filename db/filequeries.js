const  prisma  = require("../lib/prisma.js");

async function createFile(parentID, filename, mimetype, filepath, size){
    const file = await prisma.file.create({
        data: {
            folderId: parentID,
            title: filename,
              type: mimetype,
            filepath: filepath,
            size: size,
        }
    })
}

module.exports = {
    createFile
}