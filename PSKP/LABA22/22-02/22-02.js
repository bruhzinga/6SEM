import express from 'express';
import bodyParser from "body-parser";
import Session from 'express-session';
import passport from "./DigestPassport.js";
const app = express();
const session = Session({
    resave: false,
    saveUninitialized: false,
    secret: '123456789'
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    console.log(req.method, decodeURI(req.url));
    next();
});
app.get('/login', passport.authenticate('digest', { session: true }), (req, res) => {
    req.session.authenticated = true;
    res.send('Login success');
});
app.get('/logout', (req, res) => {
    req.session.authenticated = false;
    res.send('Logout success');
});
app.get('/resource', (req, res, next) => {
    if (req.session.authenticated) {
        next();
    }
    else {
        res.status(401).send('Unauthorized');
    }
}, (req, res) => {
    res.send('Resource');
});
app.use((req, res, next) => {
    res.status(404).send('Not found');
});
app.listen(3000, () => {
    console.log(`Server started at http://localhost:3000`);
});
//# sourceMappingURL=22-02.js.map