# Shared and Non-Shared Reference Data

Lesson 12 introduced reference data sets at a conceptual level. This lesson goes one layer deeper: not all reference data behaves the same way, and understanding the difference between data that gets **partitioned** and data that is simply **subscribed to** is what lets you predict exactly how a given setup object will behave before you configure it.

## What you'll learn

- The difference between partitioned (set-enabled) and non-partitioned reference data
- What "determinant type" means, beyond just "business unit"
- How subscription works for non-partitioned shared reference data
- A practical way to check, for any given object, which pattern applies

## Partitioned reference data

Some reference data objects are **partitioned** — meaning the object type itself is designed to be split across multiple reference data sets, and a business unit (or other determinant) is assigned to exactly one set per object type. Payment terms, covered last lesson, is a classic example. Each set can hold its own distinct list of values, and a business unit only sees the set it is assigned to.

## Non-partitioned (common) reference data

Other reference data objects are **not partitioned** at all — there is only ever the Common Set, and every business unit sees the exact same values, full stop. There is no "choice" to make here; the object type simply was not designed to vary by business unit.

## Determinant types, beyond business unit

Lesson 12 introduced "business unit" as the typical determinant. It is the most common, but it is not the only **determinant type** Oracle Fusion supports. A determinant type is simply the category of context Oracle Fusion uses to decide which set applies — and depending on the reference data object, the determinant type might instead be the ledger, the asset book, or, in some project-related setups, the project unit. The determinant type is fixed per object (you don't get to choose it), but which specific determinant *value* (which business unit, which ledger) a given reference data set is assigned to is very much something you configure.

```
Reference Data Object        Typical Determinant Type
  Payment Terms                Business Unit
  Some Project objects         Project Unit
  Certain accounting objects   Ledger
```

## Subscription

For reference data that is shared (not partitioned into business-unit-specific sets), Oracle Fusion sometimes uses the term **subscription**: a business unit "subscribes to" a shared reference data set rather than owning its own exclusive copy. Practically, this behaves like the Common Set pattern from Lesson 12 — one list, visible everywhere it's subscribed — but the vocabulary matters when you're reading Oracle's own setup task names and documentation, which use "subscription" specifically for this kind of shared, non-exclusive access.

## A practical check

When you are not sure how a given setup object behaves, open its "Manage Reference Data Set Assignment" or "Manage Reference Data Sets" related task; if it offers a determinant type and lets you create multiple sets, it's partitioned. If it only shows the Common Set with no determinant option, it's shared/non-partitioned, full stop.

## Recap

Partitioned reference data can be split across sets by a determinant type like business unit; non-partitioned reference data only ever has the Common Set, often described as something a business unit subscribes to. Next up, lesson 14: locations, geographies, and addresses — the physical-world reference data that legal entities and business units both depend on.
