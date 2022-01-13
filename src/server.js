import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import cors from 'cors'
import { notFoundError, badRequestError, genericServerError } from './services/errorHandlers.js'
const server = express()
const port = process.env.PORT || 3001

import blogRouter from '../src/services/blogs/blog.js'
import authorRouter from './services/authors/index.js'

// ************************************* MIDDLEWARES *****************************

server.use(cors())
server.use(express.json())


// *************************************** ROUTES ********************************

server.use("/blogs", blogRouter)
server.use("/authors", authorRouter)
// ****************************** ERROR HANDLERS **************************

server.use(notFoundError)
server.use(badRequestError)
server.use(genericServerError)


// ************************************** DB CONNECTIONS **********************************


mongoose.connect("mongodb+srv://alimukhtor:alimukhtor@cluster0.9wscl.mongodb.net/striveBlog?retryWrites=true&w=majority")
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
  
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })




