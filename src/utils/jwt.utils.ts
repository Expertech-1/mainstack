import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET as string;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, secret, {
    ...(options && options),
    algorithm: "HS256", 
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] }); 
    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message = "jwt expired",
      decoded: null,
    };
  }
}
