"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getController = void 0;
const express_1 = __importDefault(require("express"));
const InventoryController_1 = __importDefault(require("../Controllers/InventoryController"));
function getController(prisma) {
    const controller = new InventoryController_1.default(prisma);
    const router = express_1.default.Router();
    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.post('/:id', controller.update);
    router.delete('/:id', controller.delete);
    return router;
}
exports.getController = getController;
//# sourceMappingURL=InventoryRoute.js.map