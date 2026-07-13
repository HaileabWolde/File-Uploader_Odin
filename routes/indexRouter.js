const {Router}  = require("express");
const passport = require("passport");
const indexRouter = Router();
const multer = require("multer");
//
const {createUser, validateUser, allfoldersofUser} = require("../controllers/userQuery")
const { isAuthenticated } = require("../isAuth/isAuthenticated")
const {createFolder, childrenFolder, createchildrenFolder} = require("../controllers/folderQuery")
const {createFile} = require("../controllers/fileQuery")

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "./public/images")
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + "--" + file.originalname);
  }
})

const upload = multer({ storage: fileStorageEngine})


///get routes
indexRouter.get('/', isAuthenticated, allfoldersofUser)

indexRouter.get('/login', (req, res)=> {
    const messages = req.session.messages || [];
    
    // Optional: clear the messages so they don't show again on refresh
    req.session.messages = [];

    res.render("log_in", {
        errors: messages.map(msg => ({ msg }))
    });
    
})

indexRouter.get('/sign-up', (req, res)=> {
    res.render("sign_up")
})

indexRouter.get('/folder/:name/:id',  childrenFolder)

// post routes
indexRouter.post('/signup', validateUser, createUser) 
indexRouter.post('/folder/:name/:parentid', createchildrenFolder)
indexRouter.post('/file/:name/:parentid', upload.array("images", 3), createFile)
indexRouter.post('/folder/create' , createFolder)
indexRouter.post("/login",
 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }))


  //log out
indexRouter.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}
)
module.exports = indexRouter;