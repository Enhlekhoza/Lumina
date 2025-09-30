require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const algoliasearch = require('algoliasearch');

const app = express();
const port = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Check API keys ---
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not defined in .env");
  process.exit(1);
}
if (!process.env.VITE_ALGOLIA_APP_ID || !process.env.VITE_ALGOLIA_ADMIN_KEY || !process.env.VITE_ALGOLIA_INDEX) {
  console.error("Error: Algolia keys are missing in .env");
  process.exit(1);
}

// --- Initialize Gemini AI client ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// --- Initialize Algolia client (v4, CommonJS compatible) ---
const algoliaClient = algoliasearch(
  process.env.VITE_ALGOLIA_APP_ID,
  process.env.VITE_ALGOLIA_ADMIN_KEY
);
const algoliaIndex = algoliaClient.initIndex(process.env.VITE_ALGOLIA_INDEX);

// --- Test endpoint ---
app.get('/', (req, res) => {
  res.send('Lumina Backend is running!');
});

// --- Search + summarize endpoint ---
app.post('/api/search', async (req, res) => {
  const { query, role } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required.' });

  try {
    // 1️⃣ Search Algolia
    const searchRes = await algoliaIndex.search(query, { hitsPerPage: 10 });
    const hits = searchRes.hits.map(hit => ({ ...hit, objectID: hit.objectID }));

    // 2️⃣ Summarize top hit with Gemini AI
    let summary = null;
    if (hits.length > 0 && hits[0].body) {
      const prompt = `You are a helpful ${role || 'general'} assistant. Summarize the following text briefly:\n\n${hits[0].body}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      summary = response.text();
    }

    res.json({ results: hits, summary });
  } catch (error) {
    console.error('Error in search + summarize:', error);
    res.status(500).json({ error: 'Failed to search and summarize.' });
  }
});

// --- Dedicated summarize endpoint ---
app.post('/api/summarize', async (req, res) => {
  const { text, role } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required.' });

  try {
    const prompt = `You are a helpful ${role || 'general'} assistant. Summarize the following text briefly:\n\n${text}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.json({ summary });
  } catch (error) {
    console.error('Error in summarization:', error);
    res.status(500).json({ error: 'Failed to summarize text.' });
  }
});

// --- Start server ---
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});