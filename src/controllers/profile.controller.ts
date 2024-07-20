import { Response } from 'express';
import { User } from '../models/user';
import { CustomRequest } from '../middleware/verifyToken';
// GET USER DATA
export const getUserData = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const userData = await User.findById(userId).select('-password');
    if (!userData) {
      res.status(400).json({ error: 'No user found' });
    }

    res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    res.status(400).json({
      error:
        'Your request for geting user data could not be processed. Please try again.',
    });
  }
};

export const updateUserData = async (req: CustomRequest, res: Response) => {
  try {
    const changes = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({
        error: 'User not found',
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...changes,
      },
      { new: true },
    ).select('-password');
    res.status(200).json({
      success: true,
      message: 'User updated',
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      error:
        'Your request for update user data could not be processed. Please try again.',
    });
  }
};
