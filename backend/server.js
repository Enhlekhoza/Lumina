require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize the Google Generative AI client
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not defined in your .env file.");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// API Routes
app.get('/', (req, res) => {
  res.send('Lumina Backend is running!');
});

app.post('/api/search', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required.' });
  }

  try {
    // For this example, we'll create a simple prompt.
    // In a real application, you'd fetch and inject relevant
    // content from your knowledge base (e.g., from Storyblok) here.
    const prompt = `Answer the following question based on general knowledge: "${query}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to fetch response from AI.' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
