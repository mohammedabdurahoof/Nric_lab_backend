import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { IUserModel } from '../types';

// By using 'declare global', we can extend the existing Express Request type
// to include our custom 'user' property.
declare global {
  namespace Express {
    interface Request {
      user?: IUserModel; // We use IUserModel because it includes Mongoose document properties
    }
  }
}

// An interface for the decoded token payload
interface DecodedToken {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header ('Bearer TOKEN')
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

      // Find the user by the ID from the token's payload
      // We exclude the password from the user object that gets attached to the request
      const user = await User.findById(decoded.id).select('-password');
      req.user = user ?? undefined;

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // If everything is okay, call the next middleware/controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
