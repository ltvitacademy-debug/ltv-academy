# Lesson 7 — Writing Good Definitions

**Chapter 2 · Business Glossary · Lesson 7 of 25**

## What you'll learn

- The single most common way glossary definitions fail, even when well-intentioned
- A four-part test for whether a definition is actually usable
- A worked before/after rewrite of a real, weak definition
- Common traps: circular definitions, implementation leakage, and vague qualifiers

## The most common failure: a definition that only makes sense if you already know the answer

The single most common failure in glossary writing is the **circular definition** — one that only makes sense to someone who already understands the term. "Active Customer: a customer who is active." That's not a definition; it restates the term using itself. It passes a quick skim but fails the moment someone genuinely unfamiliar with the business tries to use it.

## The four-part test

A usable definition should pass all four of these:

1. **Specific** — someone applying it would get the same answer as someone else applying it, not a range of plausible interpretations
2. **Self-contained** — understandable without already knowing the term, or needing to look up three other terms first
3. **Measurable where possible** — if the concept has a threshold or number, state it ("last 90 days," not "recently")
4. **Free of implementation detail** — doesn't name a specific column or query (that belongs in the data dictionary, Chapter 3)

## A worked rewrite

**Weak**: *"Active Customer — a customer who is currently active and engaged with our products."*

This fails specific (what does "engaged" mean, precisely?), fails measurable (no threshold given), and is borderline circular ("active" defined using "active").

**Better**: *"Active Customer — a customer with at least one completed purchase in the trailing 90 days, measured from the most recent nightly data refresh."*

This version is specific (one clear rule), measurable (90 days, explicitly), self-contained (no circular reference), and implementation-free (it doesn't name the table or query that calculates it — just the business rule).

## Three traps to watch for

- **Circular definitions** — "Churn: when a customer churns." Rewrite by describing the *behavior*, not restating the *word*.
- **Implementation leakage** — "Active Customer: `WHERE LastPurchaseDate >= DATEADD(day, -90, GETDATE())`." That's a query, not a definition — it belongs in the dictionary, and it breaks the moment the underlying table changes.
- **Vague qualifiers** — "significant," "recently," "typically," "usually." Each of these is a judgment call hiding inside a sentence that looks precise. If a number or threshold exists, state it; if it genuinely doesn't, say so explicitly rather than implying false precision.

## Key terms

| Term | Meaning |
|---|---|
| Circular definition | A definition that restates the term using itself or a close synonym |
| Implementation leakage | Technical detail (a query, a column name) appearing in a business definition where it doesn't belong |
| Vague qualifier | A word like "significant" or "recently" that hides an undefined threshold |

## Lab

Take one of the three terms you defined in Lesson 6's lab. Run it through the four-part test. Does it pass all four? If not, rewrite it so it does — and check it against the three traps above.

## Check yourself

Given any weak, circular, or vague definition, can you identify which of the four tests it fails, and rewrite it so it passes all four?
