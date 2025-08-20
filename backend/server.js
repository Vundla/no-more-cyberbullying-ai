// backend/server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// --- Database Connection ---
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

// --- API Routes ---

// GET /api/reports - Fetch all reports
app.get('/api/reports', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM reports ORDER BY created_at DESC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("💥 DB ERROR fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports.", error: error.message });
  }
});

// POST /api/reports - Create a new report
app.post('/api/reports', async (req, res) => {
  const { content, status } = req.body.report;
  if (!content) {
    return res.status(400).json({ message: "Content cannot be empty." });
  }
  try {
    const query = "INSERT INTO reports (content, status) VALUES (?, ?)";
    const [result] = await db.query(query, [content, status || 'new']);
    const [newReport] = await db.query("SELECT * FROM reports WHERE id = ?", [result.insertId]);
    res.status(201).json(newReport[0]);
  } catch (error) {
    console.error("💥 DB ERROR creating report:", error);
    res.status(500).json({ message: "Error saving the report.", error: error.message });
  }
});

// POST /api/reports/:id/analyze - Analyze report content with AI
app.post('/api/reports/:id/analyze', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are an expert moderator analyzing content for cyberbullying. Provide a structured analysis in three parts: Severity (Mild, Moderate, Severe), Intent (Malicious, Sarcastic, Unclear), and Suggested Response (constructive message to the user)."
          },
          { role: "user", content: `Analyze the following reported message: "${content}"` }
        ]
      },
      { headers: { 'Authorization': `Bearer ${process.env.OPEN_ROUTER_API_KEY}` } }
    );

    const analysisText = aiResponse.data.choices[0].message.content;

    await db.query("UPDATE reports SET ai_analysis = ? WHERE id = ?", [analysisText, id]);

    res.status(200).json({ ai_analysis: analysisText });
  } catch (error) {
    console.error("💥 AI analysis error:", error.response ? error.response.data : error.message);
    res.status(500).json({
      message: "Failed to get AI analysis.",
      error: error.response ? error.response.data : error.message
    });
  }
});

// --- Start the server ---
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
