const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIApi } = require('openai'); // You may need to install the OpenAI SDK

const app = express();
const port = 3000;

// Your OpenAI API key
const openai = new OpenAIApi({ key: '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' });

app.use(bodyParser.json());

app.post('/api/openai', async (req, res) => {
  const { userMessage } = req.body;

  try {
    // Make a request to OpenAI
    const response = await openai.createCompletion({
      engine: 'text-davinci-002',
      prompt: `User: ${userMessage}\nAssistant:`,
      max_tokens: 150, // You can adjust this as needed
    });

    // Send the response back to the client
    res.json({ response: response.choices[0].text });
  } catch (error) {
    console.error('Error sending message to OpenAI:', error);
    res.status(500).json({ error: 'An error occurred while fetching the response.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
