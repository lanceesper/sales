// ============================================
// Vercel Serverless Function: Initiate payment
// Endpoint: POST /api/pay
// ============================================

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { phone, amount, reference } = req.body;

  if (!phone || !amount || !reference) {
    return res.status(400).json({ error: 'Missing required fields: phone, amount, reference' });
  }

  const apiKey = process.env.MEGAPAY_API_KEY;
  const email = process.env.MEGAPAY_EMAIL;

  // For testing purposes, if environment variables are not set on Vercel,
  // we return a simulation code so the developer knows it's working but unconfigured.
  if (!apiKey || !email) {
    console.warn('MegaPay credentials not configured on Vercel environment.');
    return res.status(200).json({
      success: '200',
      message: 'Simulated request sent (API credentials missing in Vercel)',
      transaction_request_id: `MOCK-${Date.now()}`,
      isMock: true
    });
  }

  // Normalize phone number toSafaircom format (2547XXXXXXXX or 2541XXXXXXXX)
  let msisdn = phone.trim().replace(/\D/g, ''); // Remove non-numeric characters
  if (msisdn.startsWith('0')) {
    msisdn = '254' + msisdn.slice(1);
  } else if (msisdn.startsWith('254')) {
    // Already correct format
  } else if (msisdn.length === 9) {
    msisdn = '254' + msisdn;
  } else if (msisdn.startsWith('+254')) {
    msisdn = msisdn.replace('+', '');
  }

  try {
    const payload = {
      api_key: apiKey,
      email: email,
      amount: String(amount),
      msisdn: msisdn,
      reference: String(reference)
    };

    console.log(`Sending STK push request to MegaPay for reference: ${reference}`);

    const response = await fetch('https://megapay.co.ke/backend/v1/initiatestk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('MegaPay response:', data);

    if (data.success === '200' || response.ok) {
      return res.status(200).json({
        success: '200',
        message: data.message || 'Request sent successfully.',
        transaction_request_id: data.transaction_request_id
      });
    } else {
      return res.status(400).json({
        error: data.message || 'Failed to initiate STK Push from MegaPay API.',
        details: data
      });
    }
  } catch (error) {
    console.error('MegaPay API Error:', error);
    return res.status(500).json({ error: 'Internal server error while connecting to MegaPay.' });
  }
}
