# Lesson 61 — Handling PII and Sensitive Data · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Handling PII and sensitive data — what actually counts as
sensitive in this course's own taxi data.

## S2 · CODE CARD (what counts as PII)

A name or phone number is obviously sensitive. Precise pickup and
dropoff coordinates are less obvious, but repeated across trips,
they can reveal exactly where someone lives and works.

## S3 · CODE CARD (three distinct controls)

Classification tags a field's sensitivity. Access control
restricts who can query it unmasked. Masking shows a transformed
value instead. Together, an aggregated view for everyone, exact
coordinates for a narrow audited group.

## S4 · STEPS CARD (real-time raises the stakes)

Unmasked PII in a live dashboard is exposed the moment it happens
— fixing the masking rule after doesn't un-expose it. The cheapest
real fix is never letting the field flow downstream at all.

## S5 · OUTRO CARD

Minimize first, then classify and mask what remains. Next up:
secrets management — protecting the credentials, not just the
data.
