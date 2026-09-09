# Lesson 78 — SQL Server Authentication Modes · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Back in Lesson 2, we introduced two ways to log into SQL Server —
Windows Authentication and SQL Server Authentication — and promised
we'd come back to how a server actually decides which one it accepts.
Here's that promise, kept, closing out Chapter 8.

## S2 · STEPS CARD (WINDOWS ONLY / MIXED MODE)

A SQL Server instance runs in one of exactly two modes. Windows
Authentication Mode accepts only Windows logins — a SQL Server login
gets rejected outright, even if it genuinely exists. Mixed Mode,
formally SQL Server and Windows Authentication Mode, accepts both kinds
at once. And here's a detail worth remembering: there's no mode that
accepts ONLY SQL Server logins. Windows Authentication is always
available, in both modes.

## S3 · STEPS CARD (security vs. flexibility)

Windows Authentication Mode alone is generally considered more secure
for an all-Windows environment — it centralizes credentials in Active
Directory, inherits your organization's existing password policies, and
avoids a second, separate set of credentials that could leak. Mixed
Mode becomes necessary the moment you need to support applications or
users outside the Windows domain, legacy systems built specifically
around SQL logins, or non-Windows clients that simply can't use Windows
Authentication at all.

## S4 · OUTRO CARD

That closes out Chapter 8. You now understand how SQL Server keeps
multi-step changes safe — transactions, the ACID properties behind
them, locking and isolation, blocking and deadlocks, catching and
raising errors, and now, who's even allowed to connect in the first
place. Chapter 9 shifts to window and ranking functions — ROW_NUMBER,
RANK, DENSE_RANK, and NTILE. See you there.
