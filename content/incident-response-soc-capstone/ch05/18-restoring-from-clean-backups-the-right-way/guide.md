# Lesson 18 — Restoring from Clean Backups the Right Way

**Chapter 5 · Eradication & Recovery · Lesson 18 of 32**

## What you'll learn

- Why the most recent backup is not automatically the safe one to restore from
- How to use the earliest-confirmed-compromise timestamp from the investigation's own timeline to pick a backup that actually predates the attacker
- Why the backup itself has to be verified clean before it's trusted, not just old enough
- The real risk of a "backdoored backup" — and why the backup service account's own credentials matter just as much as the backup's age

## The most recent backup isn't automatically the safe one

Once Meridian's rogue account, scheduled task, and registry entry are gone and the Remote
Desktop Gateway is patched, the billing database server still has to come back. The instinct is
to restore it from last night's backup — but "most recent" and "safe" are two different
questions, and treating them as the same one is a common, costly mistake in real incident
response. A backup taken *after* the attacker had already gained access can contain the
attacker's changes baked right into it: a backdoor, a modified file, or the same rogue account
lesson 17 just removed. Restoring from that backup doesn't recover the system — it reintroduces
the compromise, cleanly disguised as a restore.

## Using the timeline to pick the right backup

This is exactly where Chapter 3's timeline reconstruction work pays off. Meridian's SOC traced
the earliest confirmed evidence of compromise to 11:40 PM on a Tuesday, from a log entry
showing the attacker's first authenticated session on the Remote Desktop Gateway. The billing
database server's backup job runs nightly at 1:00 AM. That means the backup taken at 1:00 AM
Wednesday — the most recent one — was captured *after* the 11:40 PM compromise and cannot be
trusted. The backup from 1:00 AM Tuesday, 24 hours earlier, predates the confirmed compromise
and is the one the team restores from. The rule is simple to state and easy to get wrong under
pressure: pick the backup against the confirmed compromise timestamp, not against the calendar.

## Verifying the backup is actually clean

Predating the compromise narrows the field, but it doesn't finish the job — the backup still
has to be checked, not assumed. Meridian's team restores the Tuesday 1:00 AM backup to an
isolated, non-production environment first and runs an updated endpoint detection and response
(EDR) scan against it with current threat intelligence, since a backup taken before the
*confirmed* compromise date can still miss an earlier, undetected stage of the same intrusion.
They also verify the backup's own integrity — checksums match what the backup system recorded
at capture time — to rule out the backup having been tampered with after the fact, which
matters because of what backup software usually has access to.

## The backdoored backup risk: it's not just about timing

Backup software is typically granted extremely broad access — often a domain-level service
account with permission to read every file on every server it backs up, specifically so it can
do its job. If an attacker's lateral movement ever reached that backup service account's
credentials, they could tamper with backup jobs, corrupt stored backups, or plant something
inside a backup image directly, independent of when the backup was actually taken. That's why
Meridian's team checks one more thing before trusting the restore: whether the backup service
account itself shows up anywhere in the incident's scope of compromised credentials. A backup
that predates the attack by timestamp but was captured using credentials the attacker also
controlled is not actually a known-good backup — it's an unverified one that happens to have an
old date on it.

## Key terms

| Term | Meaning |
|---|---|
| Known-good backup | A backup confirmed to predate the earliest confirmed compromise timestamp *and* verified clean, not just the most recent one available |
| Backdoored backup | A backup that reintroduces attacker access or tampering when restored, because it was taken after compromise or tampered with after capture |
| Backup integrity verification | Checking a backup's checksums against what was recorded at capture time, to confirm it hasn't been altered since |
| Backup service account | The often highly privileged account backup software uses to read every server it protects — a high-value target if compromised |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why might a backup taken
*before* the confirmed compromise timestamp still need to be scanned and integrity-checked
before it's trusted for restore?
