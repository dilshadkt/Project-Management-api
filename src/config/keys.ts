import dotenv from 'dotenv';
dotenv.config();

export const keys = {
  app: {
    name: 'Project management',
    apiUrl: `${process.env.API_URL}`,
    clientUrl: `${process.env.CLIENT_URL}`,
  },
  origin: process.env.CLIENT_URL,
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: '7d',
  },
};
