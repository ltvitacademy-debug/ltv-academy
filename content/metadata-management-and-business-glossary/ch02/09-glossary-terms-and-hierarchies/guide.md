# Lesson 9 — Glossary Terms and Hierarchies

**Chapter 2 · Business Glossary · Lesson 9 of 25**

## What you'll learn

- Why a flat, unconnected list of terms stops scaling past a few dozen entries
- Three relationship types glossaries typically model: hierarchy, synonym, and related-term
- A worked example showing how "Revenue" branches into a small term hierarchy
- A common trap: confusing a synonym with a near-synonym

## Why a flat list stops working

A glossary with ten terms works fine as a flat, alphabetical list. A glossary with three hundred terms doesn't — without structure, someone searching for "Revenue" has no way to discover that "Net Revenue," "Gross Revenue," and "Recognized Revenue" are all closely related, more specific concepts they might actually need. Flat lists make browsing (as opposed to exact-match searching) nearly impossible, which defeats a large part of what a glossary is for.

## Three relationship types

- **Hierarchy (broader/narrower)** — "Revenue" is broader than "Net Revenue," which is broader than "Net Revenue, North America." Hierarchies let someone start broad and drill down, or start narrow and understand the bigger category they belong to.
- **Synonym** — two terms that mean exactly the same thing, usually because different parts of the organization grew up calling it different names ("Client" and "Customer," in an org that uses both). A good glossary picks one as the official term and marks the other as a synonym pointing to it — not two separate competing entries.
- **Related term** — two terms that are connected but not synonyms and not in a hierarchy ("Churn" and "Active Customer" are related — one is partly defined in terms of the other — without one being broader than the other).

## A worked hierarchy: Revenue

```
Revenue
├── Gross Revenue
├── Net Revenue
│   ├── Net Revenue, North America
│   └── Net Revenue, International
└── Recognized Revenue
```

Each child term should still pass Lesson 7's four-part test on its own — "Net Revenue, North America" needs its own specific, measurable, self-contained, implementation-free definition, not just "Net Revenue, but for North America" left implicit.

## The synonym trap

The most common modeling mistake: marking two terms as synonyms when they're actually **near**-synonyms — close in meaning but not identical. "Customer" and "Account" often get treated as the same thing colloquially, but a single customer might have multiple accounts, or an account might belong to multiple customers (a joint account, for example). Marking them as true synonyms would be wrong — in this case, "related term" is the honest relationship, not "synonym." Collapsing a near-synonym into a synonym silently loses a real distinction the business actually relies on.

## Key terms

| Term | Meaning |
|---|---|
| Hierarchy (broader/narrower) | A parent-child structure where child terms are more specific versions of a parent concept |
| Synonym | A different name for exactly the same concept, pointing to one official term |
| Related term | A connection between two terms that isn't a hierarchy or a true synonym |

## Lab

Take the three terms you wrote definitions for in Lesson 6's lab. For each pair, decide: are they unrelated, synonyms, related terms, or does one sit in a hierarchy under the other? Sketch the relationships.

## Check yourself

Can you explain the difference between a synonym and a related term, using your own example, and explain why collapsing a near-synonym into a true synonym is a modeling mistake?
