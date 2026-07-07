const {Router}  = require("express");
const indexRouter = Router();


indexRouter.get('/', (req, res)=> {
    res.send("Fuck U Ronaldo")
})

module.exports = indexRouter;