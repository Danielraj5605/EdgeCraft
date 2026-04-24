const express = require('express');
const cors = require('cors');
const bfhlRoutes = require('./routes/bfhl');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/bfhl', bfhlRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'EdgeCraft API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`EdgeCraft backend running on port ${PORT}`);
  console.log(`POST /bfhl endpoint available`);
});
