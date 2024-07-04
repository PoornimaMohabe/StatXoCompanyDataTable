// /backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.text());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("this is home page")
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await connectDB
        console.log("Connected to Db");
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
});
