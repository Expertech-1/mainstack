import { Schema, model, Document, Types } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  createdAt: { type: Date, default: Date.now },
});
export type ProductDocument = Document<unknown, {}, IProduct> & IProduct;

const Product = model<IProduct>('Product', productSchema);

export { Product, IProduct };

