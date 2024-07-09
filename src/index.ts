import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import router from './routes';
import { keys } from './config/keys';
import connectDB from './utils/db';

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connectDB(); // DB SETUP
app.use(router);
app.listen(port, () => {
  console.log(
    `${chalk.green(`✓`)} ${chalk.blue(`Server is running on http://localhost:${port}`)}`,
  );
});
