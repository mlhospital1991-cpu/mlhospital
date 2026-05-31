# Web Security Checklist & Mitigations

This document outlines the major security vulnerabilities and the measures implemented in this project to secure the application.

---

## 1. Injection Vulnerabilities

### SQL Injection (SQLi)
*   **Threat**: Exploiting raw database input to run unauthorized queries.
*   **Mitigation**: 
    *   The application uses **Prisma ORM**, which utilizes fully parameterized queries for all operations. This automatically isolates inputs and prevents SQL injection.
    *   Avoid using `prisma.$queryRaw` with string concatenation.

### Cross-Site Scripting (XSS)
*   **Threat**: Injecting malicious JavaScript scripts execution into users' browsers.
*   **Mitigation**:
    *   Next.js and React escape values rendered in JSX by default, protecting against XSS.
    *   Set strict **Content Security Policy (CSP)** headers (configured in `next.config.ts`) to block untrusted external scripts.
    *   Set `httpOnly` on session cookies to prevent script-based reading.

---

## 2. Broken Authentication & Session Management

### Session Theft & Hijacking
*   **Threat**: Intercepting user session cookies.
*   **Mitigation**:
    *   The session cookie (`admin_session`) is set with:
        *   `httpOnly: true` (prevents JavaScript access to the cookie).
        *   `secure: true` in production (forces HTTPS transmission).
        *   `sameSite: "lax"` (mitigates CSRF requests).
        *   An expiry limit of 24 hours.

### Brute Force & Credential Attacks
*   **Threat**: Automated dictionary attacks guessing credentials.
*   **Mitigation**:
    *   Enforced cryptographically strong password hashing using `bcryptjs` with a cost factor of 10.
    *   Rate limiting API routes (recommended using Cloudflare or middleware rules).

---

## 3. Broken Access Control (Authorization)

### Insecure Direct Object References (IDOR/BOLA)
*   **Threat**: Manipulating IDs in parameters to access other users' data.
*   **Mitigation**:
    *   All admin control API routes check session permissions using `getSession()` on the server side before resolving any database mutations.
    *   All queries filter objects matching the authenticated session rather than trusting the client-provided user IDs.

---

## 4. Client-Side Attacks

### Cross-Site Request Forgery (CSRF)
*   **Threat**: Forging authenticated requests from external origins.
*   **Mitigation**:
    *   Explicitly marked session cookies with `sameSite: "lax"` to block automatic cookie transmission on cross-origin state-changing actions.

### Clickjacking
*   **Threat**: Overlaying transparent layers to capture clicks.
*   **Mitigation**:
    *   Configured the `X-Frame-Options: DENY` header in `next.config.ts` to prevent loading this site inside frame pages.

---

## 5. Security Misconfigurations & Transmission

### Man-in-the-Middle (MitM)
*   **Threat**: Sniffing credentials or tokens on unencrypted lines.
*   **Mitigation**:
    *   Enforced HTTPS strictly.
    *   Added **Strict-Transport-Security (HSTS)** headers (`max-age=31536000; includeSubDomains; preload`) to instruct browsers to use HTTPS only.

---

## 6. Configured Security Headers

The following secure headers are applied in [next.config.ts](file:///c:/Users/Dell/Blackjoker/ML%20hospital/next.config.ts):

*   **X-Frame-Options**: `DENY`
*   **X-Content-Type-Options**: `nosniff`
*   **Referrer-Policy**: `strict-origin-when-cross-origin`
*   **Strict-Transport-Security (HSTS)**: `max-age=31536000; includeSubDomains; preload`
*   **Content-Security-Policy (CSP)**: Restricts script, style, frame, and font sources.
