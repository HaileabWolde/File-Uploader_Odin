const {Router}  = require("express");
const passport = require("passport");
const indexRouter = Router();
const {createUser, validateUser, allfoldersofUser} = require("../controllers/userQuery")
const { isAuthenticated } = require("../isAuth/isAuthenticated")
const {createFolder, childrenFolder} = require("../controllers/folderQuery")

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

indexRouter.get('/folder/:id',  childrenFolder)

// post routes
indexRouter.post('/signup', validateUser, createUser) 
indexRouter.post('/folder/create' , createFolder)
indexRouter.post("/login",
 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }))
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