// Vercel Serverless Function voor Customer Login
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Validatie van verplichte velden
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Gebruikersnaam en wachtwoord zijn verplicht' 
      });
    }

    // Demo login systeem - in productie zou dit tegen database worden gecontroleerd
    const demoAccounts = [
      {
        id: 1,
        username: 'demo@xenra.nl',
        password: '123456',
        firstName: 'Demo',
        lastName: 'Klant',
        email: 'demo@xenra.nl',
        packageType: 'Particulier',
        isOnHold: false
      },
      {
        id: 2,
        username: 'test@example.com',
        password: 'test123',
        firstName: 'Test',
        lastName: 'Gebruiker',
        email: 'test@example.com',
        packageType: 'ZZP',
        isOnHold: false
      }
    ];

    // Zoek gebruiker in demo accounts
    const user = demoAccounts.find(
      acc => acc.username.toLowerCase() === username.toLowerCase() && acc.password === password
    );

    if (!user) {
      return res.status(401).json({ 
        message: 'Onjuiste inloggegevens. Controleer uw gebruikersnaam en wachtwoord.' 
      });
    }

    // Check if account is on hold
    if (user.isOnHold) {
      return res.status(423).json({
        isOnHold: true,
        reason: 'Account tijdelijk gepauzeerd.',
        message: 'Uw account is tijdelijk geblokkeerd. Neem contact op voor meer informatie.'
      });
    }

    // Generate mock JWT token (in productie zou dit een echte JWT zijn)
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    // Log successful login
    console.log('Customer login successful:', {
      username: user.username,
      customerId: user.id,
      timestamp: new Date().toISOString()
    });

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Succesvol ingelogd',
      token,
      customerId: user.id,
      customer: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        packageType: user.packageType
      }
    });

  } catch (error) {
    console.error('Customer login error:', error);
    return res.status(500).json({
      error: 'Er is een fout opgetreden bij het inloggen. Probeer het opnieuw.'
    });
  }
}