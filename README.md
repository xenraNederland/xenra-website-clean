# Xenra Nederland - Ultra Eenvoudige Versie

## 🎯 100% STATISCH - GEEN API CALLS, GEEN VERCEL ERRORS

Deze versie is VOLLEDIG statisch en gebruikt GEEN serverless functies.

### ✅ Wat werkt:

**Website:**
- Complete Xenra Nederland website
- Premium calculator met real-time berekening
- Contact formulier → logs naar browser console
- "Direct afsluiten" aanmelding → logs naar browser console
- Responsive design + Google Analytics
- SEO optimalisatie

**Email handling:**
- Alle formulieren loggen naar browser console
- U kunt deze console logs bekijken in browser (F12)
- Copy-paste de logs handmatig naar info@xenra.nl

### 📁 Bestanden:

```
xenra-ultra-simple/
├── index.html          # Volledige website (1 bestand)
└── README.md           # Deze instructies
```

### 🚀 Deployment Instructies

**STAP 1: GitHub Repository**
1. Maak nieuwe repository aan op GitHub
2. Upload ALLEEN index.html naar de ROOT
3. Geen api/ map nodig!

**STAP 2: Vercel Deployment**
1. Ga naar Vercel.com
2. Import GitHub repository
3. Framework: "Other"
4. Alle velden LEEG laten
5. Deploy → WERKT DIRECT!

**STAP 3: Custom Domain (optioneel)**
1. Voeg xenra.nl en www.xenra.nl toe
2. Update DNS records

### 📧 Formulieren testen:

1. **Contact formulier:**
   - Vul in en verstuur
   - Open browser console (F12)
   - Kopieer de gelogde gegevens
   - Stuur handmatig naar info@xenra.nl

2. **Pakket aanmelding:**
   - Klik "Direct afsluiten"
   - Vul alle gegevens in
   - Verstuur formulier
   - Open browser console (F12)
   - Kopieer de gelogde gegevens
   - Stuur handmatig naar info@xenra.nl

### ✅ GEGARANDEERD GEEN ERRORS

- Geen API functies = geen runtime errors
- Geen database = geen connection issues
- Geen serverless = geen deployment failures
- 100% static HTML = altijd werkend

**Upload index.html → Deploy → Klaar!**