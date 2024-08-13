import express from 'express';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import cors from 'cors';
import router from './routes';
import { keys } from './config/keys';
import connectDB from './utils/db';
import session from 'express-session';
import passport from 'passport';
import './routes/api/googleAuth';
const { port, origin } = keys;
const app = express();

// Set up session middleware
app.use(
  session({
    secret: 'express',
    resave: false,
    saveUninitialized: true,
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: origin,
    // origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);

connectDB(); // DB SETUP
app.use(router);
app.listen(port, () => {
  console.log(
    `${chalk.green(`✓`)} ${chalk.blue(`Server is running on http://localhost:${port}`)}`,
  );
});
