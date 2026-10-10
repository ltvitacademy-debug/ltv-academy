# Lesson 3 — Sandboxes and Sandbox Types

**Chapter 1 · Environments · Lesson 3 of 14**

## What you'll learn

- What a Salesforce sandbox actually copies from production, and what it doesn't
- The four sandbox types and how they differ in storage, data, and intended use
- Why an architect chooses a sandbox type based on purpose, not just "the biggest one available"
- Why sandbox license editions and cost are part of this decision, not an afterthought
- How these four types map onto the promotion path from Lesson 1

## What a sandbox is

A **sandbox** is a copy of a Salesforce org that lives inside the same organization record as production but is otherwise a separate, isolated environment: separate data, separate storage, separate users logging in with sandbox-specific usernames. Every sandbox copies production's metadata — objects, fields, page layouts, Flows, Apex, permission sets — as of the moment it's created or last refreshed. Whether it also copies any of production's actual *records* depends entirely on which of the four sandbox types you choose.

## The four sandbox types

Salesforce offers four sandbox types, and they differ along two main dimensions: how much storage they get, and whether they include real data.

| Type | Storage | Data included | Typical use |
|---|---|---|---|
| Developer | 200 MB | None — metadata only | Individual building and unit testing |
| Developer Pro | 1 GB | None — metadata only | Larger in-progress configuration or development projects |
| Partial Copy | Up to 5 GB | A sampled subset of production records, defined by a sandbox template | Realistic QA and user training without a full data copy |
| Full | Matches production | All of production's data | Staging, performance testing, final sign-off before release |

Developer and Developer Pro sandboxes are metadata-only, which is why they're the natural fit for the development tier covered in Lesson 2 — they're fast to create, cheap to maintain, and don't carry any of the privacy or storage overhead of real records. Partial Copy and Full sandboxes exist specifically because some testing can't be trusted without realistic data: a report, a Flow with a SOQL query inside a loop, or a page layout with a related list can all behave very differently against a handful of sample records than against the data volumes production actually carries.

Partial Copy sandboxes use a **sandbox template** — a saved definition, built once in Setup, of which objects and how many records of each to include on every refresh — to control the size and shape of the sample they copy in. A Full sandbox needs no such template, because by definition it copies everything.

## Choosing a type by purpose, not by size

A common mistake is defaulting to the biggest sandbox available "to be safe." That's backwards: a Full sandbox is the slowest to refresh, the most expensive to maintain, and carries the most privacy exposure, because it holds a complete copy of every real customer record in production. An architect's job is to match the sandbox type to what the environment actually needs to prove:

- Need to build a new field or Flow with no real data required? Developer or Developer Pro.
- Need to test against realistic — but not complete — data volumes, for QA or user training? Partial Copy.
- Need a true, full-scale rehearsal of a release, or to test performance against production-sized data? Full.

Reaching for Full by default when a Partial Copy would do means paying for storage, refresh time, and data-exposure risk that the task never actually needed.

## Editions and cost

Full sandboxes aren't available by default in every Salesforce edition — they typically come with Unlimited and Performance editions, or must be purchased separately in editions that don't include them. That's a real planning input: an architect designing environment strategy for an org on a lower edition may need to budget for a Full sandbox license explicitly, or design around not having one at all (for example, by relying more heavily on Partial Copy plus a careful, well-rehearsed go-live checklist).

## How this maps to the promotion path

Mapping sandbox types onto Lesson 1's promotion path is a useful default, though Lessons 5 and 6 will cover the Testing and Staging tiers in more depth:

```
Development        Testing              Staging
(Developer /        (Partial Copy —      (Full — matches
 Developer Pro)       realistic sample)    production exactly)
```

This isn't a rule enforced by Salesforce — it's a design pattern that matches each tier's actual need (speed vs. realism vs. completeness) to the sandbox type built for it.

## Key terms

| Term | Meaning |
|---|---|
| Sandbox | An isolated copy of an org's metadata (and, for some types, data) used for building and testing |
| Sandbox template | A saved definition of which objects/records to include when refreshing a Partial Copy sandbox |
| Developer / Developer Pro sandbox | Metadata-only sandboxes at 200 MB / 1 GB storage |
| Partial Copy sandbox | A sandbox with a sampled data subset, up to 5 GB, defined by a template |
| Full sandbox | A sandbox matching production's full data and storage |

## Lab

An org on Enterprise Edition (which does not include a Full sandbox by default) needs to rehearse a major release that touches pricing logic used in high-volume batch jobs. Using only Developer, Developer Pro, and Partial Copy sandboxes, propose a testing approach that gets as close as realistically possible to validating this release without a Full sandbox. Be specific about which sandbox type you'd use for which part of the rehearsal, and name the one risk you can't fully eliminate without a true Full sandbox.

## Check yourself

Can you name all four sandbox types along with their approximate storage and whether each carries real data? Can you explain why "always use the biggest sandbox" is the wrong default, and describe one concrete testing scenario where a Partial Copy sandbox is clearly the better choice over a Full sandbox?
