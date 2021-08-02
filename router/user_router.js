const userRouter = require("express").Router();
const userController = require("../controllers/user_controller");

userRouter.post("/addNewUser", userController.addNewUser);

userRouter.post("/updateUser", userController.updateUser);

userRouter.post("/deleteUser", userController.deleteUser);

userRouter.get("/getAllUsers", userController.getAllUsers);

module.exports = userRouter;
