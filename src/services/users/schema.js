import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const {Schema, model} = mongoose


const userSchema = new Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, enum:["Admin", "User"], default:"User"}
}, {timestamps:true})

export default model("User", userSchema)