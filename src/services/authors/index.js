import express from 'express'
import AuthorsModel from './schema.js'
import {userAuth} from '../userAuth/userAuth.js'
import { userOnlyMiddleware } from "../userAuth/user.js";

const authorRouter = express.Router()

authorRouter.post("/", async(req, res, next)=> {
    try {
        const author = new AuthorsModel(req.body)
        const {_id} = await author.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})
authorRouter.get("/", async(req, res, next)=> {
    try {
        const author = await AuthorsModel.find(req.body)
        res.send(author)
    } catch (error) {
        next(error)
    }
})
authorRouter.get("/:authorId", async(req, res, next)=> {
    try {
        const authorId = await AuthorsModel.findById(req.params.authorId)
        res.send(authorId)
    } catch (error) {
        next(error)
    }
})
authorRouter.put("/:authorId", async(req, res, next)=> {
    try {
        const updateAuthor = await AuthorsModel.findByIdAndUpdate(req.params.authorId, req.body, {new:true})
        res.send(updateAuthor)
    } catch (error) {
        next(error)
    }
})
authorRouter.delete("/:authorId", async(req, res, next)=> {
    try {
        await AuthorsModel.findByIdAndDelete(req.params.authorId)
        res.send()
    } catch (error) {
        next(error)
    }
})


export default authorRouter