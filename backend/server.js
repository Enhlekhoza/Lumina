require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Check API key
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not defined in your .env file.");
  process.exit(1);
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use a valid model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ replace gemini-pro

// Test endpoint
app.get('/', (req, res) => {
  res.send('Lumina Backend is running!');
});

// AI search endpoint
app.post('/api/search', async (req, res) => {
  const { query, role } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required.' });
  }

  try {
    // Include role in the prompt for personalized answers
    const prompt = `You are a helpful ${role || 'general'} assistant. Answer briefly: "${query}"`;

    // Generate AI content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to fetch response from AI.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});