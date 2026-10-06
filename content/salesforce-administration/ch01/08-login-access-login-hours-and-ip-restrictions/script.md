# Lesson 8 — Login Access, Login Hours, and IP Restrictions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Everything so far has been about what a user can do once they're in. This lesson is about getting in at all — who's allowed to log in as whom, during what hours, and from which network. Three separate locks, and every Salesforce admin needs to know where each one lives.

## S2 · IMAGE: security-controls-menu.webp (Security Controls menu, Network Access highlighted)

All three start in the same neighborhood: Setup's Security Controls menu. Network Access sets trusted IP ranges for the whole org. Login Access Policies controls whether admins can log in as other users for support. And — one level down from this menu — Login Hours and Login IP Ranges live inside each individual profile, which we'll get to in a moment.

## S3 · STEPS CARD (Login Access / Login Hours / IP Ranges)

Three independent locks, each answering a different question. Login Access — can an admin log in as this user to troubleshoot something, without asking them to grant access first. Login Hours — during which days and times, per profile, can this person log in at all. And IP Ranges — from which networks, either trusted at the org level or strictly enforced at the profile level.

## S4 · IMAGE: login-ip-ranges.jpg (Login IP Ranges form, profile-level)

Here's Login IP Ranges on a profile. Enter a Start and End IP address, and anyone with this profile logging in from outside that range is blocked outright — no verification code, no fallback, just denied. That's different from the org-wide trusted ranges in Network Access, where being outside the range just triggers an identity-verification step instead of an outright block.

## S5 · IMAGE: profiles-nav.png (Profiles page + Administration nav)

And this is exactly why Profile keeps coming up in this chapter. Open any profile, and alongside the object permissions and field-level security from Lesson 5, you'll find Login Hours and Login IP Ranges sitting right there as related settings. A profile isn't just about what someone can do — it's also about when and where they're allowed to do it.

## S6 · OUTRO CARD

Who gets in, when, and from where — three locks, mostly living inside the profile you already know how to clone and edit. Next lesson, two more org-wide security settings: Password Policies and Session Settings.
