const { body, validationResult, matchedData } = require("express-validator");
const { Prisma } = require ("../generated/prisma/client");
const db = require("../db/queries");
const dbOne = require("../db/folderqueries")

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  
// Option 2 — add username and password to your validateUser array
body("username").trim()
    .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters"),
body("password").trim()
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

];
async function createUser(req, res, next){
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).render("sign_up", {
        title: "Create user",
        errors: errors.array(),
      });
    }
     // Use req.body directly instead of matchedData
    const { username, password } = req.body;

    try {
        await db.createUser(username, password);
        res.redirect("/login");
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
         // The .code property can be accessed in a type-safe manner
             if (error.code === "P2002") {     
                return  res.status(400).render("sign_up", {
              title: "Create user",
              errors: [{ msg: "Username already taken" }]
            })
                 }
  }
    
  next(error); // unexpected error
}
}

async function allfoldersofUser(req, res){
    const {id} = req.user
    try{
       const allfolders = await dbOne.allCreatedFolders(id)
        const allparentFolders = allfolders.filter((f)=> {
    return f.parentId === null
  })
 
          res.render("index", {
           user: req.user,
           allfolders: allfolders,
           allparentFolders: allparentFolders
    })
    }
    catch(error){
        console.log("error", error)
    }

}

module.exports = {
    createUser,
    validateUser,
    allfoldersofUser
}