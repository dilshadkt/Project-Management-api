import express from 'express';
import { parseResponse } from '../../utils/parseToJson';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

router.post('/generate-todo', async (req, res) => {
  try {
    const { plans } = req.body;

    // Use Gemini AI to generate the structured todo list
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate a concise to-do list based on these daily plans: ${plans}
          Format the output as a list of tasks. Each task should have a heading (task title) followed by a colon and then a brief description and the description is must , dont create empty field.
          Example format:
          1. Task Title: Brief description of the task
          2. Another Task: Another brief description
          ...`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const todoListString = response.text();

    // Parse the response
    const todoList = parseResponse(todoListString);

    res.json({ todoList });
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while generating the todo list' });
  }
});

export default router;
