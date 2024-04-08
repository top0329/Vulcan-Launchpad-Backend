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
const moralis_1 = __importDefault(require("moralis"));
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/request-message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, chain } = req.body;
    try {
        const message = yield moralis_1.default.Auth.requestMessage(Object.assign({ address: String(address), chain: 1 }, config_1.default.moralis));
        res.status(200).json(message);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
        console.error(error);
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, signature } = req.body;
        const { address, profileId } = (yield moralis_1.default.Auth.verify({
            message,
            signature,
            networkType: 'evm',
        })).raw;
        const _user = yield User_1.default.findOne({ wallet: address });
        if (_user) {
            const token = yield jsonwebtoken_1.default.sign({ data: _user }, config_1.default.jwtSecret, { expiresIn: 60 * 60 * 24 });
            console.log("user signin------>", _user.fullName);
            res.json({ status: "SUCCESS", data: token });
        }
        else {
            res.json({ status: "NONE", data: "Not registered user, Please register!" });
        }
    }
    catch (err) {
        res.status(500).json({ status: "ERR", data: err });
        console.log(err);
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, signature, user } = req.body;
        const { address, profileId } = (yield moralis_1.default.Auth.verify({
            message,
            signature,
            networkType: 'evm',
        })).raw;
        const _user = yield User_1.default.findOne({ wallet: address });
        if (_user) {
            res.json({ status: 'EX', data: "Address already registered" });
        }
        else {
            yield new User_1.default(Object.assign(Object.assign({ wallet: address }, user), { ip: '127.0.0.1' })).save();
            const token = yield jsonwebtoken_1.default.sign({ data: Object.assign(Object.assign({ wallet: address }, user), { ip: '127.0.0.1' }) }, config_1.default.jwtSecret, { expiresIn: 60 * 60 * 24 });
            res.json({ status: "SUCCESS", data: token });
        }
    }
    catch (err) {
        res.status(500).json({ status: "ERR", data: err });
    }
}));
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ data: req.user });
}));
router.put("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findOneAndUpdate({ wallet: req.user.wallet }, Object.assign({}, req.body), {
            new: true,
            upsert: true,
        });
        res.json({ status: "SUCCESS" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map