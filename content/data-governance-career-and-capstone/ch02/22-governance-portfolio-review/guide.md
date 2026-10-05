# Lesson 22 — Governance Portfolio Review

**Chapter 2 · Career Preparation · Lesson 22 of 35**

## What you'll learn

- The order in which a hiring manager actually reviews a governance portfolio
- A walkthrough of reviewing each capstone artifact the way an interviewer would
- The follow-up question each artifact needs to be able to survive
- A pre-share checklist specific to governance documents

## The order reviewers actually look in

Reviewers are busy, and a governance portfolio is mostly documents, so they skim in a fairly predictable order:

1. **The one-page summary or executive presentation first.** This is the "can this person explain the whole thing in one page" test (the deliverable from Chapter 1, Lesson 17).
2. **The business glossary or data dictionary excerpt.** Is it specific, with real definitions and named owners — or is it just a restatement of table and column names with the word "definition" attached?
3. **The data quality rules or SQL.** Are the checks real and runnable, and do they correctly select for the *failure* condition rather than the success condition (the habit Data Quality Management, Lesson 18 builds)?
4. **The lineage diagram.** Does it show actual hops between real systems, or is it a generic box-and-arrow diagram that could describe any company?
5. **The governance operating model or RACI matrix.** Does every activity have exactly one named Accountable role, or does "TBD" or a department name show up instead of a person?

## Walking through your own artifacts, one at a time

Treat each artifact like a mini-interview you're giving yourself. For the glossary: pick one term, read its definition out loud, and ask whether a stranger to your organization would understand it without more context. For the SQL: pick one check, and be ready to explain, line by line, what row would make it fail and why that's the right condition to flag. For the lineage diagram: pick one hop, and be ready to say specifically what transformation or business rule happens there. For the RACI matrix: pick one row, and confirm out loud that exactly one role carries the A.

## Questions each artifact should survive

- **Glossary:** "Why does this definition say 90 days and not 60?" You should have a specific reason, not just "that's what felt right."
- **SQL checks:** "Walk me through this WHERE clause." You should be able to say exactly which rows it catches and why those rows are the bad ones.
- **Lineage diagram:** "What would you do if the finance number diverged at an earlier hop instead of the one shown here?" You should be able to describe the same upstream-walking process regardless of where the break actually is.
- **RACI matrix:** "Who is the single Accountable role here, and why that person and not someone else?" You should be able to justify the choice in terms of who actually has authority over that part of the business, not just who happened to do the typing.

## A pre-share checklist

Before sending a portfolio link to anyone:

- No real company names, logos, or data appear anywhere in the materials
- Every document is clearly marked "training capstone, fictional organization (LTV Global)"
- Every artifact has a named author and a date
- Numbers and term counts match across the glossary, the operating model document, and the executive presentation
- Every SQL script actually runs without errors against the schema it claims to check

## Key terms

| Term | Meaning |
|---|---|
| Executive summary test | Whether a one-page document can explain the whole program clearly on its own |
| Follow-up depth | How far you can go past a document's surface claim when asked a specific question about it |
| Pre-share checklist | A final honesty and consistency pass before sending a portfolio to anyone |

## Lab

Pick one artifact from your Chapter 1 capstone. Write out, in your own words, the single hardest follow-up question a skeptical reviewer could ask about it — then write your actual answer to that question.

## Check yourself

Can you name, without looking back, the order in which a reviewer typically looks through a governance portfolio, and the one follow-up question each artifact type needs to survive?
