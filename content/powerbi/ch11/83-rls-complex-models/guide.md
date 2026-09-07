# Lesson 83 — RLS With Complex Data Models

**Chapter 11 · Security · Lesson 5 of 5**

## What you'll learn

- Why RLS filters are single-directional by default, even on
  bidirectional relationships
- When and how to turn on bidirectional security filtering
- The real performance cost of that setting
- What breaks when RLS meets `USERELATIONSHIP()`

## RLS and relationship direction

By default, an RLS filter only flows in **one direction** across a
relationship — regardless of whether that relationship itself is set
to single or bidirectional filtering. This matters the moment your
user-mapping table (Lesson 82) sits on the "many" side of a
relationship rather than filtering the fact table directly: the
filter might not reach where you need it to.

## Turning on bidirectional security filtering

To make an RLS filter flow both directions across a relationship,
select that relationship in the model view and check **Apply security
filter in both directions**:

![Screenshot of the model relationship setting for applying a security filter in both directions.](/courses/power-bi/ch11/83-rls-complex-models/powerbi-security-apply-filter-in-both-directions.png)
*One checkbox — but only reach for it when a genuine dynamic RLS scenario needs it.*

Two constraints worth knowing:

- Use this specifically when you've *also* implemented dynamic RLS
  based on username/login — not as a general-purpose fix for
  unrelated filtering problems.
- **If a table takes part in multiple bidirectional relationships,
  you can only enable this option on one of them.**

## The real cost: performance

Bidirectional security filtering can meaningfully slow down queries,
especially in models with many relationships or large fact tables —
exactly the kind of model `AdventureWorksDW2014` is. **Test
thoroughly** before deploying it anywhere real; a filter that's
"technically correct" but makes every visual spin for three seconds
isn't actually a win.

## RLS and `USERELATIONSHIP()`

Recall from Chapter 6 that `USERELATIONSHIP()` lets a single DAX
measure activate an otherwise-inactive relationship — the technique
for `FactInternetSales`'s three date roles (Order/Due/Ship). With RLS
enabled, using `USERELATIONSHIP()` inside a measure can trigger
unexpected errors. If you hit this, the fix is to redesign the DAX
around model-level relationships instead of leaning on
`USERELATIONSHIP()` — not to disable RLS.

## Testing other reports on the same semantic model

Test as role (Lesson 82) isn't limited to one report — you can switch
which report you're testing against, as long as it's in the same
workspace as the semantic model:

![Screenshot of selecting a different report to test under Viewing.](/courses/power-bi/ch11/83-rls-complex-models/row-level-security-test-role-3.png)
*Every report built on the same semantic model should be checked, not just the first one you happen to open.*

## Closing out security

Across this chapter you've gone from a single static filter to a
user-mapping-driven dynamic role, assigned members in the service, and
now the edge cases that show up once a model gets genuinely complex.
That's everything this course teaches about securing a Power BI
semantic model on purpose, rather than by accident of who happens to
have a link.

## Key terms

| Term | Meaning |
|---|---|
| Bidirectional security filtering | An opt-in setting letting an RLS filter flow both directions across a relationship |
| Single-directional (default) | RLS filters only flow one way across a relationship unless explicitly changed |

## Lab

1. In your dynamic RLS model from Lesson 82's lab, check whether your
   user-mapping table sits on the side of the relationship that needs
   bidirectional filtering to work correctly.
2. If it does, enable **Apply security filter in both directions** on
   that relationship, and re-test with **Test as role**.
3. If your model has more than one report, use **Test as role**'s
   report switcher to confirm the same filter behaves correctly on
   every report, not just the one you built first.

## Check yourself

Chapter 11 is complete when you can explain why enabling bidirectional
security filtering is something you reach for deliberately, for a
specific dynamic-RLS need — not something you turn on by default.
