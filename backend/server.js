const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001; // Choose a suitable port

app.use(cors());

// Create a SQLite database connection
const db = new sqlite3.Database('/Users/admin/cinch/shipments.db');

// Define an API endpoint to fetch shipment data with pagination
app.get('/api/shipments', (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page (default to page 1)
  const perPage = parseInt(req.query.perPage) || 20; // Get the items per page (default to 20)

  // Calculate the starting index based on the page and items per page
  const startIndex = (page - 1) * perPage;

  // Define the SQL query with pagination
  const query = `SELECT * FROM shipments LIMIT ? OFFSET ?`;
  db.all(query, [perPage, startIndex], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/comments', (req, res) => {
  const shipmentId = req.query.shipmentId;

  if (!shipmentId) {
    res.status(400).json({ error: 'shipmentId parameter is required' });
    return;
  }

  const query = `SELECT * FROM comments WHERE sid = ?`;

  db.all(query, [shipmentId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
