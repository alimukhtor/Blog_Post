import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const {Schema, model} = mongoose


const userSchema = new Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, enum:["Admin", "User"], default:"User"}
}, {timestamps:true})


userSchema.pre("save", async function(next){
    const newUser = this
    const plainPassword = newUser.password
        const hashPW = await bcrypt.hash(plainPassword, 10)
        newUser.password = hashPW
        // console.log("Pasword:", hashPW);
    next()
})


export default model("User", userSchema)