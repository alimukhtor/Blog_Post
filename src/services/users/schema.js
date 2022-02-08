import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const {Schema, model} = mongoose


const userSchema = new Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, enum:["Admin", "User"], required:true},
    // blogs:[{type:Schema.Types.ObjectId, ref:"Blogs"}]
}, {timestamps:true})


userSchema.pre("save", async function(next){
    const newUser = this
    const plainPassword = newUser.password
        const hashPW = await bcrypt.hash(plainPassword, 10)
        newUser.password = hashPW
        // console.log("Pasword:", hashPW);
        next()
})

userSchema.methods.toJSON = function () {
    const userInfo = this
    const userObject = userInfo.toObject()
    delete userObject.password
    delete userObject.__v
  
    return userObject
  }

userSchema.statics.checkCredentials = async function(email, plainPassword){
    const user = await this.findOne({email})
    if(user){
        const isMatch = await bcrypt.compare(plainPassword, user.password)
        if(isMatch){
            return user
        }else{
            return null
        }
    }else{
        return null
    }
}  

export default model("User", userSchema)