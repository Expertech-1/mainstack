import { Product, IProduct } from '../models/product.model';
import { Types } from 'mongoose'; 

class ProductService {
  static async createProduct(productDetails: Partial<IProduct>, userId: string): Promise<IProduct> {
      const product = new Product({
        ...productDetails,
        createdBy:  new Types.ObjectId(userId),
      });
      const savedProduct = await product.save();
      return savedProduct;
  }

  static async getAllProducts(): Promise<IProduct[]> {
    const products = await Product.find().populate('createdBy', 'email');
    return products;
  }

  static async getProduct(productId: string ): Promise<IProduct> {
    const product = await Product.findById(productId).populate('createdBy');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  static async updateProduct(productId: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  static async searchProducts(query: any) {
    const searchQuery: any = {};
    
    if (query.name) {
      searchQuery.name = { $regex: query.name, $options: 'i' }; 
    }
    
    if (query.minPrice && query.maxPrice) {
      searchQuery.price = { $gte: query.minPrice, $lte: query.maxPrice };
    } else if (query.minPrice) {
      searchQuery.price = { $gte: query.minPrice };
    } else if (query.maxPrice) {
      searchQuery.price = { $lte: query.maxPrice };
    }

    const products = await Product.find(searchQuery).populate('createdBy', 'email');
    return products;
  }

  static async deleteProduct(productId: string) {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return { message: "Product deleted successfully" };
  }

}

export default ProductService;
