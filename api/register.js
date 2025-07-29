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
      name, email, phone, address, postalCode, city, age, 
      packageType, loyaltyBonus, digitalVault, paymentMethod, startDate 
    } = req.body;

    if (!name || !email || !phone || !address || !packageType) {
      return res.status(400).json({ 
        error: 'Naam, email, telefoon, adres en pakket zijn verplicht' 
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

    // Calculate monthly rate
    let monthlyRate = 19.95;
    if (packageType === 'zzp') monthlyRate = 24.95;
    if (packageType === 'bv') monthlyRate = 29.95;
    if (loyaltyBonus) monthlyRate += 5.00;
    if (digitalVault) monthlyRate += 2.50;

    // Email content naar info@xenra.nl
    const emailContent = `
NIEUWE PAKKET AANMELDING - XENRA.NL

PERSOONLIJKE GEGEVENS:
Naam: ${name}
Email: ${email}
Telefoon: ${phone}
Adres: ${address}
Postcode: ${postalCode}
Woonplaats: ${city}
Leeftijd: ${age} jaar

PAKKET INFORMATIE:
Gekozen pakket: ${packageType.toUpperCase()}
Maandelijkse bijdrage: €${monthlyRate.toFixed(2)}
Xenra-tegoed: ${loyaltyBonus ? 'JA' : 'NEE'}
Digitale kluis: ${digitalVault ? 'JA' : 'NEE'}
Betaalmethode: ${paymentMethod}
Gewenste startdatum: ${startDate}

---
Aangemeld op: ${new Date().toLocaleString('nl-NL')}
Vanaf: Xenra Nederland Website - Direct Afsluiten
    `.trim();

    console.log('Registration submission received:');
    console.log('=================================');
    console.log(emailContent);
    console.log('=================================');
    console.log('');
    console.log('** EMAIL NAAR info@xenra.nl **');
    console.log('TO: info@xenra.nl');
    console.log('SUBJECT: Nieuwe aanmelding - ' + name + ' (' + packageType + ')');
    console.log('BODY:');
    console.log(emailContent);
    console.log('');

    return res.status(200).json({ 
      success: true, 
      message: `Bedankt ${name}! Uw aanmelding voor het ${packageType} pakket is ontvangen. Wij nemen spoedig contact met u op om de vervolgstappen door te nemen.` 
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      error: 'Er is een fout opgetreden bij uw aanmelding' 
    });
  }
}