# Lesson 24 — Keeping Architecture Documentation from Going Stale

**Chapter 6 · Architecture Decision Records and Documentation · Lesson 4 of 4**

## What you'll learn

- Why architecture documentation rots even when the original ADRs and
  diagrams were written well
- How co-locating ADRs with the IaC repository from Chapter 2's
  Terraform and Bicep work keeps documentation and infrastructure from
  drifting apart
- What a real review trigger looks like, tied to the size of a change
  instead of a calendar
- The status lifecycle that lets an ADR go out of date honestly,
  instead of silently

## Why good documentation still rots

Nothing in Lessons 21 through 23 prevents documentation from going
stale on its own. A well-written ADR and a clean C4 diagram are both
snapshots — accurate the day they were written, and only as accurate
as the system stays unchanged afterward. The actual failure mode isn't
that teams write bad documentation; it's that documentation lives
somewhere disconnected from the thing it describes, so nothing ever
reminds anyone to update it when the system moves on. A wiki page
about the network topology and the Terraform code that actually
defines the network topology can drift apart for a year before anyone
notices, because changing one never requires touching the other.

## Co-locating ADRs with the IaC repository

The fix that scales is physical, not procedural: put the documentation
in the same repository as the infrastructure code it describes, not in
a separate wiki or document store. A `docs/adr/` directory sitting
alongside the `network/`, `landing-zone/`, and `modules/` directories
from the Terraform and Bicep work in Chapter 2 means:

```
repo-root/
  docs/
    adr/
      0001-hub-and-spoke-topology.md
      0002-rto-rpo-targets-for-tier-1-workloads.md
      0012-landing-zone-account-boundaries.md
  landing-zone/
    *.tf
  network/
    *.tf
  modules/
    *.tf
```

That placement does three things a separate wiki never does. First,
ADRs get versioned in the same git history as the code, so you can
check out the repository at any past commit and see exactly which
decisions were in force at that point. Second, a pull request that
changes `network/hub-vnet.tf` can — and should — be required to touch
or at least reference the relevant file in `docs/adr/` in the same
diff, which makes the connection between decision and implementation
visible at review time instead of invisible forever. Third, deleting
or renaming infrastructure naturally surfaces the ADRs that reference
it, because they're sitting in the same searchable codebase instead of
a wiki nobody thought to check.

## Review triggers tied to real changes, not a calendar

A quarterly "go review all the architecture docs" calendar reminder is
the first thing to get skipped when a team is busy — and a team that's
busy shipping infrastructure changes is exactly the team whose
documentation needs the most attention. The more durable version is a
trigger tied to the size and kind of a change itself:

- A pull request template checklist item for anything touching
  `network/`, `landing-zone/`, or `modules/`: "Does this change
  require a new ADR, or does it update the Consequences of an existing
  one?"
- A required reviewer rule on `docs/adr/` for infrastructure
  directories that changed RTO/RPO classification, account boundaries,
  or network topology — the same categories of decision this course
  spent five chapters building.
- A link from the PR description to the ADR it implements, so a
  reviewer checking a large infrastructure change can confirm the
  change actually matches what was decided, not just that *something*
  was decided once.

This doesn't replace periodic review entirely — a milestone like a
major version bump or a new region launch is still a reasonable point
to sanity-check the whole document set — but the everyday mechanism
that actually keeps pace with a system that changes every week is tied
to the changes themselves, not to the calendar.

## The status lifecycle: never delete, always supersede

An ADR that's out of date is not a bug to quietly fix by deleting the
file. It's useful history that should stay findable, with its status
updated to say so:

- **Proposed** — written, not yet agreed on.
- **Accepted** — the decision in force.
- **Deprecated** — no longer followed, with no clear replacement
  recorded yet.
- **Superseded by ADR-00XX** — replaced by a specific later decision,
  linked by number in both directions.

Marking ADR-0001 as "Superseded by ADR-0014" and leaving both files in
the repository means a reader who stumbles onto the old file still
gets the full picture: what was originally decided, why, and exactly
what later replaced it and when. Deleting ADR-0001 instead would
recreate the exact oral-history problem this chapter opened with — the
next engineer who finds a reference to "ADR-0001" in an old commit
message would have nothing to actually read.

## Key terms

| Term | Meaning |
|---|---|
| Co-location | Storing ADRs in the same repository as the infrastructure code they describe, instead of a separate wiki |
| Review trigger | A rule that forces an ADR check at the moment a relevant change is made, rather than on a calendar schedule |
| Deprecated | An ADR status meaning the decision is no longer followed, with no specific replacement yet recorded |
| Superseded | An ADR status meaning a later, specific ADR has replaced this decision; both records are kept and cross-linked |

## Check yourself

You've finished Chapter 6 when you can explain, without looking: why
does co-locating ADRs with the IaC repository, rather than a separate
wiki, keep decisions and infrastructure from drifting apart, and why
is superseding an old ADR better than deleting it?
