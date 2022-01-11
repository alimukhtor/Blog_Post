import express from 'express'
import BlogsModel from '../schema.js'

const blogRouter = express.Router()

blogRouter.post("/", async(req, res, next)=> {
    try {
        const blogs = new BlogsModel(req.body)
        const { _id } = await blogs.save() 
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})
blogRouter.get("/", async(req, res, next)=> {
    try {
        const blogs = await BlogsModel.find()
        res.send(blogs)
    } catch (error) {
        next(error)
    }
})
blogRouter.get("/:blogId", async(req, res, next)=> {
    try {
        const blogId = await BlogsModel.findById(req.params.blogId)
        res.send(blogId)
    } catch (error) {
        next(createHttpError(404, `User with id ${blogId} not found!`))
    }
})
blogRouter.put("/:blogId", async(req, res, next)=> {
    try {
        const blogId = req.params.blogId
        const updateBlog = await BlogsModel.findByIdAndUpdate(blogId, req.body, {new:true})
        res.send(updateBlog)
    } catch (error) {
        next(createHttpError(404, `User with id ${blogId} not found!`))
    }
})
blogRouter.delete("/:blogId", async(req, res, next)=> {
    try {
        const blogId = req.params.blogId
        const deleteBlog = await BlogsModel.findByIdAndDelete(blogId)
        res.send()
    } catch (error) {
        next(createHttpError(404, `User with id ${blogId} not found!`))
    }
})


export default blogRouter