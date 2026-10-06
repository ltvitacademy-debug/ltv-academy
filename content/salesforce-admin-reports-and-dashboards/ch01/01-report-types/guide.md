# Report Types

**Chapter 1 · Reports · Lesson 1 of 22**

Every Salesforce report starts with one decision that quietly controls everything else you can do with it: the **report type**. Pick the wrong one and the field you need simply will not be on the list, no matter how good your filters or groupings are. This lesson covers what a report type actually is, how standard types differ from custom ones, and why that first choice is so hard to walk back.

## What you'll learn

- What a report type is and why it comes before everything else
- The difference between a standard report type and a custom report type
- How "with" and "with or without" relationships behave like SQL joins
- Why the choice of report type is effectively permanent

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

## Key terms

| Term | Meaning |
|---|---|
| Report type | The template that defines which objects and fields a report can use |
| Primary object | The main object a report type is built around |
| Standard report type | A built-in type Salesforce provides for common object combinations |
| Custom report type | An admin-built type for object combinations standard types don't cover |
| A with B | Inner-join-style relationship; only matching related records included |
| A with or without B | Left-join-style relationship; unmatched primary records still included |
