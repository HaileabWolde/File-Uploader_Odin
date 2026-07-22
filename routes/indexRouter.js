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
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only PNG and JPEG is allowed!'), false);
  }
};
const upload = multer({ 
  storage: fileStorageEngine,   
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024  // 5MB max per file
  },})

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

indexRouter.get('/folder/:name/:parentid',  childrenFolder)

// post routes
indexRouter.post('/signup', validateUser, createUser) 
indexRouter.post('/folder/:name/:parentid', createchildrenFolder)
indexRouter.post('/file/:name/:parentid',  (req, res, next) => {
    upload.array("images", 3)(req, res, function(err) {
        const { name, parentid } = req.params;
        if (err instanceof multer.MulterError) {
          const targetedArray = ["Too many files or file too large — max 3 files, 5MB each"]
          req.session.uploadError = targetedArray;
            return res.redirect(`/folder/${name}/${parentid}`);
        }
        else if (err) {
          const targetedArray = [err.message];
            req.session.uploadError = targetedArray;
            return res.redirect(`/folder/${name}/${parentid}`);
        }
        next(); // no error, continue to createFile
    });
}, createFile)
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