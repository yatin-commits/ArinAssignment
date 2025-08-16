import express from 'express';
import cors from 'cors';
const dotenv = require("dotenv");
dotenv.config();


import authRoutes from './routes/auth.js';
import campaignRoutes from './routes/campaigns.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
