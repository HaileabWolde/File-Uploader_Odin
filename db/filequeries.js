const  prisma  = require("../lib/prisma.js");

async function createFile(parentID, filename, mimetype, path, size){
    const file = await prisma.file.create({
        data: {
            folderId: parentID,
            title: filename,
            filepath: path,
            type: mimetype,
            size: size,
        }
    })
}

module.exports = {
    createFile
}