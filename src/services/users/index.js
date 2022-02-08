import express from "express";
import UserModel from './schema.js'

const userRouter = express.Router()

userRouter.get("/", async(req, res, next)=> {})
userRouter.post("/", async(req, res, next)=> {})
userRouter.get("/:userId", async(req, res, next)=> {})
userRouter.put("/:userId", async(req, res, next)=> {})
userRouter.delete("/:userId", async(req, res, next)=> {})

export default userRouter