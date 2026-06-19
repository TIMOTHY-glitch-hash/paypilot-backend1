const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('Starting server...');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Missing');
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'Set' : 'Missing');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['https://paypilot-frontend.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

let supabase;
try {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  console.log('✅ Supabase connected');
} catch (error) {
  console.error('❌ Supabase connection failed:', error.message);
  process.exit(1);
}

app.get('/', (req, res) => {
  res.json({ status: 'PayPilot API is running' });
});

app.get('/api/transactions/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.params.userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/pay', async (req, res) => {
  try {
    const { amount, email, userId } = req.body;

    if (!amount || !email || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reference = `PP-${Date.now()}`;
    const { data: tx, error } = await supabase
      .from('transactions')
      .insert([{
        user_id: userId,
        amount: Number(amount),
        status: 'pending',
        reference: reference,
      }])
      .select();

    if (error) throw error;

    res.json({
      success: true,
      transactionId: tx[0].id,
      reference: reference,
      message: 'Payment initiated. Flutterwave integration pending.',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});