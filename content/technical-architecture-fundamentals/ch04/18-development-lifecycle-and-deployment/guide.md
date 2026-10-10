# Lesson 18 — Development Lifecycle and Deployment

**Chapter 4 · Delivery Domains · Lesson 18 of 19**

## What you'll learn

- Why an environment strategy is an architecture decision, not just an operational detail
- The real differences between Salesforce's sandbox types, and which stage of work each one actually fits
- Where scratch orgs fit differently from traditional sandboxes
- Why a documented, repeatable path from change to production matters more than any single tool in that path

## Environment strategy is architecture, not just operations

It's tempting to treat "which sandbox do we use for what" as a purely operational housekeeping question, separate from real architecture work. It isn't. A poorly designed environment strategy — developers building directly against something too close to production, or a team sharing one sandbox that different features keep colliding inside — causes real, expensive defects and delays, the same category of damage a bad data model or a bad sharing model causes. Deciding how changes move safely from an idea to a working feature in production is squarely part of a technical architect's accountability for a solution's long-term integrity, which Lesson 1 named as the role's defining concern.

## The sandbox types, and what each one is actually for

Salesforce offers several sandbox types, each trading off size and freshness differently, and a sound environment strategy generally uses more than one, each for the stage of work it actually fits:

- **Developer sandbox.** Copies metadata only (no production data), with a small storage allowance and a short refresh cycle. This is the right environment for one developer's (or a small team's) day-to-day feature coding and unit testing, where realistic production data volume doesn't matter yet.
- **Developer Pro sandbox.** The same metadata-only approach as Developer, but with meaningfully more storage, suited to larger teams or projects that need more room to build and test without yet needing real production data.
- **Partial Copy sandbox.** Copies metadata plus a configured sample of production data (via a sandbox template), with a longer refresh cycle than the Developer tiers. This is the typical environment for integration testing and user acceptance testing, where testers need data that behaves realistically without needing the full production dataset.
- **Full sandbox.** The closest replica of production: metadata and (per org configuration) a full copy of production data, with the longest refresh cycle of the group. This is reserved for final staging, performance testing at real scale, and training, precisely because it's the most expensive and slowest to refresh — not something to use casually for everyday feature work.

A separate, newer concept — the **scratch org** — isn't a sandbox at all. It's a disposable, fully configurable environment, typically defined and rebuilt from source-controlled configuration rather than copied from production, and it's commonly used in modern Salesforce DX-based development for short-lived feature work that gets spun up, tested, and torn down as part of an automated pipeline. (Exact storage limits, refresh intervals, and licensing eligibility for sandbox types vary by Salesforce edition and have changed over time across the sources checked for this lesson — always confirm current specifics on Salesforce's own sandbox documentation for the edition actually in use, rather than treating any specific number as fixed.)

## A typical pipeline shape

A common, sensible shape strings these environments together in order of increasing realism: feature work happens in a scratch org or Developer sandbox, integration and user-acceptance testing happens in a Partial Copy sandbox with realistic sample data, and final pre-release validation happens in a Full sandbox that mirrors production as closely as possible, before the change actually reaches production itself. Each stage exists to catch a different category of problem cheaply, before it reaches the next, more expensive and more consequential stage.

## Why the documented path matters more than any one tool

Whether a team moves changes along this pipeline using change sets, a managed package, or a CI/CD pipeline built on Salesforce DX and version control, the specific tool matters less than whether the path is actually documented, consistent, and followed every time, rather than skipped under deadline pressure for "just this one small change." A one-off change pushed directly into production outside the normal pipeline is exactly the kind of untested, unreviewed risk Lesson 8 covered — and it's also, not coincidentally, one of the most common real causes of a production incident that a proper review process would have caught.

## Key terms

| Term | Meaning |
|---|---|
| Developer sandbox | A metadata-only sandbox for individual day-to-day feature coding |
| Partial Copy sandbox | A sandbox with metadata plus a configured data sample, used for integration/UAT testing |
| Full sandbox | The closest replica of production, used for final staging and performance testing |
| Scratch org | A disposable, source-configured environment, distinct from a traditional sandbox, common in DX-based pipelines |
| Deployment pipeline | The documented, repeatable path a change follows from development through to production |

## Lab

A team currently does all of its development and testing directly in a single shared Full sandbox, because "it's the closest to production so it's safest." Explain, using this lesson's environment concepts, one real problem with this approach, and propose a better environment sequence for this team's actual day-to-day feature work versus their pre-release validation.

## Check yourself

Can you name at least three Salesforce sandbox types and what stage of work each one actually fits? Can you explain how a scratch org differs conceptually from a traditional sandbox? Can you explain why having a documented, consistently-followed deployment path matters more than which specific tool implements it?
