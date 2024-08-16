const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/recommend', (req, res) => {
  const { type, input } = req.body;

  // Prepare the command to execute the Python script
  const command = `python3 backend/recommendation-system.py ${type} "${input}"`;

  // Execute the Python script
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Parse the Python script output
    let recommendations;
    try {
      recommendations = JSON.parse(stdout);
    } catch (parseError) {
      console.error(`Error parsing Python script output: ${parseError}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(recommendations);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
