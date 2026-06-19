const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: ['https://paypilot-frontend.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Supabase client
let supabase;
try {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  console.log('✅ Supabase connected');
} catch (error) {
  console.error('❌ Supabase connection failed:', error.message);
  process.exit(1);
}

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'PayPilot API is running' });
});

// Get user transactions
app.get('/api/transactions/:userId', async (req, res) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', req.params.userId)
    .order('created_at', { ascending: false });
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Initiate payment (simplified)
app.post('/api/pay', async (req, res) => {
  const { amount, email, userId } = req.body;
  
  // Store pending transaction
  const { data: tx, error } = await supabase
    .from('transactions')
    .insert([{ 
      user_id: userId, 
      amount, 
      status: 'pending',
      reference: `PP-${Date.now()}`
    }])
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  
  // Return transaction ID for Flutterwave integration
  res.json({ 
    success: true, 
    transactionId: tx[0].id,
    message: 'Ready for Flutterwave checkout'
  });
});

// Flutterwave webhook
app.post('/api/webhooks/flutterwave', async (req, res) => {
  // Verify webhook signature in production!
  const { status, tx_ref, transaction_id } = req.body;
  
  await supabase
    .from('transactions')
    .update({ 
      status: status === 'successful' ? 'success' : 'failed',
      flutterwave_ref: transaction_id
    })
    .eq('reference', tx_ref);
  
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));