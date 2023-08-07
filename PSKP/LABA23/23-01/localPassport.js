import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUser } from '../service/userService.js';
passport.use(new Strategy((login, password, done) => {
    const user = getUser(login);
    if (user && user.password === password) {
        return done(null, login);
    }
    return done(null, false, { message: 'Incorrect login or password.' });
}));
passport.serializeUser((login, done) => {
    done(null, login);
});
passport.deserializeUser((login, done) => {
    done(null, login);
});
export default passport;
//# sourceMappingURL=localPassport.js.map