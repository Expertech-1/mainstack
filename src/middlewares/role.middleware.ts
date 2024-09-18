import { Request, Response, NextFunction } from "express";
import { Role } from "../utils/roles.utils"; 

const requiresRole = (requiredPermissions: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    const user = res.locals.user; 
if (!user) {
        return res.status(403).json({ message: "You are not signed in." });
      }

      const userRoles: Role[] = user.roles || [];
      const hasRequiredRole = userRoles.some((role) =>
        requiredPermissions.includes(role)
      );

      if (!hasRequiredRole) {
        return res.status(403).json({ message: "You do not have the required permissions." });
      }

      return next(); 
    } catch (err) {
      next(err); 
    }
  };

export default requiresRole;
