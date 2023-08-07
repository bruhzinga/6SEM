"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const AuthorsRoute_js_1 = require("./routes/AuthorsRoute.js");
const BookRouter_1 = require("./routes/BookRouter");
const CategoriesRoute_1 = require("./routes/CategoriesRoute");
const DistributersRoute_1 = require("./routes/DistributersRoute");
const InventoryRoute_1 = require("./routes/InventoryRoute");
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
require("express-async-errors");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.engine('handlebars', (0, express_handlebars_1.engine)());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(body_parser_1.default.json()); //utilizes the body-parser package
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, method_override_1.default)('_method'));
app.use("/authors/", (0, AuthorsRoute_js_1.GetRouter)(prisma));
app.use("/books/", (0, BookRouter_1.getBookRouter)(prisma));
app.use("/categories", (0, CategoriesRoute_1.getController)(prisma));
app.use("/distributors/", (0, DistributersRoute_1.getController)(prisma));
app.use("/inventory/", (0, InventoryRoute_1.getController)(prisma));
/*function errorHandler (err:Error, req:Request, res:Response, next:NextFunction) {
    res.status(500)
    res.json(err);
}
app.use(errorHandler);*/
app.listen(3000, () => {
    console.log("Server running");
});
//# sourceMappingURL=20-01.js.map