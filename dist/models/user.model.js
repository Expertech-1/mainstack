"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UStatus = exports.UType = void 0;
const mongoose_1 = require("mongoose");
var UType;
(function (UType) {
    UType["Admin"] = "admin";
    UType["Sales"] = "salesRep";
    UType["User"] = "user";
})(UType || (exports.UType = UType = {}));
var UStatus;
(function (UStatus) {
    UStatus["Active"] = "active";
    UStatus["Suspended"] = "suspended";
    UStatus["Inactive"] = "inactive";
})(UStatus || (exports.UStatus = UStatus = {}));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, default: "" },
    password: { type: String, required: true },
    userType: { type: String, enum: UType, default: UType.User },
    status: { type: String, enum: UStatus, default: UStatus.Active }
});
userSchema.index({ email: 1 }, { unique: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
