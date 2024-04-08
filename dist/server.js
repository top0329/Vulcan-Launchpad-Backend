"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const moralis_1 = __importDefault(require("moralis"));
const user_1 = __importDefault(require("./routes/api/user"));
const dbConnect_1 = __importDefault(require("./lib/dbConnect"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 5050;
const path = require("path");
(0, dbConnect_1.default)();
app.set("trust proxy", true);
app.use((0, cors_1.default)("*"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use("/static", express.static(__dirname + "/public"));
app.use("/api/user", user_1.default);
// 
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield moralis_1.default.start({
                apiKey: process.env.MORALIS_API_KEY,
            });
            console.log("moralis start....");
            app.listen(port, () => {
                console.log(`Server is listening on ${port}`);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
startServer();
//# sourceMappingURL=server.js.map