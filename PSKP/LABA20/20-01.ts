import express, {ErrorRequestHandler, Response, Request, NextFunction} from 'express';
import { engine } from 'express-handlebars';
import {GetRouter as AuthorRoute} from "./routes/AuthorsRoute.js"
import {getBookRouter as BookRouter} from "./routes/BookRouter"
import { getController as CategoriesRouter} from "./routes/CategoriesRoute"
import { getController as DistributerRouter} from "./routes/DistributersRoute"
import { getController as InventoryRouter} from "./routes/InventoryRoute"
import {PrismaClient} from "@prisma/client";
import bodyParser from "body-parser"
import methodOverride from 'method-override';
import {Error} from "sequelize";
import 'express-async-errors';


const app = express();
const prisma = new PrismaClient();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.use("/authors/",AuthorRoute(prisma));
app.use("/books/",BookRouter(prisma))
app.use("/categories",CategoriesRouter(prisma))
app.use("/distributors/",DistributerRouter(prisma))
app.use("/inventory/",InventoryRouter(prisma))
/*function errorHandler (err:Error, req:Request, res:Response, next:NextFunction) {
    res.status(500)
    res.json(err);
}
app.use(errorHandler);*/


app.listen(3000,()=>{
    console.log("Server running")
});