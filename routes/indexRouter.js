const {Router}  = require("express");
const passport = require("passport");
const indexRouter = Router();


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

module.exports = indexRouter;