# Lesson 11 — Authentication Concepts · Voiceover script

Segments map 1:1 to slides. Chapter 3 · Authentication and Security · Lesson 11 of 19.

---

## S1 · TITLE CARD

Every call in this course so far has needed credentials, but Chapter 3 is where we actually unpack what that means. Authentication answers one question: who are you? Authorization answers a different one: what are you allowed to do?

## S2 · STEPS CARD

Those are genuinely separate checks. Authentication proves your identity on every single call. Authorization then determines what that identity is permitted to see or change — a valid, authenticated user can still be denied access to a specific resource or business unit. And because REST is stateless, as Lesson 2 covered, neither is ever assumed from a request you made a moment ago.

## S3 · CODE CARD

Skip authentication entirely and Fusion never even gets to the authorization question. A GET request sent with no Authorization header at all comes back as a 401 Unauthorized, with a title and status explaining exactly that — credentials failed before permissions were ever checked.

## S4 · STEPS CARD

Oracle Fusion supports two ways to actually authenticate. Basic Authentication sends a username and password, base64-encoded, on every single call. OAuth 2.0 exchanges credentials once for a short-lived bearer token, used on every call after that instead of the raw password. Oracle's own documentation recommends OAuth 2.0 over Basic Authentication specifically because it's more secure.

## S5 · OUTRO CARD

Authentication proves identity, authorization governs what that identity can do, and Oracle Fusion gives you two paths to the first one. Next lesson, we put Basic Authentication and token-based OAuth side by side and look at exactly how each actually works.
