# Lesson 7 — SAS Tokens · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Managed identities are for resources you control. But what about a
client you don't fully control — a browser upload, a mobile app?
That's what SAS tokens are for.

## S2 · SCREENSHOT (SAS URI anatomy)

A SAS token is a signed set of query string parameters appended right
onto a storage U-R-I. Everything after that question mark IS the
token — S-V is the signed API version, S-R is the resource type, S-P
is the permissions, and SIG is the actual cryptographic signature
proving whoever generated this had the account key, without that key
ever being exposed itself.

## S3 · SCREENSHOT (proxy pattern)

Here's the classic pattern this enables. A backend authenticates the
user, decides they're allowed to upload one specific file, generates a
SAS token scoped to exactly that, and hands it over. From there, the
client talks DIRECTLY to storage — the backend never has to proxy the
actual file bytes.

## S4 · STEPS CARD (comparison)

So the real difference: a managed identity is for a resource you
control, with standing, ongoing access. A SAS token is for a client
you don't fully control, or access that should genuinely expire.

## S5 · OUTRO CARD

And because the permissions and expiry are baked right into that
signed token, keep it short — revoking one early usually means
rotating the account key, which kills every SAS token signed with it.
Next lesson: the file formats every single lab in this course actually
uses. See you there.
