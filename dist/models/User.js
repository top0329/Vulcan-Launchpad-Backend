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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserDataByUserName = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const UserSchema = new mongoose_1.Schema({
    wallet: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    socialLink: {
        type: String
    },
    bio: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now
    }
    // username: {
    //   type: String,
    //   required: true,
    // },
    // facebook: {
    //   type: String,
    //   required: true,
    // },
    // twitter: {
    //   type: String,
    //   required: true,
    // },
    // instagram: {
    //   type: String,
    //   required: true,
    // },
    // linkedin: {
    //   type: String,
    //   required: true,
    // },
});
UserSchema.methods.encryptPassword = (password) => (0, bcryptjs_1.hashSync)(password, (0, bcryptjs_1.genSaltSync)(10));
const User = (0, mongoose_1.model)("User", UserSchema);
const findUserDataByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.find({
        username: userName,
    });
});
exports.findUserDataByUserName = findUserDataByUserName;
exports.default = User;
//# sourceMappingURL=User.js.map