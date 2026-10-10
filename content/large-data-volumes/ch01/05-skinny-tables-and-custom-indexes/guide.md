# Lesson 5 — Skinny Tables and Custom Indexes

**Chapter 1 · Working at Scale · Lesson 5 of 16**

## What you'll learn

- What a skinny table is and the specific performance problem it solves
- Why skinny tables are a Support-provisioned escalation, not a self-service feature
- The real constraints on skinny tables: column caps, no cross-object fields, sandbox behavior
- How custom indexes and skinny tables fit together as a single "ask Support" escalation path

## Why a join is expensive at LDV scale

Salesforce physically stores standard fields and custom fields for an object in separate underlying database tables. For small queries this is invisible, but any query, report, or list view that needs both a standard field (like Name or OwnerId) and a custom field has to join those two tables together behind the scenes. On an LDV-scale object, that join becomes one of the more expensive parts of satisfying the query — even once the filtering itself is selective and using an index correctly, as covered in Lessons 3 and 4.

## What a skinny table does

A **skinny table** is a Salesforce-managed, read-optimized table that holds a subset of an object's frequently-used fields — both standard and custom — combined into a single physical structure, so queries that only need those fields can avoid the standard/custom join entirely. Skinny tables also exclude soft-deleted records (records currently sitting in the Recycle Bin), which means the platform doesn't have to separately filter those out at query time either. Because the decision to use a skinny table is made automatically by the query optimizer at runtime, nothing about how reports, list views, or SOQL are written has to change — there's no new syntax, no different Apex, no different API call. The win is transparent to anyone running the query.

## This is an escalation, not a configuration option

There's no checkbox for creating a skinny table. It's provisioned by Salesforce Customer Support, and Salesforce's own guidance frames it as something to request after you've already tried the more fundamental fixes — writing selective queries (Lesson 4) and, where that's not enough, requesting custom indexes (Lesson 3) on the specific fields causing trouble — and performance is still a problem. A skinny table is a targeted fix for a specific object and specific set of fields, decided case by case with Support, not a general-purpose performance switch to flip early.

## Real constraints to plan around

Skinny tables come with hard limits an architect needs to account for before asking for one:

- **Field cap.** A skinny table can only hold a capped number of columns — commonly cited as up to 100 — so it has to be built around the fields that are actually driving the slow queries, not every field on the object.
- **No relationship or formula data.** A skinny table can't include fields from a related object, or formula fields that depend on data outside the object itself. It only holds fields that live directly on the object it's built for.
- **No self-service changes.** If a later report or query needs a field that isn't in the skinny table, that's another Support case to have it rebuilt — there's no admin-facing way to add a column.
- **Sandbox behavior.** Skinny tables are copied into Full sandboxes, but not into other sandbox types (like Partial Copy or Developer sandboxes), which means a performance test that passes in a lower-tier sandbox might not reflect how a query actually performs in production.

## Custom indexes and skinny tables as one escalation path

It's useful to think of custom indexes (Lesson 3) and skinny tables as two tools on the same escalation ladder, both provisioned the same way — by opening a case with Salesforce Support, backed by the actual slow queries and approximate record volumes involved — after self-service options (selective filters against already-indexed fields) have been exhausted. A custom index helps the optimizer narrow down *which* rows match a filter; a skinny table helps the platform read the matching rows' data more cheaply once they've been found. A genuinely stubborn performance problem at LDV scale sometimes needs both.

## Key terms

| Term | Meaning |
|---|---|
| Skinny table | A Salesforce-managed table combining frequently-used standard and custom fields from one object, avoiding the standard/custom join, excluding Recycle Bin records |
| Standard/custom field join | The underlying join Salesforce normally performs because standard and custom fields are stored in separate tables |
| Field cap | The limited number of columns (commonly cited as up to 100) a skinny table can hold |
| Full sandbox | The only sandbox type that gets a copy of an org's skinny tables |

## Lab

A Case object has 7 million records. Support reports that the dashboard tile showing "open cases by priority, with account name and case owner" is consistently slow, even though the underlying filter (`Status__c = 'Open'`) is selective and backed by a standard index. Explain why selectivity alone doesn't fully explain the slowness here, what a skinny table would specifically address, and what two things you'd need to confirm (per this lesson's constraints) before requesting one from Support.

## Check yourself

Can you explain, in your own words, what physical problem a skinny table solves that a selective query and a good index don't? Can you name two hard constraints on skinny tables that an architect has to design around?
