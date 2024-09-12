const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
const cors = require('cors'); // Importing cors middleware

// Initialize MongoDB connection
mongoDB();

// Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',          // For local development
  'https://foodzy-hazel.vercel.app' // Your deployed frontend URL
];

// CORS configuration to handle requests from allowed origins
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'], // Specify allowed request methods
  credentials: true,        // Allow credentials (e.g., cookies, auth headers)
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Route handlers
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
