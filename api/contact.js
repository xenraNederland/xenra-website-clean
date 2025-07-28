export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, inquiryType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Naam, email en bericht zijn verplicht' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Ongeldig email adres' 
      });
    }

    console.log('Contact submission:', { name, email, phone, inquiryType, timestamp: new Date().toISOString() });

    return res.status(200).json({ 
      success: true, 
      message: 'Bedankt voor uw bericht. Wij nemen spoedig contact met u op.' 
    });

  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({ 
      error: 'Er is een fout opgetreden' 
    });
  }
}