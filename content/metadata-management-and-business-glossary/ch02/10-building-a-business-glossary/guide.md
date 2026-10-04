# Lesson 10 — Building a Business Glossary

**Chapter 2 · Business Glossary · Lesson 10 of 25**

## What you'll learn

- A concrete, repeatable process for starting a glossary from nothing
- Why scoping to one domain first beats an org-wide glossary launch
- A worked mini-glossary for a single domain, applying every rule from this chapter
- Common early-stage mistakes and how to avoid them

## The process, step by step

1. **Pick one domain, not the whole organization.** Chapter 1 of Data Governance Foundations covered exactly this pattern for a governance pilot (Lesson 27) — the same logic applies here. A glossary for "Customer" data in one domain, done well, is more valuable than a half-finished glossary attempting all fifty domains at once.
2. **List the terms people actually argue about.** Don't start by exhaustively cataloging every possible term — start with the ones that cause real confusion today (ask around: "what word do we all define differently?").
3. **Draft definitions using the four-part test** (Lesson 7) — specific, self-contained, measurable, implementation-free.
4. **Route each draft through approval** (Lesson 8) — the accountable business steward reviews and approves before anything becomes official.
5. **Model relationships** (Lesson 9) — as the term count grows past a handful, add hierarchy, synonym, and related-term links so the glossary stays browsable.
6. **Publish and announce it** — a glossary nobody knows exists provides zero value; this is the "publish" stage of the metadata lifecycle (Lesson 4) and it's just as easy to skip as "maintain."

## A worked mini-glossary: the Customer domain

| Term | Definition | Status | Relationship |
|---|---|---|---|
| Customer | An individual or organization that has completed at least one purchase | Approved | Parent of "Active Customer" |
| Active Customer | A customer with at least one completed purchase in the trailing 90 days | Approved | Child of "Customer" |
| Churned Customer | A customer who was Active, but has had no purchase in the trailing 90 days | Approved | Related to "Active Customer" |
| Client | — | Deprecated | Synonym — see "Customer" |

Four terms, each passing the four-part test, each with a clear status, each related to the others in an explicit, documented way. This is a small, real, usable glossary — not a comprehensive one, but a genuinely trustworthy one, which matters more at the start.

## Common early-stage mistakes

- **Trying to cover every domain on day one** — leads to dozens of shallow, unreviewed drafts instead of a handful of solid, approved terms
- **Skipping the approval step "just this once" to move faster** — the first unapproved term that turns out wrong is the one that costs the whole glossary its credibility
- **Writing definitions nobody outside the project team reviewed** — a definition that looks obviously correct to the person who wrote it can still fail Lesson 7's test in ways only an outside reader would catch

## Key terms

| Term | Meaning |
|---|---|
| Glossary domain | A bounded business area (like "Customer") a glossary effort starts with |
| Mini-glossary | A small, fully governed glossary for one domain, built before attempting org-wide scope |

## Lab

Using the process above, build a four-to-six-term mini-glossary for one domain you know well — your own team's work, a hobby, a personal project. Include definitions, status, and at least one relationship between two terms.

## Check yourself

Can you walk through all six steps of this process from memory, and explain why starting with one scoped domain beats attempting an organization-wide glossary on day one?
