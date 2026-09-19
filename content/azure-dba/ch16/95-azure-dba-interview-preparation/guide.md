# Lesson 95 — Azure DBA Interview Preparation

**Chapter 16 · Certification & Interview Preparation · Lesson 95 of 95 — Course Finale**

## What you'll learn

- How to structure an answer to a scenario-based DBA interview question, not just recite facts
- A dozen genuine, realistic scenarios spanning everything this course covered
- What this course actually completes — and what's still ahead
- That this is the last lesson: there's no Lesson 96

## Structuring an answer, not reciting a fact

A DBA interview rarely asks "define an index." It asks something
closer to real work: a situation, then "walk me through how you'd
handle it." The strongest answers follow a real shape — **clarify
the actual constraint, name the relevant tool or concept, explain
the trade-off, then state what you'd verify afterward** — the same
shape Chapter 15's project made you practice on one continuous
scenario. Reciting a definition without that shape reads as
memorized, not understood.

## Twelve real scenarios

**1. "The database is suddenly slow. What do you check first?"**
Start with Lesson 44's methodology, not a guess — wait stats first
(is it CPU, I/O, or locking), then narrow from there. Naming the
methodology before naming a tool shows you'd actually diagnose it,
not just try things.

**2. "A query was fast yesterday, slow today, with no code changes.
What's your first move?"** Query Store (Lessons 48-49) — this is
exactly the regression-detection scenario it exists for.

**3. "How would you plan migrating a 2TB production database with
minimal downtime?"** Assess first (Lesson 71), then online vs.
offline (Lesson 72) — for 2TB specifically, name why an online
migration strategy is usually worth the added complexity over a
maintenance-window approach.

**4. "Walk me through your backup strategy for a database that
can't lose more than 15 minutes of data."** Name that as an RPO
requirement first (Lesson 83), then explain what backup/replication
cadence actually satisfies a 15-minute number, not just "we take
backups."

**5. "How do you decide between Azure SQL Database and Managed
Instance for a new project?"** Lesson 14's decision framework —
feature-compatibility need, instance-level features (SQL Agent,
cross-database queries), not just "which is cheaper."

**6. "A developer says they can't connect to the database. How do
you troubleshoot?"** Lesson 30's real checklist — firewall rule,
VNet/NSG, DNS resolution for Private Link, TLS version — in that
kind of order, not randomly.

**7. "Explain RPO and RTO to a non-technical stakeholder."** Two
plain-language sentences, no jargon: "RPO is how much recent work
we could lose. RTO is how long we'd be down." Being able to drop the
jargon on request is itself a real interview signal.

**8. "How would you find and fix a deadlock?"** Lesson 50 — a
deadlock graph identifies the victim and the two competing resources;
the real fix is usually access-order consistency, not a bigger
server.

**9. "What's your process before enabling `db_owner` for an
application account?"** Lesson 24's least-privilege discipline —
name the specific permissions actually needed first, and treat
`db_owner` as a last resort, not a default.

**10. "How do you know your disaster recovery plan actually
works?"** Lesson 89 — you test it, on a real schedule, not just
document it and hope.

**11. "A SQL Agent job fails intermittently. What do you check?"**
Lesson 62 — job history and the specific step, then the account it
ran as, since intermittent failures often point at a resource
contention or a dependency timing issue, not the T-SQL itself.

**12. "How would you prove to an auditor that a table's history
wasn't tampered with?"** Ledger (Lesson 37), specifically — and why
Change Tracking or plain auditing alone wouldn't satisfy that
specific ask.

## What this course actually completes

95 lessons, 16 chapters — this course completes the **Azure Database
Administrator** career path's **Job-Ready stage**, alongside T-SQL
Development, Azure Fundamentals, and Data Factory (all already
built). That stage is genuinely done. The path's **Advanced stage**
still has PowerShell Fundamentals ahead of it (Terraform & Bicep and
Git/GitHub/CI-CD are already built) — this course doesn't claim to
close that out, and it isn't the whole path yet.

## You're done with this course

There's no Lesson 96. You're ready when you can pick any scenario
above, out loud, without looking, and walk through it the way a real
interview expects — constraint, tool, trade-off, verification — not
just name the right term.

Congratulations on finishing Azure Database Administrator.
