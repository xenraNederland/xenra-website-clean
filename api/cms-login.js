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
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username en wachtwoord zijn verplicht' 
      });
    }

    // Demo CMS account
    if (username === 'admin' && password === 'xenra2025') {
      const token = 'cms_token_' + Date.now();
      
      console.log('CMS login:', { username, timestamp: new Date().toISOString() });

      return res.status(200).json({ 
        success: true, 
        token,
        user: { 
          username: 'admin',
          role: 'administrator'
        }
      });
    }

    return res.status(401).json({ 
      error: 'Ongeldige inloggegevens' 
    });

  } catch (error) {
    console.error('CMS login error:', error);
    return res.status(500).json({ 
      error: 'Er is een fout opgetreden bij het inloggen' 
    });
  }
}