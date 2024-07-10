import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//model && helpers
import { User } from '../models/user';
import { keys } from '../config/keys';

const { secret, tokenLife } = keys.jwt;

//REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'That email address is already in use.' });
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    const registeredUser = await user.save();
    const payload = {
      id: registeredUser.id,
    };
    const token = jwt.sign(payload, secret as string, {
      expiresIn: tokenLife,
    });

    res.status(200).json({
      success: true,
      // token: `Bearer ${token}`,
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
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'You must enter an email.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ error: 'No user found for this email address.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Password Incorrect',
      });
    }
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, secret as string, { expiresIn: tokenLife });
    if (!token) {
      throw new Error();
    }
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
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
    console.log(error);
  }
};
