import express from 'express';
import bodyParser from "body-parser";
import Session from 'express-session';
import passport from "./localPassport.js";
import * as fs from "fs";
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
app.get('/login', (req, res) => {
    const rs = fs.createReadStream('login.html');
    rs.pipe(res);
});
app.post('/login', passport.authenticate('local', { session: true, successRedirect: '/resource' }), (req, res) => {
});
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.send('Logout success');
});
app.get('/resource', (req, res, next) => {
    if (req.user) {
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
//# sourceMappingURL=23-01.js.map