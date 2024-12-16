const express = require('express');
const request = require('request');

const app = express();

// Proxy endpoint
app.get('/proxy', (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send('Please provide a URL as a query parameter.');
    }

    // Use the request library to forward the response
    request(targetUrl)
        .on('error', (error) => {
            console.error(error);
            res.status(500).send('Failed to fetch the requested URL.');
        })
        .pipe(res);
});

// Export the app for Vercel
module.exports = app;
