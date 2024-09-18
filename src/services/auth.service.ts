import { User, IUser, UStatus, UType } from '../models/user.model';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import bcrypt from 'bcryptjs';

interface TUser {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    password: string | undefined;
    confirmPassword: string;
    userType: UType;
    status: UStatus;
  }
  

class AuthService {
  static async register(userDetails: Partial<TUser>): Promise<any> {
    const { firstName, lastName, email, mobileNumber, password, confirmPassword } = userDetails;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists with this email.');
    const hashedPassword = await bcrypt.hash(password as string, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
      userType: UType.User,
      status: UStatus.Active
    });

     const accessToken = signJwt({ id: user._id, userType: user.userType }, { expiresIn: '1h' });
     await user.save();
     return {message: "User created sucessfully", token: {accessToken}};
  }

  static async signin( userDetails: { email: string; password: string }): Promise<any> {
    const { email, password } = userDetails;
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) throw new Error('Invalid email or password');

    const accessToken = signJwt({ id: existingUser._id, userType: existingUser.userType }, { expiresIn: '1h' });
    const refreshToken = signJwt({ id: existingUser._id, userType: existingUser.userType }, { expiresIn: '7d' });

     return {
        msg: "User signed in successfully",
        refreshToken: {
          refreshToken
        },
        accessToken: {
          accessToken,
        },
        user: {
          id: existingUser._id,
          email: existingUser.email,
          userType: existingUser.userType,
          status: existingUser.status,
        },
      };
  }

  static async refreshToken(token: string): Promise<string> {
    if (!token)  throw new Error('Refresh token not found.' );
    const decoded: any = verifyJwt(token);
    // console.log(decoded);

    if (decoded.valid === false) throw new Error('Invalid refresh token.');
    const user = await User.findById(decoded.decoded.id);

    if (!user) throw new Error('Invalid refresh token.');
    const newAccessToken = signJwt({ id: user._id, user_type: user.userType }, { expiresIn: '1h' });
    return newAccessToken;
  }




  static async updateUser(userId: string, updateDetails: Partial<IUser>, typeChgn?: string): Promise<any | null> {
    if (typeChgn === "password") {
      const { password } = updateDetails;
      const hashedPassword = await bcrypt.hash(password as string, 10);
      const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
      if (user) {
        return { msg: "Account Updated Successfully" };
      } else {
        return { msg: "Account Updated Error" };
      }
    }
    const user = await User.findByIdAndUpdate(userId, updateDetails, { new: true });
    if (user) {
      return { msg: "Account Updated Successfully" };
    } else {
      return { msg: "Account Updated Error" };
    }
  }
}

export default AuthService;
