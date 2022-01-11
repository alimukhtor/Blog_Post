import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'

const server = express()
const port = process.env.PORT || 3001

// ************************************* MIDDLEWARES *****************************






// *************************************** ROUTES ********************************








// ************************************** DB CONNECTIONS **********************************

mongoose.connect("mongodb+srv://alimukhtor:alimukhtor@cluster0.9wscl.mongodb.net/striveBlogDb?retryWrites=true&w=majority")
mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo!")
  
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })




