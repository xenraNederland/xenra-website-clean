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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email en wachtwoord zijn verplicht' 
      });
    }

    const demoAccounts = [
      { email: 'demo@xenra.nl', password: '123456', name: 'Demo Gebruiker' },
      { email: 'test@example.com', password: 'test123', name: 'Test Gebruiker' }
    ];

    const account = demoAccounts.find(acc => acc.email === email && acc.password === password);

    if (!account) {
      return res.status(401).json({ 
        error: 'Ongeldig email adres of wachtwoord' 
      });
    }

    const token = 'demo_token_' + Date.now();

    console.log('Customer login:', { email, name: account.name, timestamp: new Date().toISOString() });

    return res.status(200).json({ 
      success: true, 
      token,
      user: { 
        email: account.email, 
        name: account.name 
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      error: 'Er is een fout opgetreden bij het inloggen' 
    });
  }
}