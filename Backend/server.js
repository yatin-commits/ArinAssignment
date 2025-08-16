import express from 'express';
import cors from 'cors';
// const dotenv = require("dotenv");
import dotenv from 'dotenv';
dotenv.config();


import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
