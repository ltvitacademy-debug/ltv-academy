# Documenting Gaps and Solutions

A gap identified in a fit-gap session is only useful once it's written down in a way the whole team — and, months later, the Technical Consultant or a steering committee reviewing cost — can act on. This lesson covers the gap/solution document itself: the fields it needs and the approval workflow that turns a classified gap into funded, scheduled work.

## What you'll learn

- The standard fields on a gap/solution log entry
- The solution options available once a gap is classified
- How effort estimates and business impact drive prioritization
- How Brightfield's extension gap moved from idea to approved work

## Fields on a gap/solution log entry

A gap/solution log is usually a structured register, one row per gap, with fields including:

- **Gap ID** — a unique identifier, often linked back to the originating requirement ID.
- **Description** — what doesn't work with standard functionality, in specific terms.
- **Business impact** — what happens if this gap isn't closed (a report doesn't get produced, a control is lost, a process takes longer).
- **Gap type** — configuration, process, or extension (Lesson 6).
- **Proposed solution** — the specific fix: which setup value, which process change, or what the extension needs to do.
- **Effort estimate** — a rough sizing of the work, usually in consultant/developer hours or days.
- **Priority** — how urgent closing this gap is relative to others competing for the same budget and timeline.
- **Owner** — who is accountable for delivering the solution.
- **Status** — open, approved, in progress, built, tested, closed.

## Solution options

Once a gap is logged, the team proposes one of several solution paths: a **configuration** change (no cost beyond consultant time already on the project), a **personalization** (page-level changes within Oracle's supported personalization framework), an **extension** (an Oracle Integration Cloud process, a custom report, a Visual Builder app), a **process workaround** (the business adjusts how it works, no system change), or — for lower-priority items — **deferred/backlog** (acknowledged, but not solved in this phase).

## Approval and prioritization

Not every gap gets funded immediately. Business impact and effort estimate together drive a prioritization conversation, usually in a steering committee or governance meeting: high-impact, low-effort gaps get approved quickly; low-impact, high-effort gaps often get deferred to backlog or a later phase. This is where "adopt, not adapt" gets tested against real budget constraints — sponsors are often asked directly whether a requested extension is worth its ongoing maintenance cost versus simply changing the business process.

## Brightfield Industrial Group: the extension gap, logged

Brightfield's legacy Treasury report format becomes gap **GAP-CM-03**: description, "Treasury's daily cash position report must match the exact column layout and subtotals of the legacy system's report"; business impact, "Treasury will not adopt the new system's standard report without this"; gap type, Extension; proposed solution, a custom BI Publisher report built against the standard Cash Positioning data model; effort estimate, three consultant-days; owner, the Technical Consultant. The steering committee approves it at the next governance meeting, given its low effort and direct tie to Treasury's adoption of the new system.

## Key terms

| Term | Meaning |
|---|---|
| Gap/solution log | A structured register of every gap, its classification, and its proposed fix |
| Business impact | What happens to the business if a gap is left unresolved |
| Effort estimate | A rough sizing of the work needed to close a gap |
| Deferred/backlog | A gap acknowledged but not solved in the current phase |

## Recap

A gap/solution log turns a fit-gap classification into an actionable, trackable item with a business impact, an effort estimate, a proposed solution, and an owner — and a prioritization conversation decides what actually gets funded now versus deferred. Brightfield's custom Treasury report moved from a workshop observation to approved, scheduled work in a few structured steps. Next up, lesson 8: configuration workbooks, where every fit (and every approved configuration gap) becomes a concrete setup decision.
