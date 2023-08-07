import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from "body-parser"
import {Request,Response} from "express";
import Controller from "./Controllers/MainController.js";



const app = express();

app.engine('hbs', engine({ extname: 'hbs' ,helpers:{
    cancel:()=>{
        return " <form action=\"/\" method=\"get\">\n" +
            "        <input type=\"submit\" value=\"Отказаться\">\n" +
            "    </form>"
    }
    }}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use("/static",express.static("public"))

app.use((req:Request, res:Response, next)=>{
    console.log(req.method, decodeURI(req.url));
    next();
})

app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",Controller.Get);
app.get("/Add",Controller.GetAdd);
app.get("/Update",Controller.GetUpdate);
app.post("/Add",Controller.PostAdd);
app.post("/Update",Controller.PostUpdate);
app.post("/Delete",Controller.PostDelete);





app.listen(3000,()=>{
    console.log("Server running")
});