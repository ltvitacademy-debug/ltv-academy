# Lesson 34 — Purview Practice Lab

**Chapter 7 · Purview in Practice · Lesson 34 of 35**

## What you'll learn

- Nothing new conceptually — this lesson is six hands-on exercises applying everything Chapters 1 through 6 already taught
- How to actually do this lab with the free tier of Microsoft Purview, no paid subscription required
- A concrete self-check for knowing when each exercise is genuinely done, not just attempted

## Before you start

This lab works with the **free version of Microsoft Purview** — the paid, enterprise-tier features from later chapters (like workflows with multiple approval tiers) aren't required to complete every exercise, though a few need the enterprise tier if you want to go further than the core steps described here. You'll need:

- A Purview account — the free tier, created through the [Microsoft Purview portal](https://purview.microsoft.com), covers registration, scanning, classification, and catalog browsing.
- One sample data source — a throwaway Azure Data Lake Storage Gen2 account or Azure SQL Database with a handful of tables works well. **Do not point any of these exercises at real production or customer data** — use sample or synthetic data only.
- About 90 minutes, worked through in order — each exercise builds on the asset you register in Exercise 1.

If you don't have an Azure subscription to spin up a test source, work through each exercise on paper instead: write out exactly which menu you'd open and which fields you'd fill in, using this course's earlier lessons as your reference. The self-check at the end still applies.

## Exercises 1 through 3: register, scan, classify

**Exercise 1 — Register and scan one source.** Register your sample ADLS Gen2 or Azure SQL source, apply the default scan rule set, and run a single scan to completion (Lessons 8 through 10). Confirm the resulting assets appear in the Data Map.

**Exercise 2 — Build a collection matching a real structure.** Create at least two collections — a root and one child — and assign yourself the appropriate role on each (Lesson 6). Think of a real or hypothetical organizational split (by department, by region, by project) and name your collections to match it, the same way Thistledown Retail Group's collections matched its four regions in Lesson 33.

**Exercise 3 — Find and apply one real classification.** Browse the scanned assets from Exercise 1 and find at least one column where a system classification fired automatically (Lessons 13 through 14). Then apply a sensitivity label by hand to one asset that should carry one, even if no classifier caught it (Lessons 15 through 16).

## Exercises 4 through 6: catalog, trace, govern

**Exercise 4 — Publish a glossary term and curate one asset.** Write one glossary term with a real definition that passes the four-part test from earlier in this career path (specific, self-contained, measurable where possible, free of implementation detail), and attach it to at least one asset in the catalog (Lessons 17 through 20).

**Exercise 5 — Find your asset's lineage.** Open the lineage view for the asset you've been working with and confirm you can explain, in one sentence, where its data came from — even if the honest answer for a simple test source is "it's the original, nothing upstream" (Lesson 23). If your test setup includes a pipeline or a Power BI report built on this data, confirm the lineage graph actually shows that connection.

**Exercise 6 — Write and run one data quality rule.** Pick one column on your scanned asset and apply one of the rule types from Lesson 30 — Freshness, Unique values, Data type match, or Empty/blank fields — and run it. Read the resulting score and explain in one sentence whether it passed for the reason you expected.

## How to know you're actually done

Before moving to the closing lesson, you should be able to do all three of these without opening this guide again:

1. **Find it** — search the catalog and land on the exact asset you worked with across all six exercises.
2. **Trace it** — open its lineage and explain, out loud, where its data came from.
3. **Defend it** — explain why the sensitivity label and the data quality rule you applied are the right ones for that specific asset, not just any label and any rule.

If any of the three feels shaky, that's a signal to go back to the relevant lesson rather than push forward — this lab is meant to surface exactly that kind of gap while it's still cheap to fix.

## Key terms

| Term | Meaning |
|---|---|
| Free version of Purview | The tier used for this lab — covers registration, scanning, classification, and catalog browsing without a paid subscription |
| Self-check | The three-question test (find it, trace it, defend it) confirming a lab exercise is genuinely complete |

## Lab

This entire lesson *is* the lab — work through Exercises 1 through 6 above, in order, using either a real test source or the paper-exercise alternative described in "Before you start."

## Check yourself

Can you complete all three self-check items — find it, trace it, defend it — for the single asset you worked with across all six exercises, without referring back to this guide?
