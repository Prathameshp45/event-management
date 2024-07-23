const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/api');

const dotenv = require('dotenv');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(9000, () => console.log(`Server running on port ${PORT}`));
