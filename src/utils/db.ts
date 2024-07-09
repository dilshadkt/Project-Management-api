import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import chalk from 'chalk';
import { keys } from '../config/keys';

const { database } = keys;

const connectDB = async () => {
  try {
    await mongoose.connect(database.url as string);
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
