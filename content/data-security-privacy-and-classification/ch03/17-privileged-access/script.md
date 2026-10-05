# Lesson 17 — Privileged Access · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every control in this chapter applies to privileged accounts too, but they
get extra layers on top. A compromised sysadmin or domain admin account
can touch almost everything — the blast radius is close to the whole
environment.

## S2 · STEPS CARD (PAM vault)

A PAM system changes how admins get elevated access. The password lives
in a vault the admin doesn't directly know. They check it out for a
session, and the vault can rotate it automatically afterward — closing
shared passwords, stale rotation, and no record of who used it.

## S3 · STEPS CARD (JIT for admin rights)

Applied to admin rights specifically: nobody holds sysadmin permanently.
They request elevation, state a reason, get approved, and receive it for
a bounded window. When the window closes, it's automatically removed.
Most of the account's life is spent at normal privilege.

## S4 · STEPS CARD (break-glass + session recording)

Break-glass accounts are last-resort credentials for when the normal PAM
system itself is down — used rarely, triggering an automatic alert and
mandatory review every time. Session recording logs what commands ran
during a privileged session, so there's a precise record if something
goes wrong.

## S5 · OUTRO CARD

That closes Chapter 3 on access control. Chapter 4 shifts from who can
reach the data to protecting the data itself — starting with data masking.
