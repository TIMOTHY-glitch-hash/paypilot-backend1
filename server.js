const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS - allow all origins for testing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Health check - MUST respond quickly
app.get('/', (req, res) => {
  res.json({ status: 'PayPilot API is running' });
});

// Test Supabase connection
app.get('/health', async (req, res) => {
  try {
    const { data, error } = await supabase.from('transactions').select('count').limit(0);
    if (error) throw error;
    res.json({ status: 'ok', supabase: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get user transactions
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

// Initiate payment
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

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    res.json({
      success: true,
      transactionId: tx[0].id,
      reference: reference,
      message: 'Payment initiated. Flutterwave integration pending.',
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Flutterwave webhook
app.post('/api/webhooks/flutterwave', async (req, res) => {
  try {
    const { status, tx_ref, transaction_id } = req.body;

    await supabase
      .from('transactions')
      .update({
        status: status === 'successful' ? 'success' : 'failed',
        flutterwave_ref: transaction_id,
      })
      .eq('reference', tx_ref);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server - listen on 0.0.0.0 to accept external connections
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});