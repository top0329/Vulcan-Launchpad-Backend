"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    jwtSecret: "vulcan-launchpad-secret",
    githubToken: "<yoursecrectaccesstoken>",
    moralis: {
        domain: process.env.APP_DOMAIN,
        statement: 'Please sign this message to confirm your identity.',
        uri: process.env.NEXT_URL,
        timeout: 60,
    }
};
//# sourceMappingURL=index.js.map