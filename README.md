# drinkrecept

Grupp projekt n.3 – Receptsida

## Innehåll

- [Om projektet](#om-projektet)
- [Teknisk översikt](#teknisk-översikt)
- [Komma igång](#komma-igång)
- [Scripts](#scripts)
- [Testning](#testning)
- [Mappstruktur](#mappstruktur)
- [CI/CD & Deployment](#cicd--deployment)
- [Säkerhet & Testplan](#säkerhet--testplan)
- [Bidra](#bidra)

---

## Om projektet

Detta är en receptsida byggd i React där användare kan bläddra bland drinkrecept, filtrera på kategorier, söka, lämna betyg och kommentarer. Projektet är utvecklat som ett grupparbete och använder ett externt backend-API.

## Teknisk översikt

- **Frontend:** React 19, Vite, React Router
- **Testning:** Vitest, React Testing Library, Playwright (E2E)
- **Linting:** ESLint
- **CI/CD:** GitHub Actions, Netlify
- **API:** [https://grupp3-jynxa.reky.se/recipes](https://grupp3-jynxa.reky.se/recipes)

## Komma igång

1. **Krav:** Node.js 20+
2. **Installera beroenden:**

   ```sh
   cd frontend
   npm install
   ```

3. **Starta utvecklingsserver:**

   ```sh
   npm run dev
   ```

   Sidan finns på [http://localhost:5173](http://localhost:5173)

## Scripts

| Kommando                  | Beskrivning                   |
| ------------------------- | ----------------------------- |
| `npm run dev`             | Startar utvecklingsserver     |
| `npm run build`           | Bygger produktion             |
| `npm run preview`         | Förhandsgranskar produktion   |
| `npm run lint`            | Kör ESLint                    |
| `npm run test`            | Kör enhetstester (Vitest)     |
| `npm run test:ui`         | Vitest UI-läge                |
| `npm run test:coverage`   | Testtäckning                  |
| `npm run test:e2e`        | Kör E2E-tester (Playwright)   |
| `npm run test:e2e:ui`     | Playwright UI-läge            |
| `npm run test:e2e:headed` | Playwright med synlig browser |

## Testning

- **Unit/Integration:** Vitest + React Testing Library (`frontend/tests/`, `frontend/src/tests/`)
- **E2E:** Playwright (`frontend/e2e/`)
- **Testplan:** Se [frontend/documents/TESTPLAN_SSDLC_RECEPTSAJTEN.md](frontend/documents/TESTPLAN_SSDLC_RECEPTSAJTEN.md)
- **Viktiga data-testid:**
  - `recipe-card`, `category-list`, `search-input`, `clear-search`, `error-message`, `retry-button`, `empty-state`

## Mappstruktur

```
frontend/
  src/
    components/      # React-komponenter
    assets/          # Bilder och statiska resurser
    tests/           # Extra tester
  e2e/               # Playwright E2E-tester
  public/            # Publika filer (favicon, _redirects)
  documents/         # Testplan och dokumentation
  test-results/      # Playwright testresultat
  package.json
  vite.config.js
  ...
```

## CI/CD & Deployment

- **GitHub Actions:** Lint, test, E2E, ZAP security scan, preview deploy till Netlify på varje PR mot `dev`.
- **Netlify:** Automatisk deploy av förhandsgranskning.
- **ZAP:** Baseline security scan körs i CI.

Se `.github/workflows/dev-publish.yml` för detaljer.

## Säkerhet & Testplan

- **OWASP Top 10:** XSS, Security Misconfiguration, Data Integrity hanteras.
- **STRIDE:** Inputs och API-data valideras.
- **Testplan:** [frontend/documents/TESTPLAN_SSDLC_RECEPTSAJTEN.md](frontend/documents/TESTPLAN_SSDLC_RECEPTSAJTEN.md)

## Bidra

1. Skapa en branch (`git checkout -b feature/my-feature`)
2. Gör ändringar och skriv tester
3. Skicka en pull request mot `dev`
4. Se till att alla tester och linting går igenom

---

_Se även [frontend/e2e/README.md](frontend/e2e/README.md) för E2E-tester och [frontend/documents/TESTPLAN_SSDLC_RECEPTSAJTEN.md](frontend/documents/TESTPLAN_SSDLC_RECEPTSAJTEN.md) för testplan och säkerhetskrav._
