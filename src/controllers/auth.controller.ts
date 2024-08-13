import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//model && helpers
import { keys } from '../config/keys';
import { User } from '../models/user';
import { generatOtp } from '../utils/generateOtp';
import { sendOTP } from '../utils/sendOtp';

const { secret, tokenLife } = keys.jwt;

//REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, googleId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }
    let user;
    if (googleId) {
      // Google Authentication
      user = new User({
        email,
        firstName,
        lastName,
        googleId,
        authMethod: 'google',
      });
    } else {
      // Manual Registration
      if (!password) {
        return res.status(400).json({
          error: 'Password is required',
        });
      }
      user = new User({
        email,
        password,
        firstName,
        lastName,
        authMethod: 'local',
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
    }

    const registeredUser = await user.save();
    const payload = {
      id: registeredUser._id,
      name: `${user.firstName} ${user.lastName}`,
    };
    const token = jwt.sign(payload, secret as string, {
      expiresIn: tokenLife,
    });
    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        secure: false,
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 3600,
        path: '/',
      }),
    );
    res.status(200).json({
      success: true,
      token: `${token}`,
      user: registeredUser,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
    console.log(error);
  }
};

//LOGIN USER
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, googleId } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'You must enter an email.' });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: 'No user found for this email address' });
    }
    let isAuthenticated = false;
    if (googleId) {
      if (user.googleId === googleId) {
        isAuthenticated = true;
      } else {
        return res.status(400).json({
          success: false,
          error: 'Google authentication failed',
        });
      }
    } else {
      if (!password) {
        return res.status(400).json({ error: 'You must enter a password' });
      }
      if (user.authMethod === 'google') {
        return res.status(400).json({
          success: false,
          error:
            'This account uses Google authentication.Please sign in with Google',
        });
      }
      isAuthenticated = await bcrypt.compare(password, user.password as string);
      if (!isAuthenticated) {
        return res.status(400).json({
          success: false,
          error: 'Password Incorrect',
        });
      }
    }
    if (isAuthenticated) {
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, secret as string, {
        expiresIn: tokenLife,
      });
      if (!token) {
        throw new Error();
      }
      res.setHeader(
        'Set-Cookie',
        serialize('token', token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === 'production',
          secure: false,
          // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          maxAge: 3600,
          path: '/',
        }),
      );
      res.status(200).json({
        success: true,
        token: `${token}`,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Authentication failed',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};
//
export const accessToDashboard = (req: Request, res: Response) => {
  res.status(200).json({ status: true });
};

// LOGOUT USER
export const logoutUser = async (req: Request, res: Response) => {
  try {
    // Clear the token cookie
    res.setHeader(
      'Set-Cookie',
      serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        expires: new Date(0),
        path: '/',
      }),
    );

    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
    console.error(error);
  }
};
// SEND OTP TO THE USER GIVEN EMIAL
const otpStore: any = {};

export const GetOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exist' });
    }
    const otp = generatOtp();
    otpStore[email] = otp;
    sendOTP(email, otp);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({
      error: 'Your request for otp could not be processed. Please try again.',
    });
  }
};

export const VerifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req.body;
    if (!otp) {
      return res.status(400).json({ error: 'Otp is required' });
    }
    if (Number(otpStore[email] === Number(otp))) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Invalid otp' });
    }
  } catch (error) {
    res.status(400).json({
      error:
        'Your request for verify otp could not be processed. Please try again.',
    });
  }
};
