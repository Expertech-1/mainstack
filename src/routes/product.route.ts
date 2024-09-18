import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import requiresRole from '../middlewares/role.middleware';
import { permissions } from "../utils/roles.utils"; // Adjust the path as necessary


const router = Router();

router.post('/createProduct', ProductController.createProduct);  
router.get('/getAllproducts', ProductController.getAllProducts);
router.get('/getProduct/:productId', ProductController.getProduct);
router.get('/searchProducts', ProductController.searchProducts);
router.delete('/deleteProduct/:productId', ProductController.deleteProduct);
router.put('/updateProduct/:productId', ProductController.updateProduct);

export default router;
