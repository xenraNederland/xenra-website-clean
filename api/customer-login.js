export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method niet toegestaan' });
  }

  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email en wachtwoord zijn verplicht' 
      });
    }

    // Demo accounts for testing
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

    // Generate demo token
    const token = 'demo_token_' + Date.now();

    console.log('Customer login successful:', { email, name: account.name });

    res.status(200).json({ 
      success: true, 
      token,
      user: { 
        email: account.email, 
        name: account.name 
      }
    });

  } catch (error) {
    console.error('Customer login error:', error);
    res.status(500).json({ 
      error: 'Er is een fout opgetreden bij het inloggen' 
    });
  }
}
