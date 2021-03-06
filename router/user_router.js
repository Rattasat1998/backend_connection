const userRouter = require("express").Router();
const userController = require("../controllers/user_controller");

userRouter.post("/addNewUser", userController.addNewUser);

userRouter.post("/updateUser/:id", userController.updateUser);

userRouter.post("/deleteUser", userController.deleteUser);

userRouter.get("/:id", userController.getUserID);

userRouter.post("/auth", userController.authentication);

userRouter.get("/getprofile/profile/myprofile", userController.getprofile);

module.exports = userRouter;
