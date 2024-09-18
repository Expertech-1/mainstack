import { Schema, model, Document } from 'mongoose';

export enum UType {
    Admin = 'admin',
    Sales = 'salesRep',
    User = 'user'
}

export enum UStatus {
    Active = 'active',
    Suspended = 'suspended',
    Inactive = 'inactive'
}

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  userType: UType;
  status: UStatus;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, default: "" },
  password: { type: String, required: true },
  userType: { type: String, enum: UType,  default: UType.User},
  status: { type: String, enum: UStatus, default: UStatus.Active}
});

userSchema.index({ email: 1 }, { unique: true });
const User = model<IUser>('User', userSchema);

export { User, IUser };
