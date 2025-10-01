# Testplan & SSDLC – Slutprojekt Receptsajten

Detta dokument beskriver hur vi säkerställer kvalitet och säkerhet i frontend-projektet **Receptsajten** (React + API från backend-teamet)

## Definition of Done (SSDLC-minimum)

- [ ] Enkel Hot-analys + tillitgränser dokumenterade (OWASP TOP TEN & STRIDE framework)
- [ ] Pull request blockerad tills:
  - [ ] Code review av en annan utvecklare för att säkerställa kod och säkerhetsstandard följs
  - [ ] Manuell testning av Projektledare för att säkerställa feature och webb app fungerar som väntat
  - [ ] Tester för kodsäkerhet har körts
- [ ] CI kör:
  - [ ] lint
  - [ ] `npm audit` (inga high/critical blocker)
  - [ ] sonarcube kopplat till repo för kod och säkerhets analys av utvecklingsteam och testare
  - [ ] Tester enligt krav
- [ ] Localhost skannad med ZAP baseline (inga high)
- [ ] Åtgärda eller förstå medium & low varningar
- [ ] Incidentplan finns och kontaktväg testad

### Hotbildsanalys (80/20-variant)

#### Exempel: 

1. **OWASP Top 10 – filtrera fram 2–3 mest relevanta risker för frontend:**

   - **XSS / Injection (A03)** → all data från API & URL kan vara skadlig.
   - **Security Misconfiguration (A05)** → felaktiga headers (CSP, CORS).
   - **A08 (Software & Data Integrity Failures)** → beroenden/3:e-parts-skript kan manipuleras; använd audit & CSP för att säkra leveranskedjan

2. **STRIDE – bara tillämpa på inputs (de största attackytorna):**

   - **Querystring** (S, T, I) → spoofing/tampering/info leak.
   - **API-svar** (T, I, DoS) → manipulerad data eller flood.
   - **localStorage** (T, EoP) → kan manipuleras; ingen känslig info.

3. **Dokumentera trust boundaries & kontroller:**

   - **Trust boundaries:** Browser (användare + angripare) ↔ Frontend kod ↔ Backend API.
   - **Kontroller:**

     - CSP + escaping mot XSS.
     - Inputvalidering av query.
     - Ingen känslig data i localStorage.

## Testplan för Receptsajten

### Unit tests (ViTest)

- [ ] `formatTime(minutes)` formatterar korrekt
- [ ] `getIngredientCount(recipe)` räknar ingredienser
- [ ] `filterRecipes(recipes, query)` filtrerar case-insensitive
- [ ] `countByCategory(recipes)` returnerar korrekt `{kategori: antal}`
- [ ] `<RecipeCard />` renderar namn, bild (alt), rating, ingrediensantal, tid
- [ ] sanitizeText(input) eller motsv. util returnerar oskadliggjord text. t.ex. <script> → renderas som text

### Integration tests (React Testing Library)

- [ ] Startsida laddar och visar receptkort + kategorilista
- [ ] Sökfält filtrerar receptlistan och rensning visar alla igen
- [ ] Tom-/fel-state (inga recept / API-fel) visar rätt meddelande
- [ ] Rendering av recept med namn "<img src=x onerror=alert(1)>" visas som text; inga event triggas
- [ ] URL-parametern ?q=<script>alert(1)</script> sanitiseras/ignoreras och orsakar inte scriptkörning; UI fungerar

### E2E tests (Playwright)

- [ ] Happy path: startsidan visar receptkort och kategorier
- [ ] Sökflöde: sökning minskar lista, rensa visar alla igen, query i URL (om finns) funkar på reload
- [ ] API-fel på startsidan (`GET /recipes` eller `/categories` svarar 500/timeout) → användaren ser felmeddelande och “Försök igen”-knapp fungerar (retry lyckas)
- [ ] Testdata med potentiell XSS i receptnamn/beskrivning renderas utan scriptkörning (övervaka page.on('dialog')/console → inga alerts/errors)
