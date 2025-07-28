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
    const { 
      name, address, postalCode, city, phone, email, age, 
      packageType, loyaltyBonus, digitalVault, monthlyRate, 
      startDate, paymentMethod, cancellationDate 
    } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ 
        error: 'Naam, email, telefoon en adres zijn verplicht' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Ongeldig email adres' 
      });
    }

    const postalCodeRegex = /^[1-9][0-9]{3}[A-Z]{2}$/;
    if (postalCode && !postalCodeRegex.test(postalCode.replace(/\s/g, ''))) {
      return res.status(400).json({ 
        error: 'Ongeldige postcode. Gebruik formaat: 1234AB' 
      });
    }

    console.log('Registration:', { name, email, packageType, monthlyRate, timestamp: new Date().toISOString() });

    return res.status(200).json({ 
      success: true, 
      message: `Bedankt ${name}! Uw aanmelding voor het ${packageType} pakket is ontvangen.` 
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      error: 'Er is een fout opgetreden bij uw aanmelding' 
    });
  }
}