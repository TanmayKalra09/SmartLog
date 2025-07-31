import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const users = [];  // In-memory users, replace with DB in production

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists.' });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPwd });
    res.json({ message: 'Registration successful.' });
  } catch  {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch  {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

