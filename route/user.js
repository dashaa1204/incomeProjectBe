const userRouter = require("express").Router();
const { addUser, delUser, addCur } = require("../service/user-service");

userRouter.post("/add-user", async (req, res) => {
  const newUserData = req.body;
  const result = await addUser(newUserData);
  console.log(result);
  res.json(result);
});

userRouter.post("/delete-user", async (req, res) => {
  const result = await delUser();
  res.json(result);
});

userRouter.put("/add-cur", async (req, res) => {
  const newUserData = req.body;
  console.log(newUserData);
  const result = await addCur(newUserData);
  res.json(result);
});

module.exports = userRouter;
