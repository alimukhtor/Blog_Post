import express from 'express'
import AuthorsModel from './schema.js'

const authorRouter = express.Router()

authorRouter.post("/", async(req, res, next)=> {})
authorRouter.get("/", async(req, res, next)=> {})
authorRouter.get("/:authorId", async(req, res, next)=> {})
authorRouter.put("/:authorId", async(req, res, next)=> {})
authorRouter.delete("/:authorId", async(req, res, next)=> {})


export default authorRouter