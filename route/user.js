const userRouter = require("express").Router();
const { addUser } = require("../service/user-service");

userRouter.post("/addUser", async (req, res) => {
  const newUserData = req.body;
  const result = await addUser(newUserData);
  res.json(result);
});

module.exports = userRouter;
