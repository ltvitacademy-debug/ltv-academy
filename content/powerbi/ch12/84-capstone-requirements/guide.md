# Lesson 84 — Business Requirements

**Chapter 12 · Capstone Project · Lesson 1 of 10**

## What you'll learn

- The capstone scenario you'll build across the next nine lessons
- How to turn a vague ask into specific, buildable requirements
- The exact scope for this project — what's in, what's deliberately out
- Why this lesson has no Power BI screen at all

## The scenario

You're the analyst for **Adventure Works Cycles**. The VP of Sales
has asked for "something that shows how we're doing" — the classic
vague first ask every real BI project starts from. Your job this
chapter is to turn that into a finished, published, secured,
refreshing dashboard, using the exact same skills you've built across
Chapters 1 through 11.

Every lesson from here through Lesson 93 builds one piece of this
same project. There's no new Power BI feature to learn — this chapter
is entirely about applying what you already know, in the order a real
project actually happens.

## Turning "something that shows how we're doing" into requirements

Chapter 8, Lesson 62 taught you to ask who the audience is, how
they'll use it, and what decisions it informs — before touching any
data. Applying that here, a short conversation with the VP surfaces
four real requirements:

1. **Regional performance** — which sales territories are ahead of or
   behind target, and by how much.
2. **Product line profitability** — which product categories actually
   drive margin, not just revenue.
3. **Reseller fulfillment** — how reliably resellers are getting
   orders shipped on time.
4. **Trend over time** — whether this quarter is better or worse than
   the same quarter last year.

Notice none of these mention a chart type, a color, or a table name.
Requirements describe *decisions*, not *visuals* — the visuals come
in Lesson 89, once the model exists to support them.

## Scoping the project

**In scope**, using `AdventureWorksDW2014`:
- `FactInternetSales` and `FactResellerSales` for revenue and margin
- `DimSalesTerritory` for regional performance
- `DimProduct` / `DimProductCategory` / `DimProductSubcategory` for
  product-line profitability
- `DimDate` for year-over-year trend comparisons

**Out of scope**, deliberately, so the project stays finishable:
- Currency conversion for international sales (assume USD throughout)
- Any data source outside `AdventureWorksDW2014`
- Mobile-specific layout (Chapter 8 covered the principles; this
  capstone targets desktop/laptop viewing only)

## Why scoping matters before you open Power BI

A project without a written scope tends to grow forever — "just one
more metric" indefinitely. Writing scope down first gives you
something concrete to check the finished dashboard against in Lesson
93, and something to point to if a stakeholder asks for something new
mid-build.

## Key terms

| Term | Meaning |
|---|---|
| Requirement | A decision the dashboard needs to support — not a visual or chart type |
| Scope | The explicit, written boundary of what this project will and won't include |

## Lab

1. Write your own one-paragraph project brief for this capstone,
   using the four requirements above in your own words.
2. List, specifically, which `AdventureWorksDW2014` tables each
   requirement depends on — you'll use this list directly in
   Lesson 85's import.
3. Write one sentence for something you're deliberately leaving out
   of scope, and why.

## Check yourself

You're ready for Lesson 85 when you have a written scope you could
hand to someone else and have them understand exactly what this
dashboard will and won't do.
