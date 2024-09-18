import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import  authorizeUser  from '../middlewares/auth.middleware';

const router = Router();

router.post("/register", AuthController.register);
router.get("/refreshToken", authorizeUser, AuthController.refreshToken);
router.post('/signin', AuthController.signin);
router.get('/signout', authorizeUser, AuthController.signout);
router.put('/updateUser', authorizeUser, AuthController.updateUser);

export default router;
