// server.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS middleware
app.use(cors());

// Define a route for proxying requests
app.get('/api', async (req, res) => {
    try {
        const { url } = req.query;
        const response = await fetch(url);
        const data = await response.json();
       
        res.json(data);
    } catch (error) {
        console.error('Error proxying request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
