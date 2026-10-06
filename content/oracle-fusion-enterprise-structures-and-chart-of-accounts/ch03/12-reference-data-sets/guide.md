# Reference Data Sets

Different business units often need different versions of the same kind of policy — one country's payment terms are not another's, one division's expense categories are not another's. Oracle Fusion solves this with **reference data sets**, the mechanism this lesson covers in depth.

## What you'll learn

- What a reference data set is, and what problem it solves
- The special "Common Set" (sometimes called the Enterprise Set) and when to use it
- How a reference data set gets assigned to a business unit
- The concept of a "determinant," previewed for Lesson 13

## The problem: shared software, different policies

Oracle Fusion is one piece of software shared by every business unit in the company, but business units frequently need different values for the same *kind* of setup data. One business unit's payment terms list might include "Net 30" and "Net 60" for its country; another's might include completely different terms reflecting different local payment customs. Without a way to separate this, every business unit would either be forced onto identical policies, or the company would need entirely separate application instances — both bad options.

## Reference data sets: one answer, many contexts

A **reference data set** is a named grouping of reference data values. A given type of reference data — payment terms, for example — is said to be **partitioned** by reference data sets: each set can hold its own list of payment terms, distinct from any other set's list. A business unit is then assigned to a specific reference data set for each partitioned reference data type it uses, and from that point forward, that business unit only sees the values that live in its assigned set.

```
Reference Data Set Pattern:
  Define Set: "US Policies"     → payment terms, tax rules specific to the US
  Define Set: "EU Policies"      → payment terms, tax rules specific to the EU
  Assign Business Unit "US Ops"  → Set: "US Policies"
  Assign Business Unit "EU Ops"  → Set: "EU Policies"
```

## The Common Set (Enterprise Set)

Not every piece of reference data needs its own, business-unit-specific version. Oracle Fusion provides a special, predefined set — often called the **Common Set** (or Enterprise Set) — for reference data that should be visible to every business unit regardless of which specific set they're otherwise assigned. A consultant has to decide, type by type: does this reference data genuinely vary by business unit (use a specific named set), or should every business unit see the same values (leave it in, or explicitly assign, the Common Set)? Over-segmenting data into many sets when the Common Set would do just adds unnecessary maintenance.

## A preview: the determinant

How does Oracle Fusion know which reference data set applies to a given transaction? It looks at a **determinant** — a value from the transaction's context, usually the business unit, that identifies which set to use. Business Unit is the most common determinant type, but it is not the only one; Lesson 13 goes into shared versus non-shared reference data and determinant types in more depth.

## Recap

A reference data set is a named grouping of policy data that a business unit is assigned to, letting different business units see different values for the same kind of setup data, while the Common Set lets genuinely shared data stay shared. Next up, lesson 13: shared and non-shared reference data, where we go deeper on how this assignment actually plays out across reference data objects.
