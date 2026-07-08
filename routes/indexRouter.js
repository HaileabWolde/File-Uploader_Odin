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
    res.render("log_in")
})

indexRouter.get('/sign-up', (req, res)=> {
    res.render("sign_up")
})

indexRouter.post('/signup', validateUser, createUser) 

module.exports = indexRouter;