# Lesson 6 — Data Matching Concepts

**Chapter 2 · Matching and Consolidation · Lesson 6 of 25**

## What you'll learn

- What "matching" means in an MDM context, and the question it answers
- Match keys — the fields actually used to compare records
- Why comparing every record to every other record doesn't scale, and what blocking does about it
- How this lesson sets up the rest of Chapter 2

## What matching actually answers

**Matching is the process of comparing records — within one system or across several — to decide whether they represent the same real-world entity.** It's the mechanical heart of MDM: Chapter 1 established that the same customer can look different across systems; matching is the process that detects that and says "these are (probably) the same person."

The output of a match process isn't just yes/no. As Lesson 7 covers in depth, it's usually a spectrum: confidently the same, confidently different, or uncertain enough to need a human (Lesson 11).

## Match keys

A **match key** is the set of fields actually compared to make the decision. Common choices:

- **A unique identifier**, when one reliably exists and is captured consistently — a tax ID, a government-issued ID number, an internal customer number carried over from a prior system
- **Name + address**, the most common fallback when no reliable unique ID exists — but sensitive to typos, nicknames, and formatting differences ("St." vs. "Street")
- **Email address**, often good but not perfect — people share emails (a shared family account) or abandon old ones
- **A composite of several fields**, weighted together, which is exactly what probabilistic matching (Lesson 7) is built around

Choosing match keys is itself a judgment call specific to a domain — Chapter 3 shows different choices for customer, product, and vendor records.

## Why you can't just compare everything to everything

Comparing every record in a million-row customer table to every other record means roughly 500 billion comparisons — computationally impractical, and most of those comparisons are obviously pointless (comparing a customer in Texas to one in Maine rarely helps). **Blocking** solves this: records are first grouped into smaller "blocks" by some coarse, cheap-to-compute attribute — zip code, last-name initial, birth year — and detailed matching only runs *within* each block. A real match is almost never split across blocks if the blocking key is chosen well, and the number of comparisons drops from "everyone vs. everyone" to a small fraction of that.

## Setting up the rest of this chapter

This lesson covered what matching is for and the raw material (match keys, blocking) that makes it practical at scale. Lesson 7 covers the two fundamentally different ways to turn a comparison into a decision — deterministic and probabilistic matching. Lessons 8–11 build out what happens after a match is found: deduplication, golden records, survivorship rules, and steward review.

## Key terms

| Term | Meaning |
|---|---|
| Matching | Comparing records to decide if they represent the same real-world entity |
| Match key | The specific field or fields used to compare records (e.g., tax ID, name + address) |
| Blocking | Grouping records by a coarse attribute before detailed matching, to avoid comparing every record to every other record |

## Lab

Pick a dataset you have access to with at least a few hundred rows of people or organizations (a contact export is fine). Propose one blocking key you'd use before running any detailed matching, and explain in one sentence why it's cheap to compute and unlikely to split a true match across two blocks.

## Check yourself

Can you explain, in your own words, what a match key is, and why blocking is necessary before matching a large dataset — not just helpful, but necessary?
