import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import cors from 'cors'

const server = express()
const port = process.env.PORT || 3001

import blogRouter from '../src/services/blogs/blog.js'

// ************************************* MIDDLEWARES *****************************

server.use(cors())
server.use(express.json())


// *************************************** ROUTES ********************************

server.use("/blogs", blogRouter)



// ************************************** DB CONNECTIONS **********************************


mongoose.connect("mongodb+srv://alimukhtor:alimukhtor@cluster0.9wscl.mongodb.net/striveBlog?retryWrites=true&w=majority")
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
  
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })




