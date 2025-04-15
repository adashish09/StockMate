const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('./config/firebaseAdmin'); // Initialize Firebase Admin
const itemRoutes = require('./routes/items');

app.use(cors());
app.use(express.json());

// Route for inventory CRUD
app.use('/api/items', itemRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
