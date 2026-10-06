# Requirements and Application Design Principles

**Chapter 1 · Application Fundamentals · Lesson 3 of 24**

## What you'll learn

- The four questions to ask before designing any app
- The declarative-first design order Platform App Builders (and the exam) reward
- How to turn a vague business requirement into a concrete design decision
- A worked example: a warranty-claims app, requirement to design

## This is not a visual lesson, on purpose

Lessons 1 and 2 worked with apps that already existed. This lesson
covers the thinking that happens *before* App Manager ever opens —
there's no UI screen for "figuring out what to build," so this guide
stays on paper rather than padding itself with an unrelated
screenshot.

## Four questions before you build anything

| Question | What you're really asking |
|---|---|
| Who | Which users, on which profiles, will actually use this |
| What | What task are they stuck doing today (often a spreadsheet) |
| Why | What breaks, or keeps breaking, if this doesn't exist |
| Scale | 10 users a week, or 10,000 records a day |

Skipping these doesn't just risk a weak app — it risks building the
*wrong* app, correctly.

## The design order: declarative first, every time

1. **Reuse a standard object** before building a custom one
2. **Reuse a standard field** before building a custom one
3. **Configure** (fields, page layouts, Flow) before you customize
4. **Customize** (Lightning components) before anyone writes Apex
5. Ask **"does this already exist in the org?"** at every single step

This order isn't a style preference — it's what both the Platform App
Builder exam and real orgs reward. The most declarative solution that
actually satisfies the requirement beats the most impressive one
every time: less to maintain, less to break, less for the next admin
to reverse-engineer.

## Worked example: a warranty-claims app

**Requirement:** "Track warranty claims per product."

| Step | Decision |
|---|---|
| Reuse check | No standard object represents a warranty claim — a custom object is justified |
| Relationship | A claim always belongs to exactly one asset — a master-detail relationship, not a lookup |
| Interface | One app, two tabs: Claims and Assets |

Notice what *didn't* happen: no Apex, no decision made before the
reuse check ran, and the relationship type came from the business
rule ("a claim can't exist without its asset"), not from a coin flip.
Lesson 5 covers exactly how to choose between master-detail and
lookup relationships in detail.

## Key terms

| Term | Meaning |
|---|---|
| Declarative | Built through point-and-click configuration, not code |
| Reuse check | Confirming no standard object/field already covers the requirement |
| Master-detail relationship | A tight parent-child link where the child can't exist without the parent |

## Check yourself

A stakeholder asks for "a place to track customer complaints." Walk
through the four questions, then the design order, and state your
first design decision before you ever open App Manager.
