const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const { AdminAuth, LoginAuth, SignupAuth } = require("../controller/middleware");
const {userController} = require("../controller");

const upload = multer({ storage: multer.memoryStorage() });

userRouter.post("/signup",SignupAuth,userController.userSignup);
userRouter.post("/login",LoginAuth,userController.userLogin);
userRouter.post("/adminProject",AdminAuth, upload.single("file"),userController.adminUploadproject);
userRouter.get('/getfullfile',userController.userLowestbit);

module.exports=userRouter;
