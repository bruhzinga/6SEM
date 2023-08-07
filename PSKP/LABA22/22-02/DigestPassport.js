import passport from 'passport';
import { DigestStrategy } from 'passport-http';
import { getUser } from '../service/userService.js';
passport.use(new DigestStrategy({ qop: 'auth' }, (login, done) => {
    const user = getUser(login);
    if (user) {
        return done(null, login, user.password);
    }
    return done(null, false);
}, (params, done) => {
    done(null, true);
}));
passport.serializeUser((login, done) => {
    done(null, login);
});
passport.deserializeUser((login, done) => {
    done(null, login);
});
export default passport;
//# sourceMappingURL=DigestPassport.js.map