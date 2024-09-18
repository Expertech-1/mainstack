import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { createProductSchema, updateProductSchema, searchProductSchema, deleteProductSchema } from '../schema/product.schema';

class ProductController {

  static async createProduct(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id; 
      const validatedData = createProductSchema.parse(req.body);
      const product = await ProductService.createProduct(validatedData, userId);
      res.status(201).json({ message: "Product created successfully", product })
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getProduct(req: Request, res: Response) {
    try {
      const productId = req.params.productId;
      console.log(productId);
      const product = await ProductService.getProduct(productId);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params
      const validatedData = updateProductSchema.parse(req.body) 
      const updatedProduct = await ProductService.updateProduct(productId, validatedData);
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async searchProducts(req: Request, res: Response) {
    try {
      const validatedData = searchProductSchema.parse({
        query: req.query,
      });
      const { name, minPrice, maxPrice } = validatedData.query;
      const products = await ProductService.searchProducts({ name, minPrice, maxPrice });
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const { productId } = deleteProductSchema.parse({
        params: req.params,
      }).params;
     const deletedProduct = await ProductService.deleteProduct(productId);
     console.log(deletedProduct)
      return res.status(200).json(deletedProduct);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export default ProductController;
