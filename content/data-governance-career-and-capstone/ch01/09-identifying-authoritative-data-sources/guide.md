# Lesson 9 — Identifying Authoritative Data Sources

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 9 of 35**

## What you'll learn

- How to formally declare a system of record for each domain in the
  Lesson 2 landscape
- The specific decision that finally resolves the Customer problem
  behind the Lesson 1 incident
- A survivorship rule for building one "golden record" out of three
  disagreeing sources
- How an authoritative-source decision gets documented, not just
  agreed to in a meeting

**Reminder:** LTV Global, its systems, and the decisions below are
fictional and illustrative, invented for this capstone.

## Declaring authoritative sources, domain by domain

With CDEs scored (Lesson 3), owned (Lesson 4), defined (Lesson 5),
classified (Lesson 6), checked (Lesson 7), and traced (Lesson 8), one
decision is still outstanding: when two systems disagree, which one
wins. Dana Whitfield convenes the four data owners to decide, domain
by domain:

| Domain | Authoritative source | Rationale |
|---|---|---|
| Product (`SKU`) | **Atlas** | Already the only system that assigns and permanently retires SKUs |
| Order / Order Total | **Atlas** | The only system with a completed, invoiced transaction |
| Marketing consent | **Beacon** | The only system where opt-in/opt-out is actually captured and managed |
| Customer identity | **Summit golden record** | No single source system; see below |

Three domains resolve in one meeting, because one system clearly does
the job no other system does. Customer identity doesn't resolve that
easily — Atlas, Beacon, and Comet each have a legitimate claim to part
of the picture, which is exactly why Lesson 1's DSAR took six weeks.

## Resolving Customer: the golden record decision

Rather than picking one of the three systems as the sole winner, the
owners agree to build a **golden record** in Summit — one reconciled
Customer entity per real person, assembled from all three sources
with an explicit survivorship rule for every field:

- **Match key:** `Email`, matched case-insensitively across Atlas,
  Beacon, and Comet (the same CDE defined in Lesson 5 and checked in
  Lesson 7).
- **Order history:** always sourced from Atlas — it's the only system
  with real, invoiced transactions.
- **Contact details** (phone, mailing address): the most recently
  updated value across all three systems wins, timestamped at the
  source.
- **Marketing consent:** always sourced from Beacon, regardless of
  what Comet's checkout form shows, since Beacon is the declared
  authoritative source for that domain.

This is the specific mechanism that would have answered the Lesson 1
DSAR in minutes instead of six weeks: one golden Customer ID, with
every field's value traceable to the rule that produced it.

## Documenting the decision

An authoritative-source decision isn't real until it's written down
somewhere everyone can find it — a verbal agreement in Dana Whitfield's
meeting doesn't survive the next reorg. Each decision gets logged:

| Field | Example entry |
|---|---|
| Decision | Customer identity resolved via Summit golden record, matched on Email |
| Date decided | This program's planning cycle |
| Decided by | Dana Whitfield (CDO), with Renata Silva, Tom Okafor, Grant Lindqvist |
| Rationale | No single source system reflects the full Customer picture; survivorship rules documented above |

## Key terms

| Term | Meaning |
|---|---|
| System of record | The one system formally declared authoritative for a domain |
| Golden record | A single reconciled entity built from multiple source systems, with explicit survivorship rules |
| Survivorship rule | The rule that decides which source's value wins for a given field when sources disagree |
| Match key | The field (or fields) used to recognize that records from different systems represent the same real-world entity |

## Lab

For one domain from your own Lesson 2 landscape lab where two systems
disagree, write a short authoritative-source decision: name the
winning system (or describe a golden-record approach like the one
above), state the match key if you need one, and write one
survivorship rule for a field that currently conflicts.

## Check yourself

- Why did Product, Order, and Marketing consent resolve in one
  meeting, while Customer identity needed a different approach?
- What field is used as the match key for LTV Global's Customer golden
  record, and why that field specifically?
- Why does an authoritative-source decision need to be logged, not
  just agreed to verbally?
