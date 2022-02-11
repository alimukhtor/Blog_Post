import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import {JWTAuthenticate} from '../userAuth/tools.js'
import AuthorsModel from '../authors/schema.js'

console.log(process.env.JWT_CLIENT_ID);
const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/authors/googleRedirect`,
},

    async(accessToken, profile, passportNext)=> {
        try {
            console.log("Profile: ", profile);
            const author = await AuthorsModel.findOne({googleId:profile.id})
            if(author){
                const token = await JWTAuthenticate(author)
                passportNext(null, {token})
            }else{
                // const newUser = new AuthorsModel({
                //     name: profile.name.givenName,
                //     surname: profile.name.familyName,
                //     email: profile.emails[0].value,
                //     googleId: profile.id,
                //   })
          
                //   const savedUser = await newUser.save()
                //   const tokens = await JWTAuthenticate(savedUser)
                //   passportNext(null, { tokens })
            }
        } catch (error) {
            passportNext(error)
        }
    }
)

passport.serializeUser(function (data, passportNext) {
    passportNext(null, data)
  })

  
export default googleStrategy