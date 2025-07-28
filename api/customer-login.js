export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Gebruikersnaam en wachtwoord zijn verplicht" });
    }

    // Demo accounts for testing
    const demoAccounts = {
      'demo@xenra.nl': {
        password: '123456',
        customerId: 1,
        customer: {
          id: 1,
          firstName: 'Demo',
          lastName: 'Klant',
          email: 'demo@xenra.nl',
          phone: '06-12345678',
          address: 'Demostraat 1',
          postalCode: '1234AB',
          city: 'Amsterdam',
          packageType: 'particulieren'
        }
      },
      'test@example.com': {
        password: 'test123',
        customerId: 2,
        customer: {
          id: 2,
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '06-87654321',
          address: 'Testlaan 2',
          postalCode: '5678CD',
          city: 'Rotterdam',
          packageType: 'zzp'
        }
      }
    };

    const account = demoAccounts[username];
    if (!account || account.password !== password) {
      return res.status(401).json({ message: "Ongeldige inloggegevens" });
    }

    // Generate simple session token (in production, use proper JWT)
    const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    res.json({
      success: true,
      token: sessionToken,
      customerId: account.customerId,
      customer: account.customer
    });

  } catch (error) {
    console.error('Customer login error:', error);
    res.status(500).json({ message: 'Er is een fout opgetreden bij het inloggen' });
  }
}