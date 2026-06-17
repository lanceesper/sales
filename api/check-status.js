// ============================================
// Vercel Serverless Function: Check transaction status
// Endpoint: GET /api/check-status?id=transaction_request_id
// ============================================

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing transaction_request_id parameter (id)' });
  }

  // Handle local mock simulation requests
  if (id.startsWith('MOCK-')) {
    const timestamp = parseInt(id.split('-')[1]);
    const elapsedSeconds = (Date.now() - timestamp) / 1000;

    // Simulate standard M-Pesa push delay:
    // Under 5 seconds, keep it pending.
    // After 5 seconds, simulate user success.
    if (elapsedSeconds < 5) {
      return res.status(200).json({
        ResponseCode: 999, // Custom code for pending
        ResponseDescription: 'Request sent to handset, waiting for user PIN input...',
        status: 'pending'
      });
    } else {
      return res.status(200).json({
        ResponseCode: 0,
        ResponseDescription: 'Success, Request accepted for processing',
        TransactionReceipt: 'MOCKTXRECEIPT',
        TransactionAmount: 10,
        status: 'success'
      });
    }
  }

  const apiKey = process.env.MEGAPAY_API_KEY;
  const email = process.env.MEGAPAY_EMAIL;

  if (!apiKey || !email) {
    return res.status(500).json({ error: 'MegaPay API credentials are not configured on Vercel.' });
  }

  try {
    const payload = {
      api_key: apiKey,
      email: email,
      transaction_request_id: id
    };

    console.log(`Checking transaction status for ID: ${id}`);

    const response = await fetch('https://megapay.co.ke/backend/v1/transactionstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(`MegaPay status response for ${id}:`, data);

    // Standardize ResponseCode behavior
    // Safaricom ResponseCode: 0 (Success), 1032 (Cancelled), etc.
    // We normalize this response to return a status that the frontend can read.
    let status = 'pending';
    if (data.ResponseCode === 0) {
      status = 'success';
    } else if (data.ResponseCode !== undefined && data.ResponseCode !== 999 && data.ResponseCode !== 0) {
      // Any other code from Safaricom implies a failure (e.g. 1032 cancel, 1 insufficient funds, etc.)
      status = 'failed';
    } else if (data.success && data.success !== '200') {
      status = 'failed';
    }

    return res.status(200).json({
      ResponseCode: data.ResponseCode,
      ResponseDescription: data.ResponseDescription || data.message || 'Transaction status retrieved',
      status: status,
      raw: data
    });
  } catch (error) {
    console.error('MegaPay check-status error:', error);
    return res.status(500).json({ error: 'Internal server error while querying MegaPay transaction status.' });
  }
}
