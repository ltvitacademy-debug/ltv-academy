# Lesson 35 — Practice Questions: Security and Governance

**Chapter 2 · DP-700 Certification Prep · Lesson 35 of 81**

## What you'll learn

- The security and governance controls DP-700 actually tests, and the layer
  each one operates at
- Two fully worked scenario questions, with the reasoning spelled out —
  not just the answer
- Why the wrong options in this domain are almost always a *real* Fabric
  control, just the wrong layer for the scenario
- How this maps back to Fabric & Real-Time Analytics Chapter 3
  (Lessons 60, 61, 63)

## Four controls, four different layers

Security and governance questions on DP-700 read like a scenario: an org
chart, an access requirement, a compliance concern. The four options are
almost never "one real control, three made-up ones" — they're four real
Fabric controls, and only one of them operates at the layer the scenario
actually needs.

| Control | What it actually governs | Taught in |
|---|---|---|
| Workspace role (Admin/Member/Contributor/Viewer) | What a person can do across *every* item in one workspace | Fabric Lesson 2 |
| Item permission | Access to *one specific item*, without granting a workspace role | Fabric Lesson 2 |
| OneLake data access role | Access scoped to folders/tables *inside* one lakehouse — finer than an item permission | Fabric Lesson 60 |
| Sensitivity label | Attaches to the *data itself* and travels with it, including through exports | Fabric Lesson 61 |
| Row-level security (RLS) | Filters which *rows* a user sees inside a semantic model, not the lakehouse | Fabric Lesson 13 |

Notice the pattern: workspace role is the broadest, item permission narrows
it to one item, a OneLake data access role narrows it further to specific
data inside that item, and RLS narrows it again to specific *rows* — but
only at the semantic-model layer, not the lakehouse. A sensitivity label is
different from all four: it isn't scoped to a workspace or item at all, it
rides along with the data wherever it goes.

## Worked question 1

**Scenario:** A finance analyst needs read access to just the `Revenue`
table inside a shared department lakehouse — not the other twenty tables
in that same lakehouse, and not the pipelines or notebooks in the
workspace.

**Tempting wrong answers:**

- Promote the analyst to workspace Contributor — too broad. A workspace
  role grants access to *every item* in the workspace (Fabric Lesson 2),
  not one table.
- Share the whole lakehouse item — still too broad. Item-level sharing
  grants the entire lakehouse, all tables included.
- Duplicate just the `Revenue` table into a new lakehouse for the analyst —
  breaks the single-source-of-truth principle from Fabric Lesson 60's
  governance coverage, and now there are two copies to keep in sync.

**Correct answer:** a OneLake data access role scoped to the `Revenue`
table's folder. It grants read access to exactly that data, independent
of the analyst's workspace role, and doesn't touch the other tables.

## Worked question 2

**Scenario:** A warehouse table holding customer PII has a "Confidential"
sensitivity label applied. A report is built on top of it, and a user with
export rights exports the report to Excel. Does the label persist on the
exported file?

**Tempting wrong answer:** the label is a workspace-level setting and
resets once the data leaves the warehouse for a report or an export. This
sounds plausible but gets the control backwards.

**Correct answer:** yes, it persists. Fabric Lesson 61 covers this
directly — sensitivity labels are Purview-backed and attach to the data
itself, not to the workspace it started in. They travel through the
semantic model, into the report, and into the exported file. This is
exactly why sensitivity labels exist as a *separate* control from
workspace roles and item permissions: those two reset at the workspace
boundary, but a label doesn't.

## Key terms

| Term | Meaning |
|---|---|
| OneLake data access role | Folder/table-scoped access inside one lakehouse, independent of workspace role |
| Sensitivity label | A Purview-backed tag that travels with the data through reports and exports |
| Least-privilege scoping | Granting the narrowest control that satisfies the scenario — usually the DP-700 correct answer |

## Check yourself

You're ready for Lesson 36 when, given a security scenario, you can name
which of these five controls actually applies — and explain why picking a
*broader* control than the scenario needs is the classic DP-700 wrong
answer.
