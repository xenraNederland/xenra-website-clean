// Vercel Serverless Function voor Registratie/Aanmelding
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
    const {
      name,
      address,
      postalCode,
      city,
      phone,
      email,
      age,
      packageType,
      loyaltyBonus,
      digitalVault,
      monthlyRate,
      startDate,
      paymentMethod,
      cancellationDate
    } = req.body;

    // Validatie van verplichte velden
    if (!name || !address || !postalCode || !city || !phone || !email || !packageType || !paymentMethod) {
      return res.status(400).json({ 
        error: 'Alle verplichte velden moeten worden ingevuld' 
      });
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Ongeldig email adres' 
      });
    }

    // Postcode validatie (Nederlandse postcode)
    const postalCodeRegex = /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/;
    if (!postalCodeRegex.test(postalCode)) {
      return res.status(400).json({ 
        error: 'Ongeldige postcode format (gebruik 1234AB)' 
      });
    }

    // Phone validatie (Nederlandse nummers)
    const phoneRegex = /^(\+31|0)[0-9]{9}$/;
    if (!phoneRegex.test(phone.replace(/\s|-/g, ''))) {
      return res.status(400).json({ 
        error: 'Ongeldig telefoonnummer' 
      });
    }

    // Log de registratie (in productie zou dit naar database gaan)
    console.log('Nieuwe pakket aanmelding ontvangen:', {
      name,
      email,
      packageType,
      monthlyRate,
      paymentMethod,
      timestamp: new Date().toISOString()
    });

    // In een echte implementatie zou hier de registratie worden opgeslagen
    // en een bevestigingsmail worden verzonden
    
    // Success response met Nederlandse tekst
    return res.status(200).json({
      success: true,
      message: 'Uw aanmelding is succesvol ontvangen! Wij nemen binnen 1 werkdag contact met u op voor de afronding.',
      registration: {
        id: Math.floor(Math.random() * 10000), // Mock ID
        name,
        packageType,
        monthlyRate,
        registrationDate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      error: 'Er is een fout opgetreden bij het verwerken van uw aanmelding. Probeer het opnieuw of bel ons op 085 08 06 142.'
    });
  }
}