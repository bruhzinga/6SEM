import passport from 'passport';
import {Strategy} from 'passport-google-oauth20'



passport.use(new Strategy({
    clientID: "ID",
    clientSecret: "SECRET",
    callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));

passport.serializeUser((user, done) =>{
done(null, user);
});

passport.deserializeUser((user:any, done:any) =>{
done(null, user);
});



export default passport;
