import mongoose from 'mongoose'
const { Schema, model } = mongoose

const LikesSchema = new Schema({
    isliked:{type:Boolean, required:false},
    authors:[{type:Schema.Types.ObjectId, ref:"Authors"}]
})

export default model("Like", LikesSchema)