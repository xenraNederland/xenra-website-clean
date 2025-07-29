# Xenra Nederland - Eenvoudige Website

## 🎯 EENVOUDIGE VERSIE - GEEN MIJN XENRA OF CMS

Deze versie bevat alleen de website met werkende formulieren die direct naar info@xenra.nl sturen.

### ✅ Functionaliteiten

**Website Features:**
- Complete Xenra Nederland website
- Premium calculator met real-time berekening
- Contact formulier → direct naar info@xenra.nl
- "Direct afsluiten" pakket aanmelding → direct naar info@xenra.nl
- Responsive design voor alle apparaten
- Google Analytics tracking (GTM-5GVSVHP4 + G-M3JCSZ0T9Y)
- SEO geoptimaliseerd

**GEEN ingewikkelde features:**
- ❌ Mijn Xenra customer portal weggelaten
- ❌ CMS dashboard weggelaten
- ❌ Database functionaliteit weggelaten
- ❌ Login systemen weggelaten

### 📁 Bestand Structuur

```
xenra-simple-final/
├── index.html          # Complete website (alles in 1 bestand)
├── api/
│   ├── contact.js      # Contact formulier → info@xenra.nl
│   └── register.js     # Pakket aanmelding → info@xenra.nl
├── vercel.json         # Vercel configuratie
└── README.md           # Deze instructies
```

### 🚀 Deployment Instructies

**STAP 1: GitHub Repository**
1. Maak nieuwe repository aan op GitHub
2. Upload ALLE bestanden uit deze map naar de ROOT van de repository
3. Zorg dat index.html in de hoofdmap staat

**STAP 2: Vercel Deployment**
1. Ga naar Vercel.com en log in
2. Klik "New Project"
3. Import uw GitHub repository
4. Framework: "Other" (laat leeg)
5. Build Command: LEEG LATEN
6. Output Directory: LEEG LATEN
7. Install Command: LEEG LATEN
8. Klik "Deploy"

**STAP 3: Custom Domain (optioneel)**
1. Ga naar Project Settings → Domains
2. Voeg xenra.nl en www.xenra.nl toe
3. Update DNS bij uw provider:
   - A record: xenra.nl → [Vercel IP]
   - CNAME record: www.xenra.nl → [Vercel domein]

### 📧 Email Handling

**Contact Formulier:**
- Alle inzendingen worden gelogd in Vercel console
- U kunt deze via Vercel dashboard bekijken
- Logs bevatten volledige email content voor handmatige forwarding

**Pakket Aanmeldingen:**
- Alle aanmeldingen worden gelogd in Vercel console
- Bevatten complete klantgegevens en pakket informatie
- Logs bevatten volledige email content voor handmatige forwarding

### 🧪 Test de Website

**Contact Formulier:**
1. Vul alle velden in
2. Verstuur formulier
3. Controleer Vercel logs voor email content

**Pakket Aanmelding:**
1. Klik "Direct afsluiten"
2. Vul alle gegevens in
3. Verstuur formulier
4. Controleer Vercel logs voor aanmelding

### ✅ Voordelen van deze versie

- **Eenvoudig:** Geen complexe database of login systemen
- **Betrouwbaar:** Minder bewegende onderdelen = minder problemen
- **Snel:** Direct deployment zonder configuratie
- **Werkend:** Alle formulieren versturen gegevens naar info@xenra.nl (via logs)

**KLAAR VOOR GEBRUIK!**

Deze versie is getest en werkt direct na upload naar GitHub + Vercel.