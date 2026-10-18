# Report Types

**Chapter 1 · Reports · Lesson 1 of 22**

Every Salesforce report starts with one decision that quietly controls everything else you can do with it: the **report type**. Pick the wrong one and the field you need simply will not be on the list, no matter how good your filters or groupings are. This lesson covers what a report type actually is, how standard types differ from custom ones, and why that first choice is so hard to walk back.

## What you'll learn

- What a report type is and why it comes before everything else
- The difference between a standard report type and a custom report type
- How "with" and "with or without" relationships behave like SQL joins
- Why the choice of report type is effectively permanent
- A full worked scenario: a report quietly showing the wrong record count because of this exact join behavior

## A report type is a pre-built join

A **report** is a saved list of Salesforce records, filtered, grouped, and formatted however you like. Before you can build one, Salesforce asks which **report type** to use. The report type defines the primary object (Accounts, Opportunities, Cases, and so on) plus any related objects whose fields you are allowed to pull in. If you have written a SQL query, think of a report type as a pre-built `FROM` and `JOIN` clause that someone else decided for you ahead of time.

A plain "Accounts" report type exposes only Account fields. An "Accounts with Opportunities" report type adds every Opportunity field reachable through that relationship, so each row becomes an account-opportunity pair. Nothing about the report format changes this — the report type is what makes those extra columns available in the first place.

## Standard types vs. custom report types

Salesforce ships **standard report types** for every standard object and its common relationships out of the box — Opportunities, Opportunities with Products, Accounts, Cases, and dozens more. When a standard type does not cover the object combination you need (a custom object related to two others, for example), an admin builds a **custom report type** in Setup.

When defining a custom report type, the admin chooses, for each relationship, one of two behaviors:

- **A with B** — only primary records that have at least one related B record show up. This behaves like an inner join.
- **A with or without B** — primary records show up whether or not a related B record exists. This behaves like a left join.

That single choice decides whether records with no related data silently disappear from every report built on that type.

## Why the report type comes first

The practical rule for admins and report builders alike: **choose the report type before anything else, because you generally cannot change it after the report exists** without rebuilding the report from scratch. If a field you expect is missing from the Fields pane while you are building a report, the report type — not a bug — is almost always the reason. The Fields pane only ever shows what the chosen type exposes.

## Troubleshooting scenario: the report that's missing 40% of accounts

**Problem description.** Meridian Outdoor Supply's sales ops lead builds a report meant to show
"every Account, with their most recent Opportunity if they have one" — using an "Accounts with
Opportunities" report type. The report shows 340 Accounts. The Account object itself has 560.
Nobody gets an error; the report just quietly returns fewer rows than expected, and it isn't
obvious why unless someone happens to compare the two numbers.

**Available evidence.**

```
Account list view (all Accounts): 560 records
"Accounts with Opportunities" report, no filters applied: 340 records
```

**Diagnostic questions.**

- The report has no filters set — so why would it return fewer rows than the full Account list?
- What does "Accounts with Opportunities" actually mean as a relationship, per this lesson's own
  "A with B" definition?
- Do the 220 missing Accounts have anything in common?

**Expected investigation sequence.**

```
# Step 1 -- check whether the missing Accounts share a trait
Account list view, filtered to accounts NOT in the report's results:
220 Accounts, every one with zero related Opportunities.

# Step 2 -- re-read the report type's actual name and definition
"Accounts with Opportunities" -- per this lesson, "A with B" means
only primary records that have at least one related B record show
up. This is the inner-join behavior, not a left join.

# Step 3 -- confirm by checking the report type definition in Setup
Setup -> Report Types -> Accounts with Opportunities
Relationship: "Each 'A' record must have at least one related 'B' record"
-- confirmed: this is the Required (inner-join) configuration, not
"A record may or may not have related B records."
```

**Correct resolution.** The report type itself is working exactly as defined — "Accounts with
Opportunities" was built (or chosen, if it's a standard type) with the inner-join relationship,
so any Account with zero Opportunities is structurally excluded before the report ever applies a
single filter. The fix depends on what sales ops actually wanted: if the goal really is "every
Account regardless of Opportunity history," a custom report type needs to be built (or an
existing one changed) using "A with or without B" instead — which, per this lesson, generally
means rebuilding the report on the new type rather than editing the existing one in place.

**Why this failure happens, and why it's so easy to miss.** Nothing about this scenario produces
an error, a warning, or even an obviously wrong-looking report — 340 real Account rows, correctly
formatted, is indistinguishable from a correct result unless someone happens to compare it
against the true Account count. This is exactly why the report type is described as a pre-built
join: the "missing" 220 Accounts were never excluded by a filter anyone set deliberately — they
were excluded by a structural decision made (possibly by someone else, possibly months earlier)
when the report type itself was defined, and that decision is invisible from inside the report
builder's filter panel.

**Prevention.** Before trusting any report meant to represent "all of X," compare its row count
against that object's actual total count as a sanity check — a report built on an inner-join
report type will under-count by exactly the number of records with no related data, every time,
silently. For a report type meant to represent a complete object population (not a subset by
design), "A with or without B" is almost always the correct choice — reserve "A with B" for
reports that are specifically, deliberately about the relationship itself (e.g. "Opportunities
and their Products," where an Opportunity with no Products genuinely isn't relevant to the
report's purpose).

## Key terms

| Term | Meaning |
|---|---|
| Report type | The template that defines which objects and fields a report can use |
| Primary object | The main object a report type is built around |
| Standard report type | A built-in type Salesforce provides for common object combinations |
| Custom report type | An admin-built type for object combinations standard types don't cover |
| A with B | Inner-join-style relationship; only matching related records included |
| A with or without B | Left-join-style relationship; unmatched primary records still included |
| Silent under-count | A report returning fewer rows than the true population, with no error, because of the report type's join behavior rather than any filter |
