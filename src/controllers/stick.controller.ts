import { Response } from 'express';

//model && helpers
import { Stick } from '../models/stick';
import { CustomRequest } from '../middleware/verifyToken';

//CREATE STICK 📜
export const createSticWall = async (req: CustomRequest, res: Response) => {
  try {
    const { title, desc } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'You must enter a title.' });
    }
    if (!desc) {
      return res.status(400).json({ error: 'You must enter a description.' });
    }
    const newStick = new Stick({
      title,
      desc,
      user_id: req.userId,
    });
    await newStick.save();
    const sticks = await Stick.find({ user_id: req.userId });
    res.status(200).json({
      success: true,
      sticks,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

// GET ALL STICKS
export const getSticks = async (req: CustomRequest, res: Response) => {
  try {
    const sticks = await Stick.find({ user_id: req.userId });
    res.status(200).json({
      success: true,
      sticks,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};
//UPDATE STICK BASED ON THE STICK ID
export const updateStick = async (req: CustomRequest, res: Response) => {
  try {
    const stickId = req.params.stickId;
    const changes = req.body;
    const stick = await Stick.findById(stickId);
    if (!stick) {
      return res.status(404).json({ error: 'There is no stick with this id' });
    }
    const updated = await Stick.findByIdAndUpdate(
      stickId,
      { ...changes },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: 'Stick updated',
      stick: updated,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

//DELETE STICK BASED ON THE STICK ID
export const deleteStick = async (req: CustomRequest, res: Response) => {
  try {
    const stickId = req.params.stickId;
    const stick = await Stick.findById(stickId);
    if (!stick) {
      return res.status(404).json({ error: 'There is no stick with this id' });
    }
    await Stick.findByIdAndDelete(stickId);
    res.status(200).json({
      success: true,
      message: 'The selected stick is removed',
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};
