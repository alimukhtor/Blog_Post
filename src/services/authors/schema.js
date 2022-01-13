import mongoose from 'mongoose'
const {Schema, model} = mongoose

const AuthorSchema = new Schema({
    first_name:{type:String, require:true},
    last_name:{type:String, require:true}
   
},{timestamps:true})

export default model("Authors", AuthorSchema)