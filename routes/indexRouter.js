const {Router}  = require("express");
const passport = require("passport");
const indexRouter = Router();
const {createUser, validateUser} = require("../controllers/userQuery")

indexRouter.get('/', (req, res)=> {
    if(!req.user){
        res.redirect('/login')
    }
    else {
          res.render("index")
    }
  
})

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

indexRouter.post('/signup', validateUser, createUser) 
indexRouter.post("/login",
 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }))

module.exports = indexRouter;