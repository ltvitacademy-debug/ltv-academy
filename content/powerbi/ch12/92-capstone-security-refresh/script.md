# Lesson 92 — Configure Security & Refresh · Voiceover script

Segments map 1:1 to slides. Target: ~3.5 minutes total.

---

## S1 · TITLE CARD

Regional managers should only see their own territory. This is
exactly the dynamic RLS scenario Chapter Eleven built toward.

## S2 · CODE: [UserEmail] = USERPRINCIPALNAME() -> one role, every manager

One role, one filter, matched against a user-mapping table — every
manager sees only their own region, across all three report pages at
once, since RLS filters the whole model.

## S3 · CODE: Test as role first -> then assign real members

Validate before trusting it. Confirm the filter works, and that your
mapping table's email format matches what the service actually
returns, before adding a single real person.

## S4 · STEPS: Schedule refresh -> confirm gateway online -> daily cadence

A nightly refresh is realistic here — this dashboard was never scoped
for real-time data.

## S5 · CODE: App audience -> VP + managers -> view access only

Share the app with exactly who the scope intended, granting view
access only — nothing more than this project ever called for.

## S6 · OUTRO CARD

Security configured, refresh scheduled, access matched to scope.
Lesson 93 closes the whole course: presenting the finished dashboard.
