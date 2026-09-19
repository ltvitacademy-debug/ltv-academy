# Lesson 72 — Online vs. Offline Migration Strategies

**Chapter 12 · Database Migration to Azure · Lesson 72 of 95**

## What you'll learn

- The real difference between an online and an offline migration
- The actual trade-off a DBA has to present to the business — not just a technical choice
- What decides which one fits a given database

## Two paths to the same destination

Once assessment (Lesson 71) says a database is ready to move, there are
two fundamentally different ways to actually move it:

- **Offline migration** — pick a scheduled downtime window, take the
  source database out of service, copy it to the target, and bring the
  application back up pointing at Azure. Simpler to plan and execute,
  because nothing changes on the source while the copy happens. The risk
  is the window itself: for a large database, the copy can take longer
  than the business is willing to accept as downtime.

- **Online migration** — the source stays live and serving traffic while
  an initial copy runs, then ongoing changes keep syncing to the target
  until a short cutover at the very end. Downtime shrinks to minutes
  instead of hours, but the migration itself is more complex to run and
  monitor — someone has to watch that sync lag stay healthy for the
  entire migration window, which can be hours or days for a large
  database.

Neither one is universally "better." They trade complexity for downtime
in opposite directions.

## What actually decides it

- **Database size and change rate.** A large, high-write-volume database
  makes an offline window painfully long — online migration's ongoing
  sync is built for exactly this case. A small, mostly read-only database
  might finish an offline copy in minutes, making the added complexity of
  online migration unnecessary.
- **The business's actual downtime budget.** A nightly batch reporting
  system that's never queried at 2 a.m. anyway can absorb an offline
  window without anyone noticing. A customer-facing order system running
  24/7 cannot.
- **Team readiness to monitor a live sync.** Online migration isn't
  "set it and walk away" — someone needs to watch replication lag and be
  ready to troubleshoot it, for as long as the sync runs before cutover.
  A team unprepared for that monitoring burden may be safer choosing
  offline with a smaller, well-tested window instead.

## The trade-off a DBA actually presents

This is not purely a technical decision, and shouldn't be framed as one
to the business. The real conversation is: "here's how much downtime
each approach costs, and here's how much migration complexity and
monitoring each approach costs — which risk do you want to take on?"
A DBA who picks online migration by default, without asking whether the
business needed it, has added real complexity for a benefit nobody
actually needed.

## Key terms

| Term | Meaning |
|---|---|
| Offline migration | A scheduled downtime window; source and target aren't both live at once |
| Online migration | Continuous sync while the source stays live, ending in a short cutover |
| Cutover | The moment traffic actually switches from source to target |

## Check yourself

A customer-facing order-processing database with heavy write volume
needs to migrate. Which strategy fits better, and which of this lesson's
three deciding factors makes that call?
