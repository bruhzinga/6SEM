"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRouter = void 0;
const express_1 = __importDefault(require("express"));
const AuthorController_js_1 = __importDefault(require("../Controllers/AuthorController.js"));
function GetRouter(prisma) {
    const controller = new AuthorController_js_1.default(prisma);
    const router = express_1.default.Router();
    router.get("/", controller.Get);
    router.get("/:id", controller.GetById);
    router.post("/", controller.Post);
    router.post("/:id", controller.PostWithID);
    router.delete("/:id", controller.Delete);
    return router;
}
exports.GetRouter = GetRouter;
//# sourceMappingURL=AuthorsRoute.js.map