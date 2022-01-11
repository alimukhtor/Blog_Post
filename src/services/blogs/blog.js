import express from 'express'
import BlogsModel from '../schema.js'

const blogRouter = express.Router()

blogRouter.post("/", async(req, res, next)=> {
    try {
        const blogs = new BlogsModel(req.body)
        console.log("Body:",req.body);
        const { _id } = await blogs.save() 
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})
blogRouter.get("/", async(req, res, next)=> {})
blogRouter.get("/:blogId", async(req, res, next)=> {})
blogRouter.put("/:blogId", async(req, res, next)=> {})
blogRouter.delete("/:blogId", async(req, res, next)=> {})


export default blogRouter