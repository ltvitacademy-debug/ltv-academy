# Lesson 9 — Password Policies and Session Settings · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Two more org-wide security settings close out the login side of this chapter. Password Policies decides how hard a password has to be. Session Settings decides how long a login stays valid once it's granted. Both apply to every user by default.

## S2 · IMAGE: password-policies.jpg (Password Policies page, full)

This is Password Policies, one single page covering the whole org. How long before a password expires. How many previous passwords get remembered, so people can't just cycle between two favorites. Minimum length and complexity requirements. And a lockout policy — how many failed attempts before the account locks, and for how long.

## S3 · STEPS CARD (Expires / History / Lockout / Override)

A few defaults worth knowing cold. Passwords expire every 90 days out of the box. The last three passwords are remembered, so none of them can be reused immediately. Too many invalid login attempts triggers a lockout. And critically — a profile's own password policy settings override these org-wide defaults for that profile's users, the same way Login Hours and IP Ranges did in the last lesson.

## S4 · IMAGE: security-controls-menu.webp (Session Settings highlighted)

Right below Password Policies in the same Security Controls menu sits Session Settings — a different question entirely. Not how strong is the password, but once someone's logged in, how long does that session actually stay alive. Timeout length, whether to lock a session to the IP address it started from, and whether to force a full logout to the login page when time runs out.

## S5 · IMAGE: setup-home.png (Setup Home, Quick Find box)

And like everything in this chapter, it's one Quick Find search away from the exact same Setup Home we opened in Lesson 1. Type Session Settings, adjust the timeout — fifteen minutes for strict environments, two hours is the usual default — and save.

## S6 · OUTRO CARD

Password Policies guards the front door, Session Settings decides how long you can stay once you're in. Final lesson of this chapter: Delegated Administration, for sharing admin work without handing out full System Administrator access.
