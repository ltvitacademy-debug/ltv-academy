# Data Management Best Practices

**Chapter 3 · Data Quality · Lesson 17 of 20**

Five lessons, five separate tools: duplicate rules, matching rules, validation rules, picklists, and spreadsheet cleanup. None of them work as a one-time setup — data quality decays unless someone keeps it up. This closing lesson of the chapter is the checklist that ties the tools together into an actual practice, not just a list of features.

## What you'll learn

- A layered-defense view of the five tools from this chapter, and the order they act in
- What to check before every bulk import, not just when something breaks
- Why data quality needs an owner, not just features
- A recurring-maintenance rhythm you can actually keep up

## The layered defense, in order

Each tool in this chapter catches a different failure, and they stack rather than compete:

```
1. Picklists / State-Country Picklists  -- prevents bad values at entry
2. Validation Rules                     -- blocks incomplete or malformed saves
3. Matching Rules + Duplicate Rules     -- catches records that already look alike
4. Before-save Flow cleanup              -- normalizes whatever free text remains
5. Periodic review (Duplicate Record Sets, manual audits) -- catches what slipped through
```

No single layer is sufficient alone. Picklists don't catch a validation problem like a missing Close Date; validation rules don't catch a duplicate; duplicate rules don't catch "TX" vs. "Texas" on a field they don't compare. The layers only work together.

## Before every bulk import: a five-item checklist

```
[ ] Field mapping confirmed — no column silently mapped to the wrong field
[ ] Required fields populated (completeness) — no blank values Salesforce
    will reject or, worse, silently accept into an optional field
[ ] Picklist values match exactly — "TX" not "Texas", case-sensitive
[ ] A small test batch (10-20 rows) imported and checked before the full file
[ ] Duplicate rule action confirmed — Block for a first-time clean load,
    Alert/Report if you expect legitimate near-matches
```

That small test batch matters more than it looks like it should. An import that's correct in bulk but wrong in one systematic way — a mis-mapped column, an off-by-one date field — is far easier to fix in 15 rows than to clean up across 15,000.

## Data quality needs an owner

Rules and picklists are necessary but not sufficient. Somebody — an admin, a RevOps function, a volunteer power user — needs to own:

- **Reviewing Duplicate Record Sets** on a schedule (weekly or monthly, not "eventually"), since Allow+Report rules only create value if someone actually looks at the report.
- **Tuning matching criteria** when false positives or false negatives get reported, rather than letting a rule quietly stay wrong for months.
- **Auditing picklist values** periodically — picklists drift too, as new values get added ad hoc by different admins over time ("Website" and "Web" both existing as Lead Source options is a standardization failure just like free text was).

## Recap

- The five tools from this chapter layer together — none of them substitutes for the others.
- Every bulk import deserves the same five-item checklist: mapping, completeness, picklist exactness, a small test batch, and a confirmed duplicate-rule action.
- Data quality needs a named owner and a recurring review rhythm, not just a one-time configuration pass.
- A small test batch catches systematic import errors far more cheaply than a full-file cleanup after the fact.

## Check yourself

Your org has validation rules, duplicate rules, and State/Country Picklists all active, and new data still looks inconsistent six months later. What's the most likely missing piece, in one sentence?
