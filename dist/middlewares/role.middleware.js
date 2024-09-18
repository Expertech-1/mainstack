"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requiresRole = (requiredPermissions) => async (req, res, next) => {
    try {
        const user = res.locals.user;
        if (!user) {
            return res.status(403).json({ message: "You are not signed in." });
        }
        const userRoles = user.roles || [];
        const hasRequiredRole = userRoles.some((role) => requiredPermissions.includes(role));
        if (!hasRequiredRole) {
            return res.status(403).json({ message: "You do not have the required permissions." });
        }
        return next();
    }
    catch (err) {
        next(err);
    }
};
exports.default = requiresRole;
