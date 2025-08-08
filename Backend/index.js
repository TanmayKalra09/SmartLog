const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const goals = require('./routes/goals');
const transactions = require('./routes/transactions.js');
const cors = require('cors');
const { urlencoded } = require('express');
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/goals', goals);
app.use('/api/transactions', transactions);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
