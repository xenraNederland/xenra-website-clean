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
    const { 
      name, address, postalCode, city, phone, email, age, 
      packageType, loyaltyBonus, digitalVault, monthlyRate, 
      startDate, paymentMethod, cancellationDate 
    } = req.body;

    // Basic validation
    if (!name || !email || !phone || !address) {
      return res.status(400).json({ 
        error: 'Naam, email, telefoon en adres zijn verplicht' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Ongeldig email adres' 
      });
    }

    // Dutch postal code validation (1234AB format)
    const postalCodeRegex = /^[1-9][0-9]{3}[A-Z]{2}$/;
    if (postalCode && !postalCodeRegex.test(postalCode.replace(/\s/g, ''))) {
      return res.status(400).json({ 
        error: 'Ongeldige postcode. Gebruik formaat: 1234AB' 
      });
    }

    // Log the registration
    console.log('Registration submission:', {
      name, email, phone, packageType, monthlyRate,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ 
      success: true, 
      message: `Bedankt ${name}! Uw aanmelding voor het ${packageType} pakket is ontvangen. Wij nemen spoedig contact met u op.` 
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Er is een fout opgetreden bij uw aanmelding' 
    });
  }
}
