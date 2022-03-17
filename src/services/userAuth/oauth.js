import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import GitHubStrategy from 'passport-github'
import FacebookStrategy from 'passport-facebook'
import {JWTAuthenticate} from '../userAuth/tools.js'
import AuthorsModel from '../authors/schema.js'


export const facebookStrategy = new FacebookStrategy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret:process.env.FACEBOOK_SECRET_KEY,
    callbackURL: `${process.env.CALLBACK_URL}/authors/facebookRedirect`
},
    async(accessToken, refreshToken, profile, passportNext)=> {
        try {
            console.log("FaceBook:", profile);
            const author = await AuthorsModel.findOne({facebookId:profile.id})
            if(author){
                const token = await JWTAuthenticate(author)
                passportNext(null, {token})
            }else{
                const newUser = new AuthorsModel({
                    full_name: profile.displayName,
                    githubId: profile.id,
                })
                
                // const savedUser = await newUser.save()
                const token = await JWTAuthenticate(newUser)
                console.log(token);
                passportNext(null, { token })
            }
        } catch (error) {
            console.log(error)
        }
    }

)


///////// LOG IN ITH GITHUB///////////////
export const gitHubStrategy = new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_SECRET_KEY,
    callbackURL: `${process.env.CALLBACK_URL}/authors/githubRedirect`
},
    async(accessToken, refreshToken, profile, passportNext)=> {
        try {
            console.log("Github:", profile);
            const author = await AuthorsModel.findOne({githubId:profile.id})
            if(author){
                console.log("passport.initialize()")
                const token = await JWTAuthenticate(author)
                passportNext(null, {token})
            }else{
                const newUser = new AuthorsModel({
                    full_name: profile.displayName,
                    githubId: profile.id,
                })
                
                // const savedUser = await newUser.save()
                const token = await JWTAuthenticate(newUser)
                console.log(token);
                passportNext(null, { token })
            }
        } catch (error) {
            console.log(error)
        }
    }

)

////////// LOG IN WITH GOOGLE ACCOUNT ///////////////
export const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/authors/googleRedirect`,
},

    async(accessToken, refreshToken, profile, passportNext)=> {
        try {
            console.log("Profile: ", profile);

            const author = await AuthorsModel.findOne({googleId:profile.id})
            if(author){
                console.log("passport.initialize()")
                const token = await JWTAuthenticate(author)
                passportNext(null, {token})
            }else{
                const newUser = new AuthorsModel({
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                })
                
                console.log("as", newUser);
                // const savedUser = await newUser.save()
                // console.log("as", newUser);
                const token = await JWTAuthenticate(newUser)
                console.log(token);
                passportNext(null, { token })
            }
        } catch (error) {
            // passportNext(error)
        }
    }
)

passport.serializeUser(function (data, passportNext) {
    passportNext(null, data)
  })

  