# Lesson 16 — Documentation Templates

**Chapter 3 · Practice · Lesson 16 of 17**

## What you'll learn

- What a documentation template standardizes, and what it deliberately leaves for the architect to fill in with judgment
- The real trade-off between standardization and over-templating
- How to build a minimal, reusable SDD template from everything covered in this course
- Why a template needs an owner and a version, exactly like the documents it produces

## What a template actually standardizes

A **documentation template** is a pre-built skeleton — the section headings, the expected tables, the required fields like "Status" and "Verified date" — that every document of a given type starts from, so an architect isn't reinventing the SDD structure from Lesson 7 or the ADR format from Lesson 6 on every new project. A template standardizes *structure*: which sections exist, in what order, with what headings. It deliberately does not standardize *content* — the actual reasoning, trade-offs, and decisions inside those sections are the architect's real work, and a template that tried to pre-fill that judgment would be actively harmful, not helpful.

## The over-templating trade-off

Templates are a genuine trade-off, not a free efficiency win. A good template saves real time and enforces real consistency — Lesson 8's diagramming standards and this lesson's documentation templates are the same underlying idea applied to prose structure instead of diagram notation. A bad template becomes a box-ticking exercise: an architect fills in every section because the template demands it, including sections that don't apply to this particular solution, producing a document that's long, internally inconsistent, and harder to read than if the irrelevant sections had simply been omitted. The fix isn't to abandon templates — it's to make every section's presence conditional on relevance, with explicit guidance to state "Not applicable — [one-sentence reason]" rather than either silently omitting a section (which looks like an oversight) or padding it with irrelevant content (which wastes a reader's time and buries what actually matters).

## A minimal, reusable SDD template

Pulling together Lesson 7's standard sections with this course's other lessons, a reusable SDD template skeleton looks like this:

```
# Solution Design Document: [Solution Name]
Status: [Draft | In Review | Approved | Superseded by SDD-0XX]
Version: [X.X]  Last reviewed: [date]  Owner: [name/role]

## 1. Business Context and Requirements
## 2. System Context
   [System context diagram — Lesson 3]
## 3. Data Model
   [ERD with legend, object inventory table, field-level notes — Lessons 2, 8, 12]
## 4. Automation and Process Design
## 5. Integration Design
   [Per-integration: pattern, direction, auth, mapping, error handling, volume — Lesson 13]
   [Sequence diagram where order/timing is ambiguous in prose — Lesson 5]
## 6. Security and Sharing Model
   [Access matrix — Lesson 14]
## 7. Key Decisions
   [Links to relevant ADRs — Lesson 6]
## 8. Non-Functional Requirements
## 9. Assumptions and Open Items
## Appendix: Executive Summary
   [One page, four questions — Lesson 11]
```

This is a skeleton, not a finished document — every bracketed note is a pointer to the lesson that teaches how to fill that section well, not a substitute for doing the actual design thinking.

## A template needs an owner and a version, too

It's easy to treat a template itself as a one-time setup task rather than a living artifact — but a template that never gets revisited accumulates the same kind of rot Lesson 15 described for individual documents: a section that made sense for the kind of project the template was built for stops fitting as the team takes on different kinds of work, and nobody updates the template because nobody owns updating it. A template should carry its own version number and a named owner (often a lead architect or an architecture governance group), and should itself go through the same periodic-review discipline — ideally reviewed whenever a real project's SDD review (Lesson 15) surfaces a structural gap the template didn't anticipate, feeding that improvement back into the template for the next project rather than just patching the one document.

## Key terms

| Term | Meaning |
|---|---|
| Documentation template | A pre-built skeleton of sections and expected structure that documents of a given type start from |
| Over-templating | A template so rigid or exhaustive that it produces box-ticking, irrelevant content rather than useful documentation |
| Template ownership | Assigning a named owner and version to a template itself, so it's maintained rather than left to rot |

## Lab

Using the minimal SDD template skeleton above, identify which of its nine numbered sections would be "Not applicable" for a small, single-object custom app with no external integrations and no custom sharing rules beyond the organization default (for example, a simple internal equipment-checkout tracker). Write the one-sentence "Not applicable" justification for each section you'd mark that way, and explain which sections still apply in full even for this small a project.

## Check yourself

Can you explain the difference between what a template standardizes (structure) and what it deliberately leaves to the architect (content and judgment)? Can you describe the over-templating failure mode and its fix — marking a section "Not applicable" with a reason, rather than omitting or padding it? Can you explain why a template itself needs an owner and a version, the same way the documents it produces do?
