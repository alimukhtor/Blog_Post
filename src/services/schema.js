import mongoose from 'mongoose'

import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
    category:{type:String, required:true},
    title:{type:String, required:true},
    cover:{type:String, required:true},
    readTime:{
        value:{type:Number},
        unit:{type:minute}
    },
    author:{
        name:{type:String},
        avatar:{type:String}
    },
    content:{type:HTML}
},
{
    timestamps:true
})

export default model("Blog", blogSchema)