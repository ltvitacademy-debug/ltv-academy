# Lesson 12 — Basic Authentication vs. Token-Based Authentication · Voiceover script

Segments map 1:1 to slides. Chapter 3 · Authentication and Security · Lesson 12 of 19.

---

## S1 · TITLE CARD

Both authentication methods from last lesson ride in the exact same place: the Authorization header. What's actually encoded after the word Basic, or the word Bearer, is where they genuinely differ.

## S2 · CODE CARD

With Basic Authentication, that header holds username colon password, base64-encoded into one string — and that exact string gets sent again, unchanged, on every single call. With OAuth 2.0, you exchange credentials once to get a bearer token, and that token — not your password — rides in the header on every call after that.

## S3 · STEPS CARD

It's worth being precise here: base64 is encoding, not encryption. Anyone who intercepts a Basic Auth header can decode it back into the original username and password in seconds. The real protection on either method comes from sending every call over HTTPS, not from base64 itself.

## S4 · STEPS CARD

The practical difference shows up in two places. A leaked OAuth token can be revoked on its own, without anyone changing their actual password. And a token naturally expires after a set lifetime, while a leaked password keeps working until someone notices and changes it. There's also a hard constraint: Oracle Fusion REST calls cannot be made by users set up with multi-factor authentication when using Basic Authentication at all — OAuth 2.0 doesn't have that conflict.

## S5 · OUTRO CARD

Same header, same idea of proving identity — but a token that expires and can be revoked beats a password resent on every call. Next lesson asks the question underneath all of this: whose credentials should actually be sitting in that header in the first place?
