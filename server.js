const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

const GEMINI_API_KEY = 'AIzaSyBgv5aiytRXfsBiY3hEY9G08QfIFc8xEs0';

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const apiResponse = await fetch('https://api.gemini.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({ message: userMessage }),
    });
    const apiData = await apiResponse.json();

    res.json({ reply: apiData.response || 'I am learning, please try again!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'An error occurred, please try again later.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
