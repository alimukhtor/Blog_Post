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

blogRouter.post("/:blogId/comments", async(req, res, next)=> {
    try {
        const getBlogId = await BlogsModel.findById(req.params.blogId, {_id:0})
        // console.log("BLogId:", getBlogId.toObject());
        if(getBlogId){
            const postComment = { ...getBlogId.toObject(), commentedDate: new Date()} 
            console.log("Poste comment:", postComment);
            const modifyBlog = await BlogsModel.findByIdAndUpdate(req.params.blogId, {$push:{comments:postComment}}, {new:true})
            if(modifyBlog){
                res.send(modifyBlog)
            }else{
                next(createHttpError(404, `User with id ${blogId} not found!`))
            }
        }
    } catch (error) {
        next(error)
    }
})
blogRouter.get("/:blogId/comments", async(req, res, next)=> {
    try {
        const blogs = await BlogsModel.findById(req.params.blogId)
        if(blogs){
            res.send(blogs.comments)
        }else{
            next(createHttpError(404, `User with id ${blogId} not found!`))
        }
    } catch (error) {
        next(error)
    }
})
blogRouter.get("/:blogId/comments/:commentId", async(req, res, next)=> {})
blogRouter.put("/:blogId/comments/:coommentId", async(req, res, next)=> {})
blogRouter.delete("/:blogId/comments/:coommentId", async(req, res, next)=> {})


export default blogRouter