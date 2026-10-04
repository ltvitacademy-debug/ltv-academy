# Lesson 29 — Data Quality Case Study: Customer Data

**Chapter 6 · Applied Data Quality · Lesson 29 of 30**

## What you'll learn

- How to walk a messy, realistic customer-data problem through profiling,
  diagnosis, remediation, and monitoring, start to finish
- How duplicate and inconsistent customer records typically happen when
  two systems both claim to be a "source of truth"
- How several dimensions from Chapter 3 (uniqueness, completeness,
  consistency) show up together in one real-shaped problem, not in
  isolation
- How the remediation workflow from Lesson 25 applies end to end

**A note before you start:** the company in this case study,
**Northfield Outfitters**, is entirely fictional — invented for this
lesson to give the concepts from this course a concrete, connected
example. It is not a real business, and no statistic here is a real
industry figure.

## The setup

Northfield Outfitters is a fictional mid-size outdoor retailer with
both a website and physical stores. Its e-commerce platform and its
in-store point-of-sale system each maintain their own customer table,
and both feed a nightly load into a shared `customers` table that
powers the loyalty program and marketing emails. Marketing just asked
why the loyalty program shows 1.4 million members when the company has
roughly 600,000 actual households that have ever bought something.

## Step 1 — Profiling finds the shape of the problem

Using the profiling techniques from Chapter 2, the data team starts
broad, then narrows:

1. **Row count vs. business expectation** — 1.4M rows in `customers`
   against an expected few hundred thousand households is the first
   signal something structural, not cosmetic, is wrong
2. **Uniqueness profiling** (Lesson 15) on `email` shows roughly 35% of
   emails appear more than once
3. **Pattern profiling** (Lesson 9) on records sharing an email shows a
   repeating shape: one row with a `source_system` of `ecommerce` and a
   near-identical row with `source_system` of `pos`, differing only in
   name formatting ("Jane Smith" vs. "SMITH, JANE") and sometimes a
   missing phone number

That pattern — the same person, two systems, two slightly different
rows — is the classic signature of a duplicate caused by **no shared
customer identifier across systems**, not random data entry error.

## Step 2 — Diagnosis: which dimensions are actually broken

Three dimensions from Chapter 3 are involved, and naming each precisely
matters for what fix to apply:

- **Uniqueness** (Lesson 15) — the core problem: one real customer is
  represented as two or more rows
- **Consistency** (Lesson 13) — name casing and formatting differ
  between the two source systems for what should be the same value
- **Completeness** (Lesson 12) — the POS-sourced rows are frequently
  missing email, because in-store checkout never required it

Root cause analysis (Lesson 23), using the 5 Whys, lands here: the two
systems were integrated years apart, nobody built a cross-system match
key at integration time, and the nightly load was written to simply
append both systems' rows rather than merge them.

## Step 3 — Remediation

The fix has to happen at two levels, matching Lesson 25's "fix at the
source vs. fix downstream" distinction:

1. **Immediate cleansing** (Lesson 24) — a deduplication pass matches
   records across systems using a composite key (normalized name +
   phone, falling back to normalized name + postal code when phone is
   missing), picks a survivor record per matched group, and merges
   loyalty point balances rather than discarding them
2. **Standardization** — name casing and formatting rules are applied
   consistently across both source feeds going forward
3. **Root cause fix** — the nightly load is rewritten to upsert against
   a new cross-system `customer_match_id` instead of blindly appending,
   so the duplicate problem stops recurring with every new customer
   visit

## Step 4 — Monitoring and the result

A monitor (Lesson 26) is set up to track the duplicate rate going
forward — the same uniqueness check from Chapter 3, logged daily — and
a scorecard tile (Lesson 27) surfaces it alongside completeness for the
loyalty team. Within one nightly cycle after the fix, the `customers`
table drops from 1.4M to roughly 640,000 rows, consistent with the
business's own estimate, and the duplicate-rate monitor keeps new
duplicates from silently building back up.

## What this case study demonstrates

- A real data quality problem is rarely one dimension in isolation —
  this one touched uniqueness, consistency, and completeness together
- Profiling tells you *what* is wrong; root cause analysis tells you
  *why*; only root cause work stops it from recurring
- A fix that only cleans the existing rows (without the upsert rewrite)
  would have worked for exactly one day

## Key terms

| Term | Meaning |
|---|---|
| Composite match key | Multiple fields combined to match records across systems lacking a shared ID |
| Survivor record | The record kept after a deduplication merge |
| Upsert | Insert-or-update logic that prevents re-creating a duplicate on reload |

## Lab

1. Using the four-step structure above (profile, diagnose, remediate,
   monitor), write your own one-paragraph walkthrough for a different
   fictional scenario: Northfield Outfitters' two systems also disagree
   on customer `loyalty_tier` — e-commerce stores it as `"Gold"`,
   `"Silver"`, `"Bronze"`, while POS stores it as `1`, `2`, `3`. Name
   which dimension(s) this touches and sketch a standardization fix.
2. Write the one profiling query you'd run first to confirm the scale
   of this second problem.

## Check yourself

Can you name the three data quality dimensions involved in the
Northfield Outfitters duplicate-customer problem, and explain why each
one applied? Can you explain why rewriting the nightly load was more
important, long-term, than the deduplication pass itself?
