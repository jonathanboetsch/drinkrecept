# E2E Tests med Playwright

Dessa tester följer testplanen från `TESTPLAN_SSDLC_RECEPTSAJTEN.md`.

## Testkategorier

### 1. Homepage Tests (`homepage.spec.js`)
- ✅ Happy path: Startsidan visar receptkort och kategorier
- ✅ Sökflöde: Sökning, rensa, query i URL funkar på reload

### 2. Error Handling (`error-handling.spec.js`)
- ✅ API-fel visar felmeddelande och "Försök igen"-knapp fungerar
- ✅ Tom-state visar rätt meddelande

### 3. Security Tests (`security.spec.js`)
- ✅ XSS i receptdata renderas säkert utan scriptkörning
- ✅ XSS i URL-parametrar sanitiseras och orsakar inte scriptkörning

## Köra lokalt

```bash
# Kör alla E2E-tester (headless)
npm run test:e2e

# Kör med UI-läge (visuell debugger)
npm run test:e2e:ui

# Kör med synlig browser
npm run test:e2e:headed

# Kör specifik testfil
npx playwright test homepage.spec.js
```

## CI/CD Integration

E2E-testerna körs automatiskt i GitHub Actions på varje PR till `dev`-branchen:
1. Efter unit tests
2. Innan deployment till Netlify
3. Vid fel laddas Playwright-rapport upp som artifact

## Viktiga data-testid attribut

Testerna förväntar sig följande `data-testid` attribut i komponenterna:

- `recipe-card` - Receptkort
- `category-list` - Kategorilista
- `search-input` - Sökfält
- `clear-search` - Rensa-knapp
- `error-message` - Felmeddelande
- `retry-button` - Försök igen-knapp
- `empty-state` - Tom-state meddelande

## Tips

- Testerna använder API-mocking för att testa error-scenarios och XSS
- Alla XSS-tester lyssnar på `dialog` och `console` events
- Timeout är satt till 10s för långsamma API-anrop
