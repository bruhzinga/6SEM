import express from 'express';
import bodyParser from "body-parser";
import Session from 'express-session';
import passport from "./OAUTHPassport.js";
import * as fs from "fs";
const app = express();
const session = Session({
    resave: false,
    saveUninitialized: false,
    secret: '123456789' //This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or an array of multiple secrets
});
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    console.log(req.method, decodeURI(req.url));
    next();
});
app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/login', (req, res) => {
    fs.createReadStream('login.html').pipe(res);
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/resource');
});
app.get('/resource', (req, res) => {
    if (req.user) {
        console.log(req.user);
        // @ts-ignore
        res.status(200).send("Hello, " + req.user.displayName + "!");
    }
    else {
        res.redirect('/login');
    }
});
app.get('/logout', (req, res) => {
    req.logout(() => {
        console.log("Logout");
    });
    res.redirect('/login');
});
app.listen(3000, () => {
    console.log("Server running");
});
//# sourceMappingURL=24-01.js.map