# Roll-Up Summary Fields

**Chapter 2 · Fields · Lesson 13 of 23**

A Formula field calculates from fields on its own record. A **Roll-Up Summary** field calculates
from a whole set of *child* records at once — totaling, counting, or finding an extreme across
every related record on the other side of a relationship.

## What you'll learn

- Why Roll-Up Summary fields only exist on the master side of a master-detail relationship
- The four aggregate types Salesforce offers, and what each one actually computes
- Three real roll-up fields in action, read as they appear on the record

## The one hard requirement

Roll-Up Summary fields aggregate **child** records up to their **parent**, and Salesforce's own
documentation is explicit that this is built on a **master-detail relationship** — Lesson 16 covers
that relationship type in depth, but the short version is: it's a tighter bond than a lookup, and
master-detail is what gives Salesforce enough structural certainty to maintain a live aggregate
automatically. You define the Roll-Up Summary field on the object sitting on the **master** side of
that relationship, summarizing records from the **detail** side.

## Four aggregate types

| Type | What it computes |
|---|---|
| COUNT | How many child records exist (matching any filter you set) |
| SUM | The total of a numeric field across all child records |
| MIN | The smallest value of a field across all child records |
| MAX | The largest value of a field across all child records |

Every roll-up also lets you add filter criteria — summing only child records in a certain Stage, for
instance, instead of all of them.

## Three real examples

A Sum roll-up on Account, totaling related Opportunities:

![An Account showing Sum of Opportunities as $350,000.00, with two related Opportunity records listed beneath it.](/courses/salesforce-data-model-fundamentals/ch02/13-roll-up-summary-fields/rollup-sum-opportunities.png)

A Sum roll-up on Opportunity, totaling related Products:

![An Opportunity showing Total List Price as $175,000.00, summed from two related Product line items.](/courses/salesforce-data-model-fundamentals/ch02/13-roll-up-summary-fields/rollup-product-total.png)

A Min roll-up on the same Opportunity, instead finding the cheapest line item:

![The same Opportunity showing Minimum List Price as $75,000.00, pulled from the lower-priced of its two Products.](/courses/salesforce-data-model-fundamentals/ch02/13-roll-up-summary-fields/rollup-min-price.png)

Notice the last two examples use the *exact same* two child Product records — one field sums them,
the other finds the minimum. Same data, different aggregate type, different question answered.

## Building one

From Object Manager, open the **master** object, go to Fields & Relationships, click New, and
choose Roll-Up Summary. You'll then pick: the **summarized object** (the detail/child object), the
**field to aggregate** (for SUM/MIN/MAX — COUNT doesn't need one), the **summary type**, and
optional filter criteria.

## Key terms

| Term | Meaning |
|---|---|
| Roll-Up Summary | A field on a master object that aggregates values from its related detail (child) records |
| Summarized object | The child object a roll-up pulls records from |
| Summary type | COUNT, SUM, MIN, or MAX — the aggregate operation performed |

## Check yourself

A field needs to show the *most expensive* related child record's Amount on its parent. Which
summary type answers that — and which side of the relationship, master or detail, is the Roll-Up
Summary field itself created on?
