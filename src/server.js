import express from 'express'
import listEndpoint from 'express-list-endpoints'
import mongoose from 'mongoose'

const server = express()
const port = process.env.PORT || 3001













server.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})