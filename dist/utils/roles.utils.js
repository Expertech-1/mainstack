"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = exports.Role = void 0;
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["User"] = "user";
    Role["Sales"] = "salesRep";
})(Role || (exports.Role = Role = {}));
exports.permissions = {
    createProduct: [Role.Admin, Role.Sales],
    updateProduct: [Role.Admin],
    getProduct: [Role.Admin, Role.User, Role.Sales],
    deleteProduct: [Role.Admin, Role.User],
    createPost: [Role.Admin],
    updatePost: [Role.Admin],
    getPost: [Role.Admin, Role.User],
    deletePost: [Role.Admin],
};
