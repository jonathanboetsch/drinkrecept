# 🔒 Threat Analysis — *Drinkrecept*

### Author

Jonathan Boetsch — IT-Högskolan
Course: Agilutveckling / Webbapputveckling
Date: November 2025

---

## 1. Introduction

**Drinkrecept** is a web application that lets users browse and rate drink recipes.
The frontend is built in **React (Vite)**, and communicates with a backend **REST API**.
Users can create recipes, rate them, and leave comments. Recipe images are fetched from external URLs.

This analysis identifies **main security threats**, their **likelihood and impact**, and **recommended controls** to reduce risk. The focus is on the frontend and API interaction layer.

---

## 2. Trust Boundaries

| Component                | Description                           | Trust level                                            |
| ------------------------ | ------------------------------------- | ------------------------------------------------------ |
| **Browser**              | End-user and potential attacker       | Untrusted                                              |
| **Frontend (React app)** | Code served from own domain           | Trusted, but exposed                                   |
| **Backend API**          | Validates and stores recipes/comments | Trusted                                                |
| **External resources**   | Recipe images or CDNs                 | Untrusted (strictly limited by CSP img-src)            |

---

## 3. Main Threats and Risks

| # | Threat                               | Example                                                | Likelihood | Impact | Mitigation summary                                                    |
| - | ------------------------------------ | ------------------------------------------------------ | ---------- | ------ | --------------------------------------------------------------------- |
| 1 | **Stored XSS**                       | Attacker submits `<script>` in recipe title or comment | High       | High   | Sanitize user input on server; React auto-escapes by default; add CSP |
| 2 | **Reflected / DOM XSS**              | Search term inserted directly into DOM                 | Medium     | High   | Avoid `dangerouslySetInnerHTML`; encode output                        |
| 3 | **External image abuse**             | Image URL points to malicious content                  | Medium     | Medium | Validate URLs (https only); restrict `img-src` in CSP                 |
| 5 | **Secrets or tokens leakage**        | API keys in frontend or repo                           | Medium     | High   | Store secrets in environment variables; never commit them             |
| 6 | **Dependency compromise**            | Outdated or unpinned npm packages                      | Medium     | Medium | Run `npm audit`; pin GitHub Actions by commit hash                    |
| 8 | **Error information disclosure**     | Stack traces shown to users                            | High       | Low    | Show generic error messages; log details server-side                  |

---

## 4. Mitigation Details

### A. Input validation and sanitization

All user input (titles, comments, descriptions) must be treated as untrusted:

* Escape or sanitize HTML before saving or rendering. Esaped by default by the framework  (React).
* Prefer plain text rendering in React.
* If rich text is needed, use a safe sanitizer.

### B. Content Security Policy (CSP)

A simple CSP helps prevent script injection even if input filtering fails.

**Example header:**

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  img-src 'self' https:;
  style-src 'self' 'unsafe-inline';
  connect-src 'self' https://grupp3-jynxa.reky.se;
  frame-ancestors 'none';
  object-src 'none';
```

### C. Safe image handling

* Allow only HTTPS image URLs.
* Use `alt` attributes for accessibility and `referrerpolicy="no-referrer"`.

### D. Secure dependencies and CI

* Pin external GitHub Actions by commit SHA.
* Run `npm audit` regularly. Integrate it in CI pipeline.
* Avoid committing `node_modules` or `.env` files.

### E. Error handling and monitoring

* Display simple user-friendly messages.

---

## 5. Example Security Tests

| Test                      | Purpose                             | Expected result                            |
| ------------------------- | ----------------------------------- | ------------------------------------------ |
| **Playwright XSS test**   | Inject `<script>` into recipe title | Script should be neutralized, no `alert()` |
| **CSP header check**      | Fetch homepage headers              | `Content-Security-Policy` present          |
| **Image validation test** | Insert invalid image URL            | Rejected or replaced by placeholder        |
| **Dependency audit**      | Run `npm audit`                     | No critical vulnerabilities                |

---

## 6. Summary and Recommendations

**Highest priority controls:**

1. Add CSP header in production build.
2. Ensure all user input is sanitized server-side.
3. Avoid `dangerouslySetInnerHTML` and similar risky DOM updates.
4. Validate external image URLs.
5. Keep dependencies updated and GitHub Actions pinned.

**Next steps for future improvement:**

* Implement rate-limiting on comment creation.
* Add Playwright E2E security tests to CI.
* Configure secret scanning in GitHub.