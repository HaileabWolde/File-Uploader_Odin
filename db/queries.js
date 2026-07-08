const  prisma  = require("../lib/prisma.js");
const passport = require("passport");
const bcrypt = require("bcryptjs");


async function createUser(username, password){
  const hashedPassword = await bcrypt.hash(password,  10);
  const user = await prisma.user.create({
   data: {
      username: `${username}`,
      password: `${hashedPassword}`
   }
});
  const alluser = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.log(alluser)
  return user;

}
module.exports = {
    createUser,
}
