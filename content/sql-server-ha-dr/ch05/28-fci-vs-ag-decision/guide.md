# FCI vs. AG: Which One?

Chapter 4 was a deep dive into Availability Groups. This chapter has been a deep dive
into Failover Cluster Instances. Both are legitimate, widely-deployed Microsoft HA
technologies — this lesson is the honest comparison neither chapter gave on its own,
including the real answer many production environments actually land on: both, together.

## What you'll learn

- What each technology actually protects against — and, just as importantly, what it doesn't
- The real cost/requirement tradeoffs (shared storage vs. licensing/edition)
- Why "FCI and AG combined" is a common, legitimate real-world pattern, not a compromise

## What each one protects against

- **FCI** protects against a **node failure** — if the physical server, OS, or hardware
  running SQL Server dies, another node picks up the same instance on the same shared
  storage. What it does **not** protect against is a failure of the **shared storage
  itself**: if the SAN or storage fabric goes down, every node loses access simultaneously,
  because there was only ever one copy of the data. Shared storage is a single point of
  failure that an FCI, by itself, cannot survive.
- **AG** protects at the **database level**, replicating to separate, independent copies of
  storage on separate replicas. A storage failure on the primary doesn't touch the
  secondary's independent storage at all — this is AG's real advantage over FCI. What AG
  doesn't give you for free is FCI's shared-storage simplicity; each replica needs its own
  full storage footprint, and depending on the number of secondaries and features used
  (like readable secondaries), edition and licensing considerations become part of the
  decision in a way a single-instance FCI doesn't require.

## The real tradeoffs, side by side

| | FCI | AG |
|---|---|---|
| Protects against | Node failure | Node failure *and* storage failure (per replica) |
| Requires shared storage | Yes — this is its architecture | No — each replica has independent storage |
| Storage as single point of failure | Yes | No |
| Licensing/edition considerations | Simpler — one instance | More involved — multiple replicas, features like readable secondaries |
| Protection granularity | Whole instance | Per-database |

## The honest real-world answer: often both

Because FCI and AG protect against different failure modes, a common, legitimate
production pattern is to combine them: run SQL Server as an FCI at each site (protecting
against node failure without needing per-node storage), and then build an Availability
Group between FCIs at different sites or storage arrays (protecting against the shared
storage itself failing, and enabling geographic DR). This isn't a compromise or an
indecision — it's a deliberate design that gets node-level protection cheaply within a
site and storage/site-level protection between sites, layering the two technologies rather
than choosing one over the other.

## Key terms

| Term | Meaning |
|---|---|
| Single point of failure | A component whose failure takes down the whole system, with no redundancy for it |
| Readable secondary | An AG feature letting a secondary replica serve read-only queries — a licensing/edition consideration |
| FCI + AG combined | A layered pattern: FCI within a site for node protection, AG between sites for storage/site protection |

## Check yourself

A team's shared SAN goes offline entirely. They're running a plain FCI with no AG on top
of it. Does SQL Server fail over to another node successfully? Explain why or why not,
based on what an FCI can and cannot protect against.
