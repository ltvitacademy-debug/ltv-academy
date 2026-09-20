# Script — Capstone: Secure & Maintain

## Segment 1 (title)

The foundation is stable. Now you apply Chapters 5 and 6 to close the two biggest risks left on MERSQL01 — an app logging in as sa, and zero automated maintenance.

## Segment 2 (code: retiring sa)

You don't drop sa — it stays as a disabled break-glass account with a vaulted password. DispatchTrack gets its own dedicated login instead, scoped to only the permissions it actually needs, and the plaintext connection string on the shared drive gets deleted.

## Segment 3 (code: server audit, turned on)

Chapter 5 covered SQL Server Audit for exactly this — a durable record of every login attempt and schema change, written to its own drive, so nobody has to remember to go looking.

## Segment 4 (steps: Ola Hallengren, installed)

Chapter 6 named Ola Hallengren's scripts as the industry standard, and you install them against a database that's never had a single integrity check or index rebuild. Nightly full backups, log backups every fifteen minutes, weekly integrity checks and index optimization — the log backup job alone fixes the runaway log file for good.

## Segment 5 (outro)

Next up: a real production incident hits, and you apply Chapter 10's triage methodology to resolve it.
