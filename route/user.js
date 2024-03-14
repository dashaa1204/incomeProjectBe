const userRouter = require("express").Router();
const { addUser, delUser } = require("../service/user-service");

userRouter.post("/add-user", async (req, res) => {
  const newUserData = req.body;
  const result = await addUser(newUserData);
  res.json(result);
});

userRouter.post("/delete-user", async (req, res) => {
  const result = await delUser();
  res.json(result);
});

module.exports = userRouter;
